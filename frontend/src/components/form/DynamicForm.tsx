import * as React from "react";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
  type Resolver,
  type ControllerRenderProps,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ObjectSchema } from "yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { FieldConfig } from "./types";
import { FormFieldsRenderer } from "./FieldRenderer";

interface DynamicFormProps<T extends FieldValues> {
  config: FieldConfig[];
  validationSchema: ObjectSchema<T>;
  onSubmit: (data: T) => void;
  submitButtonText?: string;
  btnclass?: string;
  loading?: boolean;
  btnVariant?: ButtonProps["variant"];
}

// Grid only ever has 3 columns (see className below), so any colSpan
// above 3 just clamps to full width rather than producing a class that
// doesn't exist / doesn't do anything.
const COL_SPAN_CLASSES: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-3",
  5: "lg:col-span-3",
  6: "lg:col-span-3",
};

const FULL_WIDTH_TYPES = new Set(["textarea", "checkbox-group"]);

export function DynamicForm<T extends FieldValues>({
  config,
  validationSchema,
  onSubmit,
  submitButtonText = "Submit",
  btnclass,
  btnVariant,
  loading,
}: DynamicFormProps<T>) {
  const configKey = React.useMemo(() => JSON.stringify(config), [config]);

  const defaultValues = React.useMemo(() => {
    return config.reduce<Record<string, unknown>>((acc, field) => {
      acc[field.name] = field.initialValue;
      return acc;
    }, {});
  }, [configKey]);

  const form = useForm<T>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<T>,
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onTouched",
  });

  React.useEffect(() => {
    form.reset(defaultValues as DefaultValues<T>);
  }, [configKey]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full max-w-3xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5">
          {config.map((field, index) => {
            const spanClass = FULL_WIDTH_TYPES.has(field.type)
              ? "sm:col-span-2 lg:col-span-3"
              : COL_SPAN_CLASSES[field.colSpan ?? 1];

            return (
              <FormField
                key={`${field.name}-${index}`}
                control={form.control}
                name={field.name as Path<T>}
                render={({ field: renderProps }) => (
                  <FormItem className={cn("flex flex-col gap-1.5", spanClass)}>
                    <FormLabel className="font-semibold text-sm text-foreground">
                      {field.label}
                    </FormLabel>

                    <FormControl>
                      <FormFieldsRenderer
                        config={field}
                        fieldProps={
                          renderProps as unknown as ControllerRenderProps<
                            FieldValues,
                            string
                          >
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>

        <Button
          type="submit"
          className={`${btnclass} w-full `}
          loading={loading}
          variant={btnVariant}
        >
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
