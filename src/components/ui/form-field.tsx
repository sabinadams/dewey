import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormFieldProps {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    className?: string;
    description?: React.ReactNode;
}

export function ValidatedFormField({
    form,
    name,
    label,
    placeholder,
    type = "text",
    className,
    description
}: FormFieldProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            type={type}
                            {...field}
                            onChange={(e) => {
                                field.onChange(e);
                                if (form.formState.touchedFields[name]) {
                                    form.trigger(name);
                                }
                            }}
                            onBlur={() => {
                                field.onBlur();
                                form.trigger(name);
                            }}
                            className={cn(
                                form.formState.errors[name] && "border-destructive"
                            )}
                        />
                    </FormControl>
                    {description}
                    {form.formState.touchedFields[name] && (
                        <FormMessage className="text-sm text-destructive" />
                    )}
                </FormItem>
            )}
        />
    );
} 