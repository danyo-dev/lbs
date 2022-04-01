interface Props {
  label: string
  value?: string | number
  inputType?: "text" | "number" | "email" | "date"
  className?: string
  required?: boolean
}

export function InputField({
  label,
  value,
  inputType = "text",
  className = "inputField",
  required = false,
}: Props) {
  return (
    <label
      htmlFor={label}
      className="block text-sm font-medium text-slate-600 capitalize mb-4"
    >
      {label}
      <input
        type={inputType}
        name={label}
        id={label}
        defaultValue={value}
        className={className}
        required={required}
      />
    </label>
  )
}
