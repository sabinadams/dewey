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

    // Read formState here so RHF tracks subscriptions; reading errors only inside Controller render
    // can skip re-renders when trigger()/submit sets validation errors.
    const { touchedFields, isSubmitted } = form.formState;

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => {
                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e);
                    if (touchedFields[name] || isSubmitted) {
                        void form.trigger(name);
                    }
                };

                return (
                    <FormItem className={className}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input
                                {...inputProps}
                                {...field}
                                onChange={handleChange}
                                onBlur={() => {
                                    field.onBlur();
                                    void form.trigger(name);
                                }}
                                className={cn(
                                    inputProps.className,
                                    fieldState.error && "border-destructive"
                                )}
                            />
                        </FormControl>
                        {description}
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
