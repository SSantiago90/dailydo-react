import { useEffect, useState } from "react";
import DayView from "./components/DayView";
import { TodosType } from "./types/Todos.types.ts";
import { getData } from "./services/mockData.js";
import HBar from "./components/UI/HBar.tsx";
import DayContainer from "./components/DayContainer.tsx";
import InputTodo from "./components/InputTodo.tsx";
import { ListTodo } from "lucide-react";

function App() {
  const [todos, setTodos] = useState<TodosType[]>([]);
  // * boilerplate test data
  useEffect(() => {
    setTodos(getData());
  }, []);

  const handleDone = (todoId: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChange = (id: string, text: string) => {
    // modify the task of the todo with the given id with the new text
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: text };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleNewTodo = (text: string, date: Date) => {
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), date, task: text, done: false },
    ]);
  };

  return (
    <>
      <header className="mt-6 mb-10 flex items-center justify-center gap-2">
        <h1 className="text-6xl font-black text-rose-100">
          daily
          <span className="text-8xl pl-0 text-rose-500 opacity-70 _text-handwritten">
            Do
          </span>
        </h1>
      </header>
      <HBar bold />
      <section className="_days-container flex gap-4 flex-row mx-auto my-12 p-8">
        <DayContainer
          handleChange={handleChange}
          handleDone={handleDone}
          handleNewTodo={handleNewTodo}
          todos={todos}
        />
      </section>

      <HBar className="mt-40" bold />
    </>
  );
}

export default App;
