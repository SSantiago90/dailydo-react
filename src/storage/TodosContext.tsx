import { createContext, useState, ReactNode, useEffect } from "react";
import { TodosType } from "../types/Todos.types";
import { getData } from "../services/mockData";

type TodosContextType = {
  todos: TodosType[];
  handleDone: (id: string) => void;
  handleChange: (id: string, text: string) => void;
  handleNewTodo: (text: string, date: Date) => void;
  getTodosForDay: (date: Date) => TodosType[];
};

export const todosContext = createContext<TodosContextType>(
  {} as TodosContextType
);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodosType[]>([]);

  // setup mockup data
  useEffect(() => {
    setTodos(getData());
  }, []);

  console.log("context", todos);

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

  const getTodosForDay = (date: Date) => {
    return todos.filter((todo) => {
      return todo.date.toLocaleDateString() == date.toLocaleDateString();
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleDone, handleChange, handleNewTodo, getTodosForDay }}
    >
      {children}
    </todosContext.Provider>
  );
};
