import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

// Define the database connection schema
const baseConnectionSchema = z.object({
  connectionName: z.string().min(1, "Connection name is required").optional(),
  databaseType: z.string().min(1, "Database type is required").optional(),
  sqliteType: z.enum(["file", "hosted"]).optional(),
  host: z.string().optional(),
  port: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  database: z.string().optional(),
  connectionString: z.string().optional(),
});

// Schema for a complete connection that matches the Rust-side expectations
const completeConnectionSchema = z.object({
  connectionName: z.string().min(1, "Connection name is required"),
  databaseType: z.string().min(1, "Database type is required"),
  sqliteType: z.enum(["file", "hosted"]).optional(),
  database: z.string().min(1, "Database path/name is required"),
  // These fields are conditional based on database type
  host: z.string(),
  port: z.string(),
  username: z.string(),
  password: z.string(),
  connectionString: z.string().optional(),
}).transform(data => ({
  // Transform to match NewConnection struct
  connection_name: data.connectionName,
  db_type: data.databaseType,
  host: data.host,
  port: data.port,
  username: data.username,
  password: data.password,
  database: data.database,
  // project_id will be added by the backend after project creation
}));

const connectionSchema = baseConnectionSchema.refine(
  (data) => {
    // If any field is filled, database type must be selected
    const hasAnyField = Object.values(data).some(Boolean);
    return !hasAnyField || data.databaseType;
  },
  {
    message: "Please select a database type",
    path: ["databaseType"]
  }
).superRefine((data, ctx) => {
  // If we have a database type selected, validate the required fields
  if (data.databaseType) {
    // For SQLite, validate based on connection type
    if (data.databaseType === 'sqlite') {
      if (!data.sqliteType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select a SQLite connection type",
          path: ["sqliteType"]
        });
        return;
      }

      if (data.sqliteType === 'file') {
        // For file-based SQLite, only validate the database path
        if (!data.database) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Database file path is required",
            path: ["database"]
          });
        }
      } else {
        // For hosted SQLite, validate all connection fields
        if (!data.host) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Host is required",
            path: ["host"]
          });
        }
        if (!data.port) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Port is required",
            path: ["port"]
          });
        }
        if (!data.username) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Username is required",
            path: ["username"]
          });
        }
        if (!data.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password is required",
            path: ["password"]
          });
        }
        if (!data.database) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Database name is required",
            path: ["database"]
          });
        }
      }
      return;
    }

    // For other database types, validate all connection fields
    if (!data.host) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Host is required",
        path: ["host"]
      });
    }
    if (!data.port) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Port is required",
        path: ["port"]
      });
    }
    if (!data.username) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Username is required",
        path: ["username"]
      });
    }
    if (!data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is required",
        path: ["password"]
      });
    }
    if (!data.database) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Database name is required",
        path: ["database"]
      });
    }
  }
});

// Helper function to validate and transform connection data
export const validateAndTransformConnection = (data: CreateProjectFormData) => {
  // Check if we have any connection data
  const hasConnectionData = Object.entries(data)
    .filter(([key]) => baseConnectionSchema.shape[key as keyof typeof baseConnectionSchema.shape])
    .some(([_, value]) => Boolean(value));

  if (!hasConnectionData) return null;

  // For SQLite file-based connections, set default values for unused fields
  if (data.databaseType === 'sqlite' && data.sqliteType === 'file') {
    data = {
      ...data,
      host: 'localhost',
      port: '0',
      username: '',
      password: '',
    };
  }

  // Validate and transform the connection data
  try {
    return completeConnectionSchema.parse(data);
  } catch {
    return null;
  }
};

// Define the schema for the combined form
const formSchema = z.object({
  // Project details
  name: z.string().min(1, "Project name is required"),
  icon: z.string().optional(),
  
  // Database connection details - using the connection schema
}).and(connectionSchema);

// Export types for use in other components
export type ConnectionData = z.infer<typeof connectionSchema>
export type CreateProjectFormData = z.infer<typeof formSchema>
export { formSchema, connectionSchema }

const CreateProjectContext = createContext<{
  form: UseFormReturn<CreateProjectFormData>
}>({
  form: {} as UseFormReturn<CreateProjectFormData>
})

export const useCreateProjectContext = () => {
  return useContext(CreateProjectContext)
}

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
      database: ""
    },
  })

  return (
    <CreateProjectContext.Provider value={{ form }}>
      {children}
    </CreateProjectContext.Provider>
  )
}