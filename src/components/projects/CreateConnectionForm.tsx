import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LucideIcon } from "lucide-react";
import { Database, Check, Sparkles, HelpCircle } from "lucide-react";
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

const databaseTypes = [
    {
        id: "postgres",
        name: "PostgreSQL",
        description: "Connect to a PostgreSQL database",
        icon: Database,
    },
    {
        id: "mysql",
        name: "MySQL",
        description: "Connect to a MySQL database",
        icon: Database,
    },
    {
        id: "mongodb",
        name: "MongoDB",
        description: "Connect to a MongoDB database",
        icon: Database,
    },
    {
        id: "sqlite",
        name: "SQLite",
        description: "Connect to a SQLite database",
        icon: Database,
    },
]

// Parse a connection string into its components using the connection-string library
function parseConnectionString(connectionString: string) {
    try {
        const parsed = new ConnectionString(connectionString);

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

            // Update form with parsed values
            Object.entries(parsedValues).forEach(([field, value]) => {
                form.setValue(field as any, value);
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
                    <TabsTrigger value="ai">
                        <GradientIcon 
                            icon={Sparkles} 
                            size={20}
                        />
                        Get Help
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="standard" className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {databaseTypes.map((type) => (
                            <Card
                                key={type.id}
                                className={cn(
                                    "relative cursor-pointer p-4 transition-all hover:border-primary flex flex-col gap-1",
                                    watchDatabaseType === type.id && "border-2 border-primary",
                                )}
                                onClick={() => form.setValue("databaseType", type.id)}
                            >
                                {watchDatabaseType === type.id && (
                                    <div className="absolute right-2 top-2 h-5 w-5 rounded-full bg-primary text-primary-foreground">
                                        <Check className="h-5 w-5 p-1" />
                                    </div>
                                )}
                                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <type.icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="font-medium">{type.name}</h3>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                            </Card>
                        ))}
                    </div>

                    {/* Standard connection fields will be added here */}
                    {watchDatabaseType && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <FormField
                                control={form.control}
                                name="host"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Host</FormLabel>
                                        <FormControl>
                                            <Input placeholder="localhost" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="port"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Port</FormLabel>
                                        <FormControl>
                                            <Input placeholder="5432" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="database"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel>Database Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="my_database" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="url" className="pt-4">
                    <FormItem>
                        <FormLabel>Connection URL</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="postgresql://username:password@localhost:5432/database"
                                value={connectionString}
                                onChange={(e) => handleConnectionStringChange(e.target.value)}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </TabsContent>

                <TabsContent value="ai" className="pt-4">
                    <Card className="p-6">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 p-2">
                                    <HelpCircle className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">AI Connection Helper</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Describe your database setup or ask questions about connecting to your database. 
                                        Our AI helper will guide you through the process.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormItem>
                                    <FormLabel>What do you need help with?</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="E.g., How do I find my PostgreSQL connection details? What port does MySQL typically use?"
                                            value={aiQuestion}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAiQuestion(e.target.value)}
                                            className="min-h-[100px]"
                                        />
                                    </FormControl>
                                </FormItem>

                                <div className="flex justify-end">
                                    <Button 
                                        type="button"
                                        onClick={() => {
                                            // TODO: Implement AI helper functionality
                                            console.log("AI helper question:", aiQuestion);
                                        }}
                                    >
                                        Get Help
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}