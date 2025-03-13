import classNames from "classnames";
import { useState } from "react";
import { useTheme } from "../../storage/ThemeContext";

export type InputFormProps = {
  label: string;
  name: string;
  type?: string;
  disabled?: boolean;
  error?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
  pattern?: string;
  required?: boolean;
  children?: React.ReactNode;
  invalidMessage: string;
};

export default function InputForm({
  label,
  name,
  type = "text",
  disabled,
  error,
  onChange,
  pattern,
  required,
  children,
  invalidMessage,
}: InputFormProps) {
  const { themeColor } = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    setHasChanged(true);
    setIsValid(input.validity.valid);
    if (onChange) onChange(event);
  };

  const classesInput = classNames(
    "bg-transparent text-slate-300 focus:ring-0 focus:border-none xl:text-xs border-none click:border-none p-1 pt-2 w-full max-w-full box-border flex outline-none focus-visible:border-none hover:border-none"
  );
  const classesHr = classNames(
    "border-t-2 mb-1 transition transform duration-200 ease-in-out",
    {
      [`border-${themeColor}-500`]: isValid && hasChanged,
      [`border-white border-opacity-100`]: isFocus && hasChanged,
      "border-red-500": !isValid,
      [`border-slate-500 border-opacity-70`]: !hasChanged,
    }
  );

  return (
    <div className="mt-10">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-slate-400"
      >
        {label}
      </label>
      <span className="flex-1 w-full flex items-center">
        <input
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          type={type}
          id={name}
          name={name}
          pattern={pattern}
          className={classesInput}
        />
        {children}
      </span>
      <hr className={classesHr}></hr>

      {isValid ? (
        <span className="text-xs text-slate-400 text-right block mt-2">
          {error}
        </span>
      ) : (
        <span className="text-xs text-red-500 text-right block mt-2">
          {invalidMessage}
        </span>
      )}
    </div>
  );
}
