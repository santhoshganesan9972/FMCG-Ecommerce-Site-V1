"use client";

import { BORDER, BG_LIGHT, TEXT_PRIMARY, TEXT_MUTED, TEXT_DISABLED, BORDER_FOCUS, BTN_PRIMARY, BTN_SECONDARY, TRANSITION } from "@/lib/shared-classes";

interface FormFieldConfig {
  key: string;
  label: string;
  type?: "text" | "number" | "email" | "select" | "textarea" | "date" | "password";
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  className?: string;
  defaultValue?: string;
}

interface ReusableFormProps {
  fields: FormFieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSubmit: (values: Record<string, string>) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  columns?: 1 | 2 | 3;
  className?: string;
  loading?: boolean;
}

const formInputClass =
  `h-11 w-full rounded-xl ${BORDER} ${BG_LIGHT} px-3 text-sm ${TEXT_PRIMARY} outline-none ${TRANSITION} ${BORDER_FOCUS} placeholder:${TEXT_DISABLED}`;

const formGridCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * A generic form builder from field configurations.
 *
 * @example
 * <ReusableForm
 *   fields={[
 *     { key: "name", label: "Name", required: true },
 *     { key: "role", label: "Role", type: "select", options: [{ label: "Admin", value: "admin" }] },
 *   ]}
 *   values={formValues}
 *   onChange={handleChange}
 *   onSubmit={handleSubmit}
 * />
 */
export function ReusableForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  columns = 2,
  className = "",
  loading = false,
}: ReusableFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className={`grid ${formGridCols[columns]} gap-4`}>
        {fields.map((field) => (
          <div key={field.key} className={field.className || ""}>
            <label className={`mb-1.5 block text-xs font-bold ${TEXT_MUTED}`}>
              {field.label}
              {field.required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            {field.type === "textarea" ? (
              <textarea
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                rows={3}
                className={`w-full rounded-xl ${BORDER} ${BG_LIGHT} px-3 py-2.5 text-sm ${TEXT_PRIMARY} outline-none ${TRANSITION} ${BORDER_FOCUS} placeholder:${TEXT_DISABLED}`}
              />
            ) : field.type === "select" ? (
              <select
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                required={field.required}
                className={formInputClass}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                value={values[field.key] || ""}
                onChange={(e) => onChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                required={field.required}
                className={formInputClass}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={BTN_SECONDARY}
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={BTN_PRIMARY}
        >
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
