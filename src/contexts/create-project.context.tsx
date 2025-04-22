import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

// Define the database connection schema
const baseConnectionSchema = z.object({
  connectionName: z.string().min(1, "Connection name is required").optional(),
  databaseType: z.string().min(1, "Database type is required").optional(),
  host: z.string().min(1, "Host is required").optional(),
  port: z.string().min(1, "Port is required").optional(),
  username: z.string().min(1, "Username is required").optional(),
  password: z.string().min(1, "Password is required").optional(),
  database: z.string().min(1, "Database name is required").optional(),
});

// Schema for a complete connection that matches the Rust-side expectations
const completeConnectionSchema = z.object({
  connectionName: z.string().min(1, "Connection name is required"),
  databaseType: z.string().min(1, "Database type is required"),
  host: z.string().min(1, "Host is required"),
  port: z.string().min(1, "Port is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  database: z.string().min(1, "Database name is required"),
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