import classNames from "classnames";
import { useTheme } from "../storage/ThemeContext";
import { CircleX, Trash } from "lucide-react";
import { useTodos } from "../storage/TodosContext";
import { useEffect, useRef, useState } from "react";
import { TodosType } from "../types/Todos.types";
import HBar from "./UI/HBar";
import InputTodo from "./InputTodo";

type TodoDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  id: string;
};
export default function TodoDetails(TodoDetailsProps: TodoDetailsProps) {
  const { isOpen, onClose, onDelete, id } = TodoDetailsProps;

  const [todo, setTodo] = useState<TodosType | null>(null);
  const { themeColor } = useTheme();
  const { getSingleTodo, handleChange } = useTodos();

  useEffect(() => {
    const todo = getSingleTodo(id) as TodosType | null;
    setTodo(todo);
  }, [id, getSingleTodo]);

  const initialTodoRef = useRef<string>("");

  useEffect(() => {
    const initialTodo = getSingleTodo(id) as TodosType | null;
    initialTodoRef.current = initialTodo?.task || "";
  }, [id]);

  const handleDiscard = () => {
    if (!todo) return;
    handleChange(todo.id, initialTodoRef.current);
    onClose();
  };

  return (
    <Modal
      colorClassName={`text-${themeColor}-700`}
      isOpen={isOpen}
      onClose={onClose}
      onDelete={onDelete}
    >
      {!todo ? (
        <p>Todo not found</p>
      ) : (
        <div className="flex gap-4 flex-col text-left">
          <div className="flex gap-1 flex-col text-left mb-8">
            <InputTodo
              onChange={(text) => handleChange(todo.id, text)}
              controls={false}
              value={todo.task}
              done={todo.done}
              id={todo.id}
            />
            {/* <h2 className="font-bold text-lg">{todo.task}</h2> */}
            <p className={`text-xs text-right text-${themeColor}-500`}>
              <>{console.log("--------------------------", todo)}</>
              Created on: {new Date(todo.date).toLocaleDateString()}
            </p>
          </div>
          <HBar />
          <div className="flex flex-row gap-5 justify-around">
            <button
              onClick={onClose}
              className={`text-slate-500 hover:text-green-500 py-2 px-4 rounded-lg border-slate-500 border-1`}
            >
              Save
            </button>
            <button
              onClick={handleDiscard}
              className={`text-rose-800 hover:text-rose-600 py-2 px-4 rounded-lg border-slate-500 border-1`}
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function Modal({
  isOpen,
  onClose,
  onDelete,
  children,
  colorClassName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
  colorClassName?: string;
}) {
  const classesModal = classNames(
    "fixed z-50 top-0 right-0 bottom-0 left-0 ",
    "bg-black bg-opacity-20",
    "flex justify-center items-center"
  );

  const classesModalContainer = classNames(
    "relative backdrop-blur-lg bg-black bg-opacity-10 rounded-lg -mt-12 w-96 pt-12 pb-2 px-4"
  );
  return (
    <>
      {isOpen && (
        <div className={classesModal}>
          <div className={classesModalContainer}>
            <div className="absolute top-0 right-0 p-3 flex flex-row gap-2">
              {onDelete && (
                <button onClick={onDelete}>
                  <Trash
                    className={colorClassName}
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              )}
              <button onClick={onClose}>
                <CircleX
                  className={colorClassName}
                  size={20}
                  strokeWidth={1.2}
                />
              </button>
            </div>
            <HBar />
            <div className="py-5 px-2">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
