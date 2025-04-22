import { FormControl, FormLabel, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import { ValidatedFormField } from "../../ui/form-field";
import { TabsContent } from "../../ui/tabs";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { ConnectionString } from "connection-string";
import { toast } from "sonner";
import DetectedConnectionDetails from "../DetectedConnectionDetails";
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
            // Check if it's a SQLite file path
            if (value.endsWith('.sqlite') || value.endsWith('.db') || value.startsWith('file:')) {
                const dbPath = value.startsWith('file:') ? value.slice(5) : value;
                form.setValue("databaseType", "sqlite");
                form.setValue("sqliteType", "file");
                form.setValue("database", dbPath);
                return;
            }

            // Handle SQLite connection strings and other database types
            const parsed = new ConnectionString(value);
            const dbType = parsed.protocol === "postgresql" ? "postgres" :
                parsed.protocol === "mongodb+srv" ? "mongodb" :
                parsed.protocol === "sqlite" ? "sqlite" :
                    parsed.protocol || "";

            form.setValue("databaseType", dbType);

            // Handle hosted SQLite connections
            if (dbType === "sqlite") {
                form.setValue("sqliteType", "hosted");
            }

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
                            placeholder="Examples: /path/to/database.sqlite, file:my.db, sqlite://user:pass@host:port/dbname"
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
                    <p className="text-sm text-muted-foreground mt-2">
                        For SQLite: Use a file path directly, prefix with 'file:' for local files, or use a full connection string for hosted databases.
                    </p>
                </FormItem>

                <DetectedConnectionDetails form={form} />
            </div>
        </TabsContent>
    );
}