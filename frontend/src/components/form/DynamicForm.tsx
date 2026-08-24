import * as React from "react";
import {
  useForm,
  type ControllerRenderProps,
  type DefaultValues,
  type FieldValues,
  type Path,
  type Resolver,
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
  validationSchema: ObjectSchema<any>;
  onSubmit: (data: T) => void;
  submitButtonText?: string;
  cancelButtonText?: string;
  btnclass?: string;
  loading?: boolean;
  btnVariant?: ButtonProps["variant"];
  onCancel?: () => void;
}

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
  cancelButtonText = "Cancel",
  btnclass,
  btnVariant,
  loading,
  onCancel,
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
    mode: "onSubmit",
  });

  React.useEffect(() => {
    form.reset(defaultValues as DefaultValues<T>);
  }, [configKey]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full mx-auto"
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
                    <FormLabel className="text-sm font-normal">
                      {field.label}
                    </FormLabel>

                    <FormControl>
                      <FormFieldsRenderer
                        config={field}
                        fieldProps={
                          renderProps as ControllerRenderProps<
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

        <div className="flex justify-end items-center gap-3 w-full pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
              className="px-5"
            >
              {cancelButtonText}
            </Button>
          )}

          <Button
            type="submit"
            className={cn("px-5", btnclass)}
            loading={loading}
            variant={btnVariant}
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
