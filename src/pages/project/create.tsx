import CreateProjectForm from "@/components/projects/CreateProjectForm";

export default function CreateProjectPage() {
    return (
        <div className="flex flex-col gap-6 w-2/3 mx-auto">
            <div>
                <h1 className="text-2xl font-bold">Create Project</h1>
                <p className="text-sm text-zinc-500">
                    Set up a new database project with AI-enhanced capabilities
                </p>
            </div>

           <CreateProjectForm />   
        </div>
    );
}