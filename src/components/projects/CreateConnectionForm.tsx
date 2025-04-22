import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { useState } from "react";
import { GradientIcon } from "@/components/ui/gradient-icon";
import ConnectionDetailsTab from "./ConnectionDetailsTab";
import ConnectionStringTab from "./ConnectionStringTab";
import ConnectionHelperTab from "./ConnectionHelperTab";

export default function CreateConnectionForm() {
    const { form } = useCreateProjectContext();
    const [activeTab, setActiveTab] = useState<"standard" | "url" | "ai">("standard");

    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Initial Database Connection</h2>
                <p className="text-sm text-muted-foreground">
                    You can add more connections to this project later
                </p>
            </div>
            <Tabs
                defaultValue="standard"
                value={activeTab}
                onValueChange={(value) => {
                    setActiveTab(value as "standard" | "url" | "ai");
                    form.reset({
                        ...form.getValues(),
                        host: "",
                        port: "",
                        username: "",
                        password: "",
                        database: ""
                    });
                }}
            >
                <TabsList className="w-full">
                    <TabsTrigger value="standard">Standard Connection</TabsTrigger>
                    <TabsTrigger value="url">Connection URL</TabsTrigger>
                    <TabsTrigger value="ai" disabled>
                        <GradientIcon icon={Sparkles} size={20} />
                        Dewey
                    </TabsTrigger>
                </TabsList>
                
                <ConnectionDetailsTab />
                <ConnectionStringTab isActiveTab={activeTab === "url"} />
                <ConnectionHelperTab />
            </Tabs>
        </>
    );
}