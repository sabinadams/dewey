import { SiMysql, SiPostgresql, SiSqlite, SiMongodb } from "@icons-pack/react-simple-icons";
import { Card } from "../../ui/card";
import { ValidatedFormField } from "../../ui/form-field";
import { TabsContent } from "../../ui/tabs";
import { Check, Server, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { useTestConnection } from "@/hooks/useTestConnection";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useWatch } from "react-hook-form";
import { CONNECTION_DETAIL_FIELD_NAMES } from "@/components/projects/connection-field-names";

const databaseTypes = [
    {
        id: "postgres",
        name: "PostgreSQL",
        description: "Connect to a PostgreSQL database",
        icon: () => <SiPostgresql className="h-5 w-5 text-primary" />,
    },
    {
        id: "mysql",
        name: "MySQL",
        description: "Connect to a MySQL database",
        icon: () => <SiMysql className="h-5 w-5 text-primary" />,
    },
    {
        id: "mongodb",
        name: "MongoDB",
        description: "Connect to a MongoDB database",
        icon: () => <SiMongodb className="h-5 w-5 text-primary" />,
    },
    {
        id: "sqlite",
        name: "SQLite",
        description: "Connect to a SQLite database file or hosted SQLite database",
        icon: () => <SiSqlite className="h-5 w-5 text-primary" />,
    },
];

export default function ConnectionDetailsTab() {
    const { form } = useCreateProjectContext();
    const values = useWatch({ control: form.control, name: [...CONNECTION_DETAIL_FIELD_NAMES] }) ?? [];
    const databaseType = values[0] ?? "";
    const sqliteType = values[6] || "file";
    const { testConnection, isLoading, cancelTest } = useTestConnection();
    const isLoadingRef = useRef(isLoading);
    isLoadingRef.current = isLoading;

    useEffect(() => {
        if (isLoadingRef.current) cancelTest();
    }, [values]);

    const handleTestConnection = async () => {
        const result = await form.trigger([...CONNECTION_DETAIL_FIELD_NAMES]);
        
        if (!result) {
            toast.error("Please fill in all fields before testing the connection.");
            return; // Don't proceed if validation fails
        }

        await testConnection(form.getValues());
    };

    return (
        <TabsContent value="standard" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {databaseTypes.map((type) => (
                    <Card
                        key={type.id}
                        className={cn(
                            "relative flex cursor-pointer flex-col gap-1 border-2 p-4 transition-colors",
                            databaseType === type.id
                                ? "border-primary"
                                : "border-muted-foreground/20 hover:border-primary",
                        )}
                        onClick={() => {
                            const o = { shouldDirty: true, shouldValidate: false } as const;
                            form.setValue("databaseType", type.id, o);
                            form.setValue("host", "", o);
                            form.setValue("port", "", o);
                            form.setValue("username", "", o);
                            form.setValue("password", "", o);
                            form.setValue("database", "", o);
                            form.setValue("sqliteType", type.id === "sqlite" ? "file" : undefined, o);
                        }}
                    >
                        {databaseType === type.id && (
                            <div className="pointer-events-none absolute right-2 top-2 z-10 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Check className="size-3" strokeWidth={3} />
                            </div>
                        )}
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            {type.icon()}
                        </div>
                        <h3 className="font-medium">{type.name}</h3>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                    </Card>
                ))}
            </div>

            {!databaseType && (
                <p className="text-sm text-muted-foreground">
                    Select a database type to enter connection details.
                </p>
            )}

            {databaseType && (
                <>
            <div className="flex justify-between items-center">
                <ValidatedFormField
                    form={form}
                    name="connectionName"
                    label="Connection Name"
                    inputProps={{
                        placeholder: "My Database Connection"
                    }}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={isLoading}
                    className="mt-8"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Server className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? "Testing..." : "Test Connection"}
                </Button>
            </div>

            {databaseType === "sqlite" && (
                <div className="space-y-6">
                    <RadioGroup
                        defaultValue="file"
                        value={sqliteType}
                        onValueChange={(value: "file" | "hosted") => {
                            form.setValue("sqliteType", value);
                            form.setValue("host", "");
                            form.setValue("port", "");
                            form.setValue("username", "");
                            form.setValue("password", "");
                            form.setValue("database", "");
                        }}
                    >
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="file" id="file" />
                                <Label htmlFor="file">Local File</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="hosted" id="hosted" />
                                <Label htmlFor="hosted">Hosted Database</Label>
                            </div>
                        </div>
                    </RadioGroup>

                    {sqliteType === "file" && (
                        <div className="grid grid-cols-1 gap-4">
                            <ValidatedFormField
                                form={form}
                                name="database"
                                label="Database File Path"
                                className="col-span-1"
                                inputProps={{
                                    placeholder: "/path/to/database.sqlite"
                                }}
                            />
                            <p className="text-sm text-muted-foreground">
                                Enter the path to your SQLite database file. If the file doesn't exist, it will be created.
                            </p>
                        </div>
                    )}
                </div>
            )}

            {databaseType &&
                (databaseType !== "sqlite" || sqliteType === "hosted") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ValidatedFormField
                        form={form}
                        name="host"
                        label="Host"
                        inputProps={{
                            placeholder: "localhost"
                        }}
                    />

                    <ValidatedFormField
                        form={form}
                        name="port"
                        label="Port"
                        inputProps={{
                            placeholder: "5432",
                            type: "number"
                        }}
                    />

                    <ValidatedFormField
                        form={form}
                        name="username"
                        label="Username"
                        inputProps={{
                            placeholder: "username"
                        }}
                    />

                    <ValidatedFormField
                        form={form}
                        name="password"
                        label="Password"
                        inputProps={{
                            type: "password",
                            placeholder: "••••••••"
                        }}
                    />

                    <ValidatedFormField
                        form={form}
                        name="database"
                        label="Database Name"
                        className="md:col-span-2"
                        inputProps={{
                            placeholder: "my_database"
                        }}
                    />
                </div>
            )}
                </>
            )}
        </TabsContent>
    );
}