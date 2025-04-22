import { SiMysql, SiPostgresql, SiSqlite, SiMongodb } from "@icons-pack/react-simple-icons";
import { Card } from "../../ui/card";
import { ValidatedFormField } from "../../ui/form-field";
import { TabsContent } from "../../ui/tabs";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { useTestConnection } from "@/hooks/useTestConnection";

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
    const watchDatabaseType = form.watch("databaseType");
    const watchSqliteType = form.watch("sqliteType") || "file";
    const { testConnection, isLoading } = useTestConnection();

    const handleTestConnection = async () => {
        await testConnection(form.getValues());
    };

    return (
        <TabsContent value="standard" className="space-y-6 pt-4">
            <div className="flex justify-between items-center">
                <ValidatedFormField
                    form={form}
                    name="connectionName"
                    label="Connection Name"
                    inputProps={{
                        placeholder: "My Database Connection"
                    }}
                />
                {watchDatabaseType && (
                    <Button
                        variant="outline"
                        onClick={handleTestConnection}
                        disabled={isLoading}
                        className="mt-8"
                    >
                        {isLoading ? "Testing..." : "Test Connection"}
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {databaseTypes.map((type) => (
                    <Card
                        key={type.id}
                        className={cn(
                            "relative cursor-pointer p-4 transition-all hover:border-primary flex flex-col gap-1",
                            watchDatabaseType === type.id && "border-2 border-primary",
                        )}
                        onClick={() => {
                            form.setValue("databaseType", type.id);
                            form.trigger("databaseType");
                            // Reset connection fields when changing database type
                            form.setValue("host", "");
                            form.setValue("port", "");
                            form.setValue("username", "");
                            form.setValue("password", "");
                            form.setValue("database", "");
                            form.setValue("sqliteType", type.id === "sqlite" ? "file" : undefined);
                        }}
                    >
                        {watchDatabaseType === type.id && (
                            <div className="absolute right-2 top-2 h-5 w-5 rounded-full bg-primary text-primary-foreground">
                                <Check className="h-5 w-5 p-1" />
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

            {watchDatabaseType === "sqlite" && (
                <div className="space-y-6">
                    <RadioGroup
                        defaultValue="file"
                        value={watchSqliteType}
                        onValueChange={(value: "file" | "hosted") => {
                            form.setValue("sqliteType", value);
                            // Reset fields when changing SQLite type
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

                    {watchSqliteType === "file" ? (
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
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ValidatedFormField
                                form={form}
                                name="host"
                                label="Host"
                                inputProps={{
                                    placeholder: "db.example.com"
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
                </div>
            )}

            {watchDatabaseType && watchDatabaseType !== "sqlite" && (
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
        </TabsContent>
    );
}