import classNames from "classnames";
import { CircleCheck } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";

type InputTodoProps = {
  value: string;
  done?: boolean;
  placeholder?: boolean;
  focus: boolean;
  onClick?: () => void;
  onChange?: (text: string) => void;
};

function InputTodo({
  onChange,
  onClick,
  value,
  done = false,
  focus = false,
}: InputTodoProps) {
  const [valueInput, setValue] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const classesHr = classNames("border-t-2 mb-1 mx-2", {
    "border-slate-600 border-opacity-30": !focus,
    "border-rose-500 border-opacity-40": focus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      setValue(e.target.value);
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    if (focus) inputRef.current?.focus();
  }, [focus]);

  return (
    <>
      <li className="flex-1 w-full flex items-center">
        <input
          ref={inputRef}
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

export default InputTodo;
