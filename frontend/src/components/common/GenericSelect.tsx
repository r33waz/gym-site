import type { SelectProps } from "@/interface/ui.interface";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const GenericSelect = (props: SelectProps) => {
  const {
    options,
    value,
    onChange,
    control,
    name,
    label,
    className,
    isRequired,
  } = props;

  if (control && name) {
    return (
      <>
        <div className="flex flex-col gap-1">
          <Label htmlFor={name} className="text-md">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Select
                value={
                  field.value !== undefined && field.value !== null
                    ? String(field.value)
                    : undefined
                }
                onValueChange={(val) => field.onChange(val)}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder={label || "Select"} />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectGroup className="mt-9">
                    {options?.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </>
    );
  }

  // Normal standalone usage
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor={name} className="text-md">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
        <Select
          value={
            value !== undefined && value !== null ? String(value) : undefined
          }
          onValueChange={(val) => onChange(val)}
        >
          <SelectTrigger className={`${className} w-45`}>
            <SelectValue placeholder={label || "Select"} />
          </SelectTrigger>
          <SelectContent position="popper" className="">
            <SelectGroup>
              {options?.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default GenericSelect;
