import { FormControl, FormLabel, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import { ValidatedFormField } from "../../ui/form-field";
import { TabsContent } from "../../ui/tabs";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { ConnectionString } from "connection-string";
import DetectedConnectionDetails from "../DetectedConnectionDetails";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../ui/tooltip";
import { useToast } from '@/hooks/use-toast';

export default function ConnectionStringTab({
    isActiveTab
}: { isActiveTab: boolean }) {
    const { form } = useCreateProjectContext();
    const [connectionString, setConnectionString] = useState("");
    const debouncedConnectionString = useDebounce(connectionString);
    const { showToast } = useToast();

    useEffect(() => {
        if (!isActiveTab) {
           setConnectionString("");
        }
    }, [isActiveTab]);

    useEffect(() => {
        if (!debouncedConnectionString.trim()) return;

        try {
            // Check if it's a SQLite file path
            if (debouncedConnectionString.endsWith('.sqlite') || debouncedConnectionString.endsWith('.db') || debouncedConnectionString.startsWith('file:')) {
                const dbPath = debouncedConnectionString.startsWith('file:') ? debouncedConnectionString.slice(5) : debouncedConnectionString;
                form.setValue("databaseType", "sqlite");
                form.setValue("sqliteType", "file");
                form.setValue("database", dbPath);
                return;
            }

            // Handle SQLite connection strings and other database types
            const parsed = new ConnectionString(debouncedConnectionString);
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

            // Trigger validation after setting all values
            const touchedFields = Object.keys(form.formState.touchedFields);
            if (touchedFields.length > 0) {
                form.trigger(touchedFields as any);
            }
        } catch (error) {
            showToast(
                "Failed to parse connection string",
                'warning',
                { description: error instanceof Error ? error.message : 'Invalid format' }
            );
        }
    }, [debouncedConnectionString, form, showToast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnectionString(e.target.value);
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
                    <div className="flex items-center gap-2">
                        <FormLabel>Connection URL</FormLabel>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">
                                        For SQLite: Use a file path directly, prefix with 'file:' for local files, or use a full connection string for hosted databases.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
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
                </FormItem>

                <DetectedConnectionDetails form={form} />
            </div>
        </TabsContent>
    );
}