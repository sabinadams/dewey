import { FormControl, FormLabel, FormItem } from "../../ui/form";
import { Input } from "../../ui/input";
import { ValidatedFormField } from "../../ui/form-field";
import { TabsContent } from "../../ui/tabs";
import type { CreateProjectFormData } from "@/contexts/create-project.context";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { ConnectionString } from "connection-string";
import DetectedConnectionDetails from "../DetectedConnectionDetails";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useDebounce } from "@/hooks/useDebounce";
import { HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../../ui/tooltip";
import { useErrorHandler } from '@/hooks/use-error-handler';

function triggerTouchedFields(form: UseFormReturn<CreateProjectFormData>) {
    const names = Object.keys(form.formState.touchedFields);
    if (names.length) {
        void form.trigger(names as (keyof CreateProjectFormData)[]);
    }
}

export default function ConnectionStringTab({
    isActiveTab
}: { isActiveTab: boolean }) {
    const { form } = useCreateProjectContext();
    const databaseType = useWatch({ control: form.control, name: "databaseType" }) ?? "";
    const sqliteType = useWatch({ control: form.control, name: "sqliteType" }) || "file";
    const showServerCredentials =
        Boolean(databaseType) && (databaseType !== "sqlite" || sqliteType === "hosted");
    const [connectionString, setConnectionString] = useState("");
    const debouncedConnectionString = useDebounce(connectionString);
    const { handleError } = useErrorHandler();

    useEffect(() => {
        if (!isActiveTab) {
           setConnectionString("");
        }
    }, [isActiveTab]);

    useEffect(() => {
        if (!debouncedConnectionString.trim()) return;

        try {
            if (
                debouncedConnectionString.endsWith(".sqlite") ||
                debouncedConnectionString.endsWith(".db") ||
                debouncedConnectionString.startsWith("file:")
            ) {
                const dbPath = debouncedConnectionString.startsWith("file:")
                    ? debouncedConnectionString.slice(5)
                    : debouncedConnectionString;
                form.setValue("databaseType", "sqlite");
                form.setValue("sqliteType", "file");
                form.setValue("database", dbPath);
            } else {
                const parsed = new ConnectionString(debouncedConnectionString);
                let dbType = parsed.protocol || "";
                if (parsed.protocol === "postgresql") dbType = "postgres";
                else if (parsed.protocol === "mongodb+srv") dbType = "mongodb";
                else if (parsed.protocol === "sqlite") dbType = "sqlite";

                form.setValue("databaseType", dbType);
                if (dbType === "sqlite") {
                    form.setValue("sqliteType", "hosted");
                }
                form.setValue("host", parsed.hostname || "");
                form.setValue("port", parsed.port ? String(parsed.port) : "");
                form.setValue("username", parsed.user || "");
                form.setValue("password", parsed.password || "");
                form.setValue("database", parsed.path?.[0] || "");
            }

            triggerTouchedFields(form);
        } catch (error) {
            handleError(error);
        }
    }, [debouncedConnectionString, form, handleError]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConnectionString(e.target.value);
    };

    return (
        <TabsContent value="url" className="pt-4">
            <div className="flex flex-col gap-4">
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
                            onBlur={() => triggerTouchedFields(form)}
                        />
                    </FormControl>
                </FormItem>

                {!databaseType && (
                    <p className="text-sm text-muted-foreground">
                        Paste or type a connection URL above. Once a database type is detected, you can name the connection and review the parsed fields.
                    </p>
                )}

                {databaseType && (
                    <>
                        <ValidatedFormField
                            name="connectionName"
                            label="Connection Name"
                            inputProps={{
                                placeholder: "My Database Connection"
                            }}
                        />
                        {showServerCredentials && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <ValidatedFormField
                                    name="username"
                                    label="Username"
                                    inputProps={{
                                        placeholder: "username",
                                    }}
                                />
                                <ValidatedFormField
                                    name="password"
                                    label="Password"
                                    inputProps={{
                                        type: "password",
                                        placeholder: "••••••••",
                                    }}
                                />
                            </div>
                        )}
                        <DetectedConnectionDetails form={form} />
                    </>
                )}
            </div>
        </TabsContent>
    );
}