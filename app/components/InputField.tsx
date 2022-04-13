interface Props {
  label: string;
  name: string;
  value?: string | number;
  inputType?: 'text' | 'number' | 'email' | 'date';
  className?: string;
  required?: boolean;
}

export function InputField({
  label,
  name,
  value,
  inputType = 'text',
  className = 'inputField',
  required = false,
}: Props) {
  return (
    <label htmlFor={label} className="block text-sm font-medium text-slate-600 capitalize mb-2">
      {`${label}${required ? '*' : ''}`}
      <input type={inputType} name={name} id={name} defaultValue={value} className={className} required={required} />
    </label>
  );
}
