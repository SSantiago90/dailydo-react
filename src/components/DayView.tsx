import InputTodo from "./InputTodo";
import { TodosType } from "../types/Todos.types";
import HBar from "./UI/HBar";
import InputPlaceholder from "./InputPlaceholder";
import { useEffect } from "react";

type DayViewProps = {
  handleDone: (id: string) => void;
  handleChange: (id: string, text: string) => void;
  handleNewTodo: (text: string, date: Date) => void;
  date: Date;
  todos: TodosType[];
};

export default function DayView({
  handleChange,
  handleDone,
  handleNewTodo,
  date,
  todos,
}: DayViewProps) {
  const day = date.getDate() + "." + date.getMonth();
  const dayName = date.toLocaleString("en-US", { weekday: "short" });

  useEffect(() => {
    // give focus to LAST modified todo
  }, [todos]);

  return (
    <div style={{ maxWidth: "400px" }} className="flex flex-col  rounded py-5">
      <div className="flex flex-row gap-2 justify-normal">
        <h3 className="text-4xl mb-1 font-bold text-rose-200 text-right pr-2 _text-handwritten">
          {day}
        </h3>
        <h3 className="text-4xl mb-1 font-bold text-rose-500 opacity-70 text-left pl-1 _text-handwritten">
          {dayName}
        </h3>
      </div>
      <HBar />

      <div>
        <ul className="list-none flex flex-col">
          {todos.map((todo, index) => (
            <InputTodo
              onChange={(text) => handleChange(todo.id, text)}
              onClick={() => handleDone(todo.id)}
              key={index}
              value={todo.task}
              done={todo.done}
            />
          ))}
          {/*   <InputPlaceholder
            index={todos.length}
            onChange={(text) => handleNewTodo(text, date)}
          /> */}
        </ul>
      </div>
    </div>
  );
}
