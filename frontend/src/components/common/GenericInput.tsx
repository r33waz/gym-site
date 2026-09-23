// components/generic/GenericInput.tsx
import type { InputProps } from "@/interface/ui.interface";
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";

const GenericInput = (props: InputProps) => {
  const {
    type,
    className,
    control,
    name,
    disabled,
    placeholder,
    label,
    isRequired,
    debounce,
    value,
    onChange,
  } = props;

  // ── Uncontrolled (no RHF) with optional debounce ──────────────────────────
  const [localValue, setLocalValue] = useState<string | number>(value ?? "");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);

  const handleUncontrolledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    if (!onChange) return;

    if (debounce && debounce > 0) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(
        () => onChange(e.target.value),
        debounce,
      );
    } else {
      onChange(e.target.value);
    }
  };

  // ── Shared label wrapper ───────────────────────────────────────────────────
  const renderLabel = (fieldName?: string) =>
    label ? (
      <label
        htmlFor={fieldName ?? name}
        className="mb-1 block text-sm font-medium text-foreground"
      >
        {label}
        {isRequired && <span className="ml-1 text-destructive">*</span>}
      </label>
    ) : null;

  // ── Uncontrolled path ──────────────────────────────────────────────────────
  if (!control || !name) {
    return (
      <div className="flex flex-col">
        {renderLabel()}
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          value={localValue}
          onChange={handleUncontrolledChange}
          className={className}
          disabled={disabled}
          required={isRequired}
        />
      </div>
    );
  }

  // ── RHF-controlled path ────────────────────────────────────────────────────
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleControlledChange = (
          e: React.ChangeEvent<HTMLInputElement>,
        ) => {
          if (debounce && debounce > 0) {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(
              () => field.onChange(e),
              debounce,
            );
          } else {
            field.onChange(e);
          }
        };

        return (
          <div className="flex flex-col">
            {renderLabel(field.name)}
            <Input
              id={field.name}
              placeholder={placeholder}
              type={type}
              {...field}
              onChange={handleControlledChange}
              className={className}
              disabled={disabled}
              required={false}
              aria-invalid={!!fieldState.error}
            />
            {fieldState.error && (
              <p className="mt-1 text-sm text-destructive">
                {t(fieldState?.error?.message ?? "")}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default GenericInput;
