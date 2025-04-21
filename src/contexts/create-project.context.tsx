import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

// Define the schema for the combined form
const formSchema = z.object({
  // Project details
  name: z.string().min(1, "Project name is required"),
  icon: z.string().optional(),
  
  // Database connection details - specific input fields
  databaseType: z.string().optional(),
  host: z.string().optional(),
  port: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  database: z.string().optional(),

  // AI connection details
  aiApiKey: z.string().optional(),
  aiModel: z.string().optional(),
  aiEndpoint: z.string().optional(),
})

// Export the schema for use in other components
export type CreateProjectFormData = z.infer<typeof formSchema>
export { formSchema }

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
      databaseType: "",
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
      aiApiKey: "",
      aiModel: "",
      aiEndpoint: "",
    },
  })

  return (
    <CreateProjectContext.Provider value={{ form }}>
      {children}
    </CreateProjectContext.Provider>
  )
}