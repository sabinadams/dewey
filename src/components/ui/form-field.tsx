import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormFieldProps {
    name: string;
    label: string;
    description?: React.ReactNode;
    className?: string;
    inputProps?: React.ComponentPropsWithoutRef<typeof Input>;
}

/** Must be rendered under `<Form>` (FormProvider) from the same react-hook-form instance. */
export function ValidatedFormField({
    name,
    label,
    description,
    className,
    inputProps = {},
}: FormFieldProps) {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...inputProps}
                            {...field}
                            className={cn(
                                inputProps.className,
                                fieldState.error && "border-destructive"
                            )}
                        />
                    </FormControl>
                    {description}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
