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
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
];

function DatabaseTypeSelector({ 
    selected, 
    onSelect 
}: { 
    selected: string | undefined; 
    onSelect: (id: string) => void;
}) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {databaseTypes.map((type) => (
                <Card
                    key={type.id}
                    className={cn(
                        "relative cursor-pointer p-4 transition-all hover:border-primary flex flex-col gap-1",
                        selected === type.id && "border-2 border-primary",
                    )}
                    onClick={() => onSelect(type.id)}
                >
                    {selected === type.id && (
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
    );
}

function ConnectionFields() {
    const { form } = useCreateProjectContext();
    const watchDatabaseType = form.watch("databaseType");

    if (!watchDatabaseType) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
    );
}

function AiAssistant() {
    const { form } = useCreateProjectContext();
    const [aiQuestion, setAiQuestion] = useState("");

    return (
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
    );
}

export default function CreateConnectionForm() {
    const { form } = useCreateProjectContext();
    const watchDatabaseType = form.watch("databaseType");
    const [activeTab, setActiveTab] = useState<"standard" | "url" | "ai">("standard");
    const [connectionString, setConnectionString] = useState("");

    const handleConnectionStringChange = (value: string) => {
        setConnectionString(value);
        if (!value.trim()) return;

        try {
            const parsed = new ConnectionString(value);
            const dbType = parsed.protocol === "postgresql" ? "postgres" : 
                          parsed.protocol === "mongodb+srv" ? "mongodb" : 
                          parsed.protocol || "";

            form.setValue("databaseType", dbType);
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

    return (
        <>
            <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Initial Database Connection</h2>
                <p className="text-sm text-muted-foreground">
                    You can add more connections to this project later
                </p>
            </div>
            <Tabs 
                defaultValue="standard" 
                value={activeTab} 
                onValueChange={(value) => {
                    setActiveTab(value as "standard" | "url" | "ai");
                    form.reset({
                        ...form.getValues(),
                        host: "",
                        port: "",
                        username: "",
                        password: "",
                        database: ""
                    });
                    if (value === "standard") {
                        setConnectionString("");
                    }
                }}
            >
                <TabsList className="w-full">
                    <TabsTrigger value="standard">Standard Connection</TabsTrigger>
                    <TabsTrigger value="url">Connection URL</TabsTrigger>
                    <TabsTrigger value="ai" disabled>
                        <GradientIcon icon={Sparkles} size={20} />
                        Dewey
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="standard" className="space-y-6 pt-4">
                    <ValidatedFormField
                        form={form}
                        name="connectionName"
                        label="Connection Name"
                        inputProps={{
                            placeholder: "My Database Connection"
                        }}
                    />

                    <DatabaseTypeSelector 
                        selected={watchDatabaseType} 
                        onSelect={(id) => {
                            form.setValue("databaseType", id);
                            form.trigger("databaseType");
                        }}
                    />

                    <ConnectionFields />
                </TabsContent>

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
                                    placeholder="postgresql://username:password@localhost:5432/database"
                                    value={connectionString}
                                    onChange={(e) => {
                                        handleConnectionStringChange(e.target.value);
                                        const touchedFields = Object.keys(form.formState.touchedFields);
                                        if (touchedFields.length > 0) {
                                            form.trigger(touchedFields as any);
                                        }
                                    }}
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

                <TabsContent value="ai" className="pt-4">
                    <AiAssistant />
                </TabsContent>
            </Tabs>
        </>
    );
}