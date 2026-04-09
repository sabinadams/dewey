import { createContext, useContext, useMemo } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const baseConnectionSchema = z.object({
  connectionName: z.string(),
  databaseType: z.string(),
  sqliteType: z.enum(["file", "hosted"]).optional(),
  host: z.string(),
  port: z.string(),
  username: z.string(),
  password: z.string(),
  database: z.string(),
  connectionString: z.string().optional(),
})

type ConnectionFields = z.infer<typeof baseConnectionSchema>

const completeConnectionSchema = z
  .object({
    connectionName: z.string().min(1, "Connection name is required"),
    databaseType: z.string().min(1, "Database type is required"),
    sqliteType: z.enum(["file", "hosted"]).optional(),
    database: z.string().min(1, "Database path/name is required"),
    host: z.string(),
    port: z.string(),
    username: z.string(),
    password: z.string(),
    connectionString: z.string().optional(),
  })
  .transform((data) => ({
    connection_name: data.connectionName,
    db_type: data.databaseType,
    host: data.host,
    port: data.port,
    username: data.username,
    password: data.password,
    database: data.database,
  }))

function isNonEmpty(v: unknown): boolean {
  return v !== undefined && v !== null && String(v).trim() !== ""
}

function hasNonEmptyDatabaseType(data: ConnectionFields): boolean {
  return isNonEmpty(data.databaseType)
}

function hasAnyConnectionFieldBesidesType(data: ConnectionFields): boolean {
  return (
    isNonEmpty(data.connectionName) ||
    isNonEmpty(data.host) ||
    isNonEmpty(data.port) ||
    isNonEmpty(data.username) ||
    isNonEmpty(data.password) ||
    isNonEmpty(data.database) ||
    isNonEmpty(data.connectionString)
  )
}

function pickConnectionFields(data: ConnectionFields & Record<string, unknown>): ConnectionFields {
  return {
    connectionName: data.connectionName,
    databaseType: data.databaseType,
    sqliteType: data.sqliteType,
    host: data.host,
    port: data.port,
    username: data.username,
    password: data.password,
    database: data.database,
    connectionString: data.connectionString,
  }
}

const NETWORK_FIELD_RULES: { key: keyof ConnectionFields; message: string }[] = [
  { key: "host", message: "Host is required" },
  { key: "port", message: "Port is required" },
  { key: "username", message: "Username is required" },
  { key: "password", message: "Password is required" },
  { key: "database", message: "Database name is required" },
]

function requirePresent(
  ctx: z.RefinementCtx,
  data: ConnectionFields,
  rules: { key: keyof ConnectionFields; message: string }[],
): void {
  for (const { key, message } of rules) {
    if (!data[key] || !String(data[key]).trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [key] })
    }
  }
}

function validateConnectionDetails(data: ConnectionFields, ctx: z.RefinementCtx): void {
  if (!data.databaseType?.trim()) return

  if (!data.connectionName?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Connection name is required",
      path: ["connectionName"],
    })
  }

  if (data.databaseType === "sqlite") {
    if (!data.sqliteType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a SQLite connection type",
        path: ["sqliteType"],
      })
      return
    }
    if (data.sqliteType === "file") {
      requirePresent(ctx, data, [
        { key: "database", message: "Database file path is required" },
      ])
      return
    }
    requirePresent(ctx, data, NETWORK_FIELD_RULES)
    return
  }

  requirePresent(ctx, data, NETWORK_FIELD_RULES)
}

const connectionSchema = baseConnectionSchema
  .refine((data) => !hasAnyConnectionFieldBesidesType(data) || hasNonEmptyDatabaseType(data), {
    message: "Please select a database type",
    path: ["databaseType"],
  })
  .superRefine(validateConnectionDetails)

const formSchema = z
  .object({
    name: z.string().min(1, "Project name is required"),
    icon: z.string().optional(),
  })
  .merge(baseConnectionSchema)
  .superRefine((data, ctx) => {
    const slice = pickConnectionFields(data)
    if (!hasNonEmptyDatabaseType(slice)) return

    const parsed = connectionSchema.safeParse(slice)
    if (!parsed.success) {
      for (const issue of parsed.error.issues) ctx.addIssue(issue)
    }
  })

export type ConnectionData = z.infer<typeof connectionSchema>
export type CreateProjectFormData = z.infer<typeof formSchema>
export { formSchema, connectionSchema }

export const validateAndTransformConnection = (data: CreateProjectFormData) => {
  const slice = pickConnectionFields(data)
  if (!hasNonEmptyDatabaseType(slice)) return null

  let payload: CreateProjectFormData = { ...data }
  if (data.databaseType === "sqlite" && data.sqliteType === "file") {
    payload = {
      ...payload,
      host: "localhost",
      port: "0",
      username: "",
      password: "",
    }
  }

  const parsed = completeConnectionSchema.safeParse(payload)
  return parsed.success ? parsed.data : null
}

const CreateProjectContext = createContext<{
  form: UseFormReturn<CreateProjectFormData>
}>({
  form: {} as UseFormReturn<CreateProjectFormData>,
})

export const useCreateProjectContext = () => useContext(CreateProjectContext)

export const CreateProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
      connectionName: "",
      databaseType: "",
      sqliteType: "file",
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
    },
    mode: "onBlur",
    // After submit, re-check on change so fixing a field clears errors without requiring blur.
    reValidateMode: "onChange",
    criteriaMode: "all",
  })

  // RHF: formState is a Proxy — reading these in the same component that called useForm()
  // subscribes to validation/submit updates. Without this, failed submit can leave React state
  // stale so field errors never paint (especially with context + stable `form` reference).
  const {
    errors: formErrors,
    isSubmitted,
    submitCount,
  } = form.formState

  const value = useMemo(
    () => ({ form }),
    [form, formErrors, isSubmitted, submitCount],
  )

  return <CreateProjectContext.Provider value={value}>{children}</CreateProjectContext.Provider>
}
