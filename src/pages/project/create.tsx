import CenteredLayout from "@/components/layouts/centered";
import CreateProjectForm from "@/components/projects/CreateProjectForm";
import { CreateProjectProvider } from "@/contexts/create-project.context";

export default function CreateProjectPage() {
    return (
        <CenteredLayout>
           <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Create Project</h1>
                <p className="text-sm text-muted-foreground">
                    Set up a new database project with AI-enhanced capabilities
                </p>
            </div>

            <CreateProjectProvider>
                <CreateProjectForm />
            </CreateProjectProvider>
        </CenteredLayout>
    );
}