import { UseFormReturn, useWatch } from "react-hook-form";
import { CreateProjectFormData } from "@/contexts/create-project.context";
import { CONNECTION_DETAIL_FIELD_NAMES } from "@/components/projects/connection-field-names";
import { Button } from "@/components/ui/button";
import { useTestConnection } from "@/hooks/useTestConnection";
import { Server, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface DetectedConnectionDetailsProps {
    form: UseFormReturn<CreateProjectFormData>;
}

export default function DetectedConnectionDetails({ form }: DetectedConnectionDetailsProps) {
    const v = useWatch({ control: form.control, name: [...CONNECTION_DETAIL_FIELD_NAMES] }) ?? [];
    const databaseType = v[0] ?? "";
    const host = v[1] ?? "";
    const port = v[2] ?? "";
    const username = v[3] ?? "";
    const password = v[4] ?? "";
    const database = v[5] ?? "";
    const sqliteType = v[6] || "file";
    const isSQLite = databaseType === "sqlite";
    const isSqliteFile = isSQLite && sqliteType === "file";
    const { testConnection, isLoading, cancelTest } = useTestConnection();
    const isLoadingRef = useRef(isLoading);
    isLoadingRef.current = isLoading;

    useEffect(() => {
        if (isLoadingRef.current) cancelTest();
    }, [v]);

    const handleTestConnection = async () => {
        const result = await form.trigger([...CONNECTION_DETAIL_FIELD_NAMES]);

        if (!result) {
            return;
        }

        await testConnection(form.getValues());
    };

    return (
        <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium">Detected Connection Details</h4>
                {databaseType && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleTestConnection}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Server className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? "Testing..." : "Test Connection"}
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="grid grid-cols-[80px,1fr] items-center">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{databaseType || "Not detected"}</span>
                </div>
                {isSqliteFile ? (
                    <div className="col-span-2 grid grid-cols-[80px,1fr] items-center">
                        <span className="text-muted-foreground">File Path:</span>
                        <span>{database || "Not detected"}</span>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Host:</span>
                            <span>{host || "Not detected"}</span>
                        </div>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Port:</span>
                            <span>{port || "Not detected"}</span>
                        </div>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Database:</span>
                            <span>{database || "Not detected"}</span>
                        </div>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Username:</span>
                            <span>{username || "Not set"}</span>
                        </div>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Password:</span>
                            <span>
                                {password ? "••••••••" : "Not set"}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
