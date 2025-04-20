import { zodResolver } from "@hookform/resolvers/zod"
import { createContext, useContext } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    icon: z.string().optional(),
})

const CreateProjectContext = createContext<{
  form: UseFormReturn<z.infer<typeof formSchema>>
}>({
  form: {} as UseFormReturn<z.infer<typeof formSchema>>
})

export const useCreateProjectContext = () => {
  return useContext(CreateProjectContext)
}

export const CreateProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  })

  return (
    <CreateProjectContext.Provider value={{ form }}>
      {children}
    </CreateProjectContext.Provider>
  )
}