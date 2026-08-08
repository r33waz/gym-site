import * as React from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Eye,
  EyeClosed,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import type { FieldConfig } from "./types";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

interface RendererProps {
  config: FieldConfig;
  fieldProps: ControllerRenderProps<FieldValues, string>;
}

export const FormFieldsRenderer: React.FC<RendererProps> = ({
  config,
  fieldProps,
}) => {
  // All hooks declared unconditionally at the top level — previously
  // `showPassword` was declared inside `case "password":`, which is a
  // conditional hook call (breaks Rules of Hooks) since it only runs
  // when config.type === "password".
  const [openSelect, setOpenSelect] = React.useState(false);
  const [openMulti, setOpenMulti] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  switch (config.type) {
    case "text":
      return (
        <Input
          placeholder={config.placeholder}
          {...fieldProps}
          value={fieldProps.value ?? ""}
        />
      );

    case "password":
      return (
        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={config.placeholder}
            {...fieldProps}
            value={fieldProps.value ?? ""}
            className="pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <Eye size={16} /> : <EyeClosed size={16} />}
          </button>
        </div>
      );

    case "textarea":
      return (
        <Textarea
          placeholder={config.placeholder}
          {...fieldProps}
          value={fieldProps.value ?? ""}
        />
      );

    case "radio":
      return (
        <RadioGroup
          onValueChange={fieldProps.onChange}
          value={fieldProps.value ?? ""}
          className="flex flex-col space-y-2 mt-1"
        >
          {config.options?.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={opt.value}
                id={`${config.name}-${opt.value}`}
              />
              <label
                htmlFor={`${config.name}-${opt.value}`}
                className="text-sm font-normal cursor-pointer text-foreground"
              >
                {opt.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      );

    case "date":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !fieldProps.value && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fieldProps.value ? (
                format(new Date(fieldProps.value), "PPP")
              ) : (
                <span>{config.placeholder || "Pick a date"}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={
                fieldProps.value ? new Date(fieldProps.value) : undefined
              }
              onSelect={fieldProps.onChange}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </PopoverContent>
        </Popover>
      );

    // SEARCHABLE SINGLE DROPDOWN (COMBOBOX)
    case "select":
      return (
        <Popover open={openSelect} onOpenChange={setOpenSelect}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSelect}
              className="w-full justify-between font-normal"
            >
              <span className="truncate">
                {fieldProps.value
                  ? config.options?.find(
                      (opt) => opt.value === fieldProps.value,
                    )?.label
                  : config.placeholder || "Select option..."}
              </span>

              <span className="ml-2 flex items-center gap-1 shrink-0">
                {fieldProps.value && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      fieldProps.onChange("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        e.preventDefault();
                        fieldProps.onChange("");
                      }
                    }}
                    className="rounded-full p-0.5 hover:bg-muted"
                    aria-label="Clear selection"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </span>
                )}
                <ChevronsUpDown className="h-4 w-4 opacity-50" />
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-0"
            align="start"
          >
            <Command
              filter={(value, search) =>
                value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
              }
            >
              <CommandInput placeholder="Search options..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {config.options?.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => {
                        fieldProps.onChange(opt.value);
                        setOpenSelect(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          fieldProps.value === opt.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );

    // SEARCHABLE MULTI-SELECT DROPDOWN WITH BADGES
    case "multi-select": {
      const selectedValues: string[] = Array.isArray(fieldProps.value)
        ? fieldProps.value
        : [];

      const handleToggle = (val: string) => {
        if (selectedValues.includes(val)) {
          fieldProps.onChange(selectedValues.filter((v) => v !== val));
        } else {
          fieldProps.onChange([...selectedValues, val]);
        }
      };

      return (
        <div className="flex flex-col gap-2 w-full">
          <Popover open={openMulti} onOpenChange={setOpenMulti}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openMulti}
                className="w-full justify-between font-normal"
              >
                <span className="truncate">
                  {selectedValues.length > 0
                    ? `${selectedValues.length} selected`
                    : config.placeholder || "Select choices..."}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-(--radix-popover-trigger-width) p-0"
              align="start"
            >
              <Command
                filter={(value, search) =>
                  value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
                }
              >
                <CommandInput placeholder="Type to filter..." />
                <CommandList>
                  <CommandEmpty>No matching entries.</CommandEmpty>
                  <CommandGroup>
                    {config.options?.map((opt) => {
                      const isSelected = selectedValues.includes(opt.value);
                      return (
                        <CommandItem
                          key={opt.value}
                          value={opt.label}
                          onSelect={() => handleToggle(opt.value)}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50",
                            )}
                          >
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                          {opt.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedValues.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1 p-2 border rounded-md max-h-24 overflow-y-auto bg-muted/30">
              {selectedValues.map((val) => {
                const label =
                  config.options?.find((o) => o.value === val)?.label || val;
                return (
                  <Badge
                    key={val}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {label}
                    <button
                      type="button"
                      className="rounded-full outline-none p-0.5 hover:bg-muted"
                      onClick={() => handleToggle(val)}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    case "checkbox-group": {
      const currentSelection: string[] = Array.isArray(fieldProps.value)
        ? fieldProps.value
        : [];
      return (
        <div className="space-y-2 mt-1">
          {config.options?.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${config.name}-${opt.value}`}
                checked={currentSelection.includes(opt.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    fieldProps.onChange([...currentSelection, opt.value]);
                  } else {
                    fieldProps.onChange(
                      currentSelection.filter((v) => v !== opt.value),
                    );
                  }
                }}
              />
              <label
                htmlFor={`${config.name}-${opt.value}`}
                className="text-sm font-normal cursor-pointer text-foreground"
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
};
