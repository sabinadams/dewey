import { UseFormReturn } from "react-hook-form";
import { CreateProjectFormData } from "@/contexts/create-project.context";
import { Button } from "@/components/ui/button";
import { useTestConnection } from "@/hooks/useTestConnection";
import { Server } from "lucide-react";

interface DetectedConnectionDetailsProps {
    form: UseFormReturn<CreateProjectFormData>;
}

export default function DetectedConnectionDetails({ form }: DetectedConnectionDetailsProps) {
    const databaseType = form.watch("databaseType");
    const isSQLite = databaseType === "sqlite";
    const { testConnection, isLoading } = useTestConnection();

    const handleTestConnection = async () => {
        // Validate all fields except connectionName
        const fieldsToValidate = [
            "databaseType",
            "host",
            "port",
            "username",
            "password",
            "database",
            "sqliteType"
        ] as const;
        
        const result = await form.trigger(fieldsToValidate);
        
        if (!result) {
            return; // Don't proceed if validation fails
        }

        await testConnection(form.getValues());
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
                        <Server className="w-4 h-4 mr-2" />
                        {isLoading ? "Testing..." : "Test Connection"}
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="grid grid-cols-[80px,1fr] items-center">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{databaseType || "Not detected"}</span>
                </div>
                {isSQLite ? (
                    <div className="col-span-2 grid grid-cols-[80px,1fr] items-center">
                        <span className="text-muted-foreground">File Path:</span>
                        <span>{form.watch("database") || "Not detected"}</span>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Host:</span>
                            <span>{form.watch("host") || "Not detected"}</span>
                        </div>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Port:</span>
                            <span>{form.watch("port") || "Not detected"}</span>
                        </div>
                        <div className="grid grid-cols-[80px,1fr] items-center">
                            <span className="text-muted-foreground">Database:</span>
                            <span>{form.watch("database") || "Not detected"}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 