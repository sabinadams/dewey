import { FormControl, FormLabel, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { ValidatedFormField } from "../ui/form-field";
import { TabsContent } from "../ui/tabs";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { ConnectionString } from "connection-string";
import { toast } from "sonner";
import DetectedConnectionDetails from "./DetectedConnectionDetails";
import { useEffect, useState } from "react";

export default function ConnectionStringTab({
    isActiveTab
}: { isActiveTab: boolean }) {
    const { form } = useCreateProjectContext();
    const [connectionString, setConnectionString] = useState("");

    useEffect(() => {
        if (!isActiveTab) {
           setConnectionString("");
        }
    }, [isActiveTab]);

    const handleConnectionStringChange = (value: string) => {
        setConnectionString(value);
        if (!value.trim()) return;

        try {
            const parsed = new ConnectionString(value);
            const dbType = parsed.protocol === "postgresql" ? "postgres" :
                parsed.protocol === "mongodb+srv" ? "mongodb" :
                    parsed.protocol || "";

            form.setValue("databaseType", dbType);
            form.setValue("host", parsed.hostname || "");
            form.setValue("port", parsed.port ? String(parsed.port) : "");
            form.setValue("username", parsed.user || "");
            form.setValue("password", parsed.password || "");
            form.setValue("database", parsed.path?.[0] || "");
        } catch (error) {
            console.error("Failed to parse connection string:", error);
            toast.error("Failed to parse connection string", {
                description: error instanceof Error ? error.message : 'Unknown error',
                duration: 5000
            });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleConnectionStringChange(e.target.value);
        const touchedFields = Object.keys(form.formState.touchedFields);
        if (touchedFields.length > 0) {
            form.trigger(touchedFields as any);
        }
    };

    return (
        <TabsContent value="url" className="pt-4">
            <div className="flex flex-col gap-4">
                <ValidatedFormField
                    form={form}
                    name="connectionName"
                    label="Connection Name"
                    inputProps={{
                        placeholder: "My Database Connection"
                    }}
                />

                <FormItem>
                    <FormLabel>Connection URL</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="postgresql://username:password@localhost:5432/database"
                            value={connectionString}
                            onChange={handleInputChange}
                            onBlur={() => {
                                const touchedFields = Object.keys(form.formState.touchedFields);
                                if (touchedFields.length > 0) {
                                    form.trigger(touchedFields as any);
                                }
                            }}
                        />
                    </FormControl>
                </FormItem>

                <DetectedConnectionDetails form={form} />
            </div>
        </TabsContent>
    );
}