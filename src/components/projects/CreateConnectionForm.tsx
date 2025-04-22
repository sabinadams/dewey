import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { 
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiSqlite
} from '@icons-pack/react-simple-icons';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { useState } from "react";
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ConnectionString } from "connection-string";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GradientIcon } from "@/components/ui/gradient-icon";
import DetectedConnectionDetails from "./DetectedConnectionDetails";
import { toast } from "sonner";
import { ValidatedFormField } from "@/components/ui/form-field";

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
        description: "Connect to a SQLite database",
        icon: () => <SiSqlite className="h-5 w-5 text-primary" />,
    },
]

// Parse a connection string into its components using the connection-string library
function parseConnectionString(connectionString: string) {
    try {
        const parsed = new ConnectionString(connectionString);
        console.log("Parsed connection string:", parsed);
        // Map protocol to database type
        let dbType = "";
        if (parsed.protocol) {
            // Handle special cases
            if (parsed.protocol === "postgresql") {
                dbType = "postgres";
            } else if (parsed.protocol === "mongodb+srv") {
                dbType = "mongodb";
            } else {
                dbType = parsed.protocol;
            }
        }

        return {
            databaseType: dbType,
            username: parsed.user || "",
            password: parsed.password || "",
            host: parsed.hostname || "",
            port: parsed.port ? String(parsed.port) : "",
            database: parsed.path?.[0] || "",
        };
    } catch (error) {
        console.error("Failed to parse connection string:", error);
        toast.error("Failed to parse connection string", {
            description: error instanceof Error ? error.message : 'Unknown error',
            duration: 5000
        });
        return {
            databaseType: "",
            username: "",
            password: "",
            host: "",
            port: "",
            database: ""
        };
    }
}

export default function CreateConnectionForm() {
    const { form } = useCreateProjectContext();
    const watchDatabaseType = form.watch("databaseType");
    const [activeTab, setActiveTab] = useState<"standard" | "url" | "ai">("standard");
    const [connectionString, setConnectionString] = useState("");
    const [aiQuestion, setAiQuestion] = useState("");

    // Handle connection string changes
    const handleConnectionStringChange = (value: string) => {
        setConnectionString(value);

        // Only parse if we have a non-empty string
        if (value.trim()) {
            const parsedValues = parseConnectionString(value);
            const currentConnectionName = form.getValues("connectionName");

            // Update form with parsed values, preserving the connection name if it exists
            Object.entries(parsedValues).forEach(([field, value]) => {
                form.setValue(field as any, value);
            });

            // Restore connection name if it was previously set
            if (currentConnectionName) {
                form.setValue("connectionName", currentConnectionName);
            }
        }
    };

    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Initial Database Connection</h2>
                <p className="text-sm text-muted-foreground">
                    You can add more connections to this project later
                </p>
            </div>
            <Tabs defaultValue="standard" value={activeTab} onValueChange={(value) => {
                setActiveTab(value as "standard" | "url" | "ai");
                // Clear form fields when switching tabs
                form.setValue("host", "");
                form.setValue("port", "");
                form.setValue("username", "");
                form.setValue("password", "");
                form.setValue("database", "");
                // Clear connection string when switching to standard
                if (value === "standard") {
                    setConnectionString("");
                }
            }}>
                <TabsList className="w-full">
                    <TabsTrigger value="standard">Standard Connection</TabsTrigger>
                    <TabsTrigger value="url">Connection URL</TabsTrigger>
                    <TabsTrigger value="ai" disabled>
                        <GradientIcon 
                            icon={Sparkles} 
                            size={20}
                        />
                        Dewey
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="standard" className="space-y-6 pt-4">
                    <ValidatedFormField
                        form={form}
                        name="connectionName"
                        label="Connection Name"
                        placeholder="My Database Connection"
                    />

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
                    {form.formState.touchedFields.databaseType && (
                        <FormMessage className="text-sm text-destructive">{form.formState.errors.databaseType?.message}</FormMessage>
                    )}

                    {watchDatabaseType && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <ValidatedFormField
                                form={form}
                                name="host"
                                label="Host"
                                placeholder="localhost"
                            />

                            <ValidatedFormField
                                form={form}
                                name="port"
                                label="Port"
                                placeholder="5432"
                                type="number"
                            />

                            <ValidatedFormField
                                form={form}
                                name="username"
                                label="Username"
                                placeholder="username"
                            />

                            <ValidatedFormField
                                form={form}
                                name="password"
                                label="Password"
                                placeholder="••••••••"
                                type="password"
                            />

                            <ValidatedFormField
                                form={form}
                                name="database"
                                label="Database Name"
                                placeholder="my_database"
                                className="md:col-span-2"
                            />
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="url" className="pt-4">
                    <div className="flex flex-col gap-4">
                        <ValidatedFormField
                            form={form}
                            name="connectionName"
                            label="Connection Name"
                            placeholder="My Database Connection"
                        />

                        <FormItem>
                            <FormLabel>Connection URL</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="postgresql://username:password@localhost:5432/database"
                                    value={connectionString}
                                    onChange={(e) => {
                                        handleConnectionStringChange(e.target.value);
                                        // Only trigger validation for fields that have been touched
                                        const touchedFields = Object.keys(form.formState.touchedFields);
                                        if (touchedFields.length > 0) {
                                            form.trigger(touchedFields as any);
                                        }
                                    }}
                                    onBlur={() => {
                                        // Only validate fields that have been touched
                                        const touchedFields = Object.keys(form.formState.touchedFields);
                                        if (touchedFields.length > 0) {
                                            form.trigger(touchedFields as any);
                                        }
                                    }}
                                />
                            </FormControl>
                            {Object.keys(form.formState.touchedFields).length > 0 && (
                                <FormMessage className="text-sm text-destructive" />
                            )}
                        </FormItem>

                        <DetectedConnectionDetails form={form} />
                    </div>
                </TabsContent>

                <TabsContent value="ai" className="pt-4">
                    <Card className="p-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 p-2">
                                    <HelpCircle className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">Let Dewey help you connect</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Describe your database setup in plain English, paste connection errors, or upload config files. 
                                        Dewey will help you fill out the connection details automatically.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <FormItem>
                                    <FormLabel>Tell Dewey about your database</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Examples:
- I want to connect to my local Postgres database running on port 5432
- I'm getting this error: 'connection refused on port 3306'
- I have a MongoDB Atlas cluster and here's my connection string...
- My database is running in Docker at localhost:27017"
                                            value={aiQuestion}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                                setAiQuestion(e.target.value);
                                                form.trigger();
                                            }}
                                            onBlur={() => form.trigger()}
                                            className="min-h-[120px]"
                                        />
                                    </FormControl>
                                    {form.formState.touchedFields.database && (
                                        <FormMessage className="text-sm text-destructive" />
                                    )}
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Dewey will analyze your input and help fill out the connection details
                                    </p>
                                </FormItem>

                                <div className="flex flex-col gap-4 p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Sparkles className="h-4 w-4" />
                                        <span>Dewey's suggestions will appear here</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            // TODO: Implement file upload for config files
                                        }}
                                    >
                                        Upload Config File
                                    </Button>
                                    <Button 
                                        type="button"
                                        onClick={() => {
                                            // TODO: Implement AI processing
                                            console.log("Processing:", aiQuestion);
                                        }}
                                    >
                                        Let Dewey Help
                                    </Button>
                                </div>

                                <DetectedConnectionDetails form={form} />
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}