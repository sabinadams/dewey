import { Card } from "../../ui/card";
import { FormControl, FormItem, FormLabel } from "../../ui/form";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Sparkles, HelpCircle } from "lucide-react";
import { useCreateProjectContext } from "@/contexts/create-project.context";
import { useState } from "react";
import DetectedConnectionDetails from "../DetectedConnectionDetails";
import { TabsContent } from "../../ui/tabs";

export default function ConnectionHelperTab() {
    const { form } = useCreateProjectContext();
    const [aiQuestion, setAiQuestion] = useState("");

    return (
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
    );
}