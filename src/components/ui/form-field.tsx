import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormFieldProps {
    form?: UseFormReturn<any>;
    name: string;
    label: string;
    description?: React.ReactNode;
    className?: string;
    inputProps?: React.ComponentPropsWithoutRef<typeof Input>;
}

export function ValidatedFormField({
    form,
    name,
    label,
    description,
    className,
    inputProps = {},
}: FormFieldProps) {
    if (!form) {
        throw new Error('ValidatedFormField requires a form prop');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        form.setValue(name, e.target.value);
        if (form.formState.touchedFields[name]) {
            form.trigger(name);
        }
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...inputProps}
                            {...field}
                            onChange={handleChange}
                            onBlur={() => {
                                field.onBlur();
                                form.trigger(name);
                            }}
                            className={cn(
                                inputProps.className,
                                form.formState.errors[name] && "border-destructive"
                            )}
                        />
                    </FormControl>
                    {description}
                    {form.formState.touchedFields[name] && (
                        <FormMessage />
                    )}
                </FormItem>
            )}
        />
    );
} 