import { UseFormReturn } from "react-hook-form";
import { CreateProjectFormData } from "@/contexts/create-project.context";

interface DetectedConnectionDetailsProps {
    form: UseFormReturn<CreateProjectFormData>;
}

export default function DetectedConnectionDetails({ form }: DetectedConnectionDetailsProps) {
    const databaseType = form.watch("databaseType");
    const isSQLite = databaseType === "sqlite";

    return (
        <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium mb-3">Detected Connection Details</h4>
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