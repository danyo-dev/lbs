
interface Props {
  label: string;
  value: string;
  inputType?: 'text' | 'number' | 'email' | 'date';
}

export function InputField({ label, value, inputType = 'text' }: Props) {
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
        className="inputField"
      />
    </label>
  )
}