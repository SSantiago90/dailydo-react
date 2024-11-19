import classNames from "classnames";
import { CircleCheck } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";

type InputTodoProps = {
  value: string;
  done?: boolean;
  placeholder?: boolean;
  onClick?: () => void;
  onChange?: (text: string) => void;
};

export default function InputTodo({
  onChange,
  onClick,
  value,
  done = false,
}: InputTodoProps) {
  const [valueInput, setValue] = useState<string>(value);
  const [focus, setFocus] = useState<boolean>(false);
  const { themeColor } = useTheme();

  const classesInput = classNames(
    { "line-through": done },
    "bg-transparent text-slate-300 py-1 px-4 w-full max-w-full box-border flex outline-none focus-visible:border-none hover:border-none",
    { "text-slate-700": done },
    { "cursor-grab": value !== "" }
  );

  const classesIcon = classNames(
    { "text-slate-600": done },
    { "text-white": !done },
    "text-slate-600 hover:text-slate-700 cursor-pointer mr-2"
  );

  const classesHr = classNames(
    "border-t-2 mb-1 mx-2 transition transform duration-200 ease-in-out ",
    {
      "border-slate-600 border-opacity-30": !focus,
      [`border-${themeColor}-500 border-opacity-70`]: focus,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      setFocus(true);
      setValue(e.target.value);
      onChange(e.target.value);
    }
  };

  return (
    <>
      <li className="flex-1 w-full flex items-center">
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
          className={classesInput}
          type="text"
          value={valueInput}
        />
        {value !== "" && (
          <CircleCheck
            strokeWidth={1.7}
            opacity={0.8}
            size={18}
            onClick={onClick}
            className={classesIcon}
          />
        )}
      </li>
      <hr className={classesHr} />
    </>
  );
}
