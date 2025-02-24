import classNames from "classnames";
import { CircleCheck, Pencil } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import TodoDetails from "./InputDetails";
import { motion, AnimatePresence } from "framer-motion";

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
  const [valueInput, setValue] = useState<string>(value);
  const [focus, setFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { themeColor } = useTheme();

  const classesInput = classNames(
    "bg-transparent text-slate-300 focus:ring-0 focus:border-none xl:text-xs border-none click:border-none p-1 pt-2 w-full max-w-full box-border flex outline-none focus-visible:border-none hover:border-none",
    { "line-through": done },
    { "text-slate-700": done },
    { "hover:cursor-grab": value !== "" }
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
      setValue(e.target.value);
      onChange(e.target.value);
    }
  };

  const handleDragStart = (evt: DragEvent) => {
    console.log("start", value, id);
    evt.dataTransfer?.setData("text", value);
  };

  const handleDragEnds = () => {
    console.log("ends", value, id);
    const newValue = localStorage.getItem("prevInput");
    localStorage.removeItem("prevInput");
    onChange(newValue || "");
  };

  const handleDragDrop = (evt: React.DragEvent) => {
    console.log("drop", value, id);
    const inputText = evt.dataTransfer.getData("text");
    localStorage.setItem("prevInput", valueInput);
    setValue("");
    onChange(inputText);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    return setValue(value);
  }, [value]);

  return (
    <>
      <li className="flex-1 w-full flex items-center">
        <motion.input
          autoFocus={!controls}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleChange}
          className={classesInput}
          draggable={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnds}
          onDrop={handleDragDrop}
          type="text"
          value={valueInput}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
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
      <motion.hr
        className={classesHr}
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />

      <AnimatePresence mode="wait">
        {isOpen && (
          <TodoDetails
            onDelete={() => {
              closeModal();
              setTimeout(() => {
                onDelete();
              }, 150);
            }}
            onDone={onClick}
            isOpen={isOpen}
            onClose={closeModal}
            id={id}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(InputTodo, (prevProps, nextProps) => {
  return (
    prevProps.done === nextProps.done &&
    prevProps.value === nextProps.value &&
    prevProps.id === nextProps.id
  );
});
