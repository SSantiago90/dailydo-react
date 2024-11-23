import classNames from "classnames";
import { CircleCheck, Pencil } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import TodoDetails from "./InputDetails";

type InputTodoProps = {
  value: string;
  done?: boolean;
  placeholder?: boolean;
  id: string;
  controls?: boolean;
  onClick: () => void;
  onChange: (text: string) => void;
  onDelete: () => void;
};

function InputTodo({
  onChange,
  onClick,
  onDelete,
  id,
  value,
  done = false,
  controls = true,
}: InputTodoProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { themeColor } = useTheme();

  const classesInput = classNames(
    "bg-transparent text-slate-300 focus:ring-0 focus:border-none border-none click:border-none p-1 pt-2 w-full max-w-full box-border flex outline-none focus-visible:border-none hover:border-none",
    { "line-through": done },
    { "text-slate-700": done },
    { "cursor-text": value !== "" }
  );

  const classesIcon = classNames(
    { "text-slate-400": done },
    { "text-white": !done },
    [`hover:text-${themeColor}-500 cursor-pointer mr-2`]
  );

  const classesHr = classNames(
    "border-t-2 mb-1 transition transform duration-200 ease-in-out ",
    {
      "border-slate-600 border-opacity-30": !focus,
      [`border-${themeColor}-500 border-opacity-70`]: focus,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      //setFocus(true);
      //setValue(e.target.value);
      onChange(e.target.value);
    }
  };

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  /* useEffect(() => {
    return setValue(value);
  }, [value]); */

  return (
    <>
      <li className="flex-1 w-full flex items-center">
        <input
          autoFocus={!controls}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
          className={classesInput}
          type="text"
          value={value}
        />
        {value !== "" && controls && (
          <>
            <Pencil
              strokeWidth={1.7}
              opacity={0.8}
              size={18}
              onClick={openModal}
              className={classesIcon}
            />
            <CircleCheck
              strokeWidth={1.7}
              opacity={0.8}
              size={18}
              onClick={onClick}
              className={classesIcon}
            />
          </>
        )}
      </li>
      <hr className={classesHr} />
      {isOpen && (
        <TodoDetails
          onDelete={onDelete}
          isOpen={isOpen}
          onClose={closeModal}
          id={id}
        />
      )}
    </>
  );
}

export default InputTodo;
