import { UseFormReturn } from "react-hook-form";
import { CreateProjectFormData } from "@/contexts/create-project.context";
import { Button } from "@/components/ui/button";
import { useTestConnection } from "@/hooks/useTestConnection";

interface DetectedConnectionDetailsProps {
    form: UseFormReturn<CreateProjectFormData>;
}

export default function DetectedConnectionDetails({ form }: DetectedConnectionDetailsProps) {
    const databaseType = form.watch("databaseType");
    const isSQLite = databaseType === "sqlite";
    const { testConnection, isLoading } = useTestConnection();

    const handleTestConnection = async () => {
        const values = form.getValues();
        const isFileSqlite = values.databaseType === "sqlite" && values.sqliteType === "file";

        await testConnection({
            dbType: values.databaseType || "",
            host: isFileSqlite ? "localhost" : (values.host || ""),
            port: isFileSqlite ? "0" : (values.port || ""),
            username: isFileSqlite ? "" : (values.username || ""),
            password: isFileSqlite ? "" : (values.password || ""),
            database: values.database || ""
        });
    };

    return (
        <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-medium">Detected Connection Details</h4>
                {databaseType && (
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleTestConnection}
                        disabled={isLoading}
                    >
                        {isLoading ? "Testing..." : "Test Connection"}
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2">{databaseType || "Not detected"}</span>
                </div>
                {isSQLite ? (
                    <div className="col-span-2">
                        <span className="text-muted-foreground">File Path:</span>
                        <span className="ml-2">{form.watch("database") || "Not detected"}</span>
                    </div>
                ) : (
                    <>
                        <div>
                            <span className="text-muted-foreground">Host:</span>
                            <span className="ml-2">{form.watch("host") || "Not detected"}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Port:</span>
                            <span className="ml-2">{form.watch("port") || "Not detected"}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Database:</span>
                            <span className="ml-2">{form.watch("database") || "Not detected"}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 