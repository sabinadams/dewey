import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

// Define the database connection schema
const baseConnectionSchema = z.object({
  connectionName: z.string().optional(),
  databaseType: z.string().optional(),
  host: z.string().optional(),
  port: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  database: z.string().optional(),
});

// Schema for a complete connection that matches the Rust-side expectations
const completeConnectionSchema = z.object({
  connectionName: z.string(),
  databaseType: z.string(),
  host: z.string(),
  port: z.string(),
  username: z.string(),
  password: z.string(),
  database: z.string(),
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
    // If any connection field is filled, all fields must be filled
    const hasAnyField = Object.values(data).some(Boolean);
    const hasAllFields = Object.values(data).every(Boolean);
    return !hasAnyField || hasAllFields;
  },
  {
    message: "All connection fields must be filled if any are filled",
  }
);

// Helper function to validate and transform connection data
export const validateAndTransformConnection = (data: CreateProjectFormData) => {
  // Check if we have any connection data
  const hasConnectionData = Object.entries(data)
    .filter(([key]) => baseConnectionSchema.shape[key as keyof typeof baseConnectionSchema.shape])
    .some(([_, value]) => Boolean(value));

  if (!hasConnectionData) return null;

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
  
  // Database connection details
  ...baseConnectionSchema.shape
});

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