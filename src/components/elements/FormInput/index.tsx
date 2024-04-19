import { useState } from "react";

interface FormInputProps {
  className?: string;
  id: string;
  type: "email" | "password" | "text" | "date" | "datetime-local";
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

function FormInput({
  id,
  type,
  name,
  placeholder,
  required,
  value,
  onChange,
  className,
  onBlur,
  onFocus,
}: FormInputProps) {
  const [inputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setInputFocused(false);
    if (onBlur) onBlur();
  };
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={className}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}

export default FormInput;
