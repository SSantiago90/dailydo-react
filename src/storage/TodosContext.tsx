import { createContext, useState, ReactNode, useEffect } from "react";
import { TodosType } from "../types/Todos.types";
import { getTodosForWeek } from "../services/mockDataAsync";
import getWeekdays from "../util/createWeekdays";

type TodosContextType = {
  todos: TodosType[];
  activeDate: Date;
  handleDone: (id: string) => void;
  handleChange: (id: string, text: string) => void;
  handleNewTodo: (date: Date) => void;
  getTodosForDay: (date: Date) => TodosType[];
  setDateTo: (date: Date) => void;
  fetching: boolean;
};

export const todosContext = createContext<TodosContextType>(
  {} as TodosContextType
);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [activeDate, setActiveDate] = useState(new Date());
  const [fetching, setFetching] = useState(true);

  // setup mockup data
  useEffect(() => {
    setFetching(true);
    const week = getWeekdays(activeDate);
    //const weeklyTodos = getTodosForWeek(week);
    const fetchData = async () => {
      const weeklyTodos = await getTodosForWeek(week);
      week.forEach((day) => {
        // add an empty "todo" for everyday
        weeklyTodos.push({
          date: day,
          id: crypto.randomUUID(),
          task: "",
          done: false,
        });
      });
      setTodos(weeklyTodos);
      setFetching(false);
    };

    fetchData();
  }, [activeDate]);

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

  const handleNewTodo = (date: Date) => {
    const newTodo = {
      id: crypto.randomUUID(),
      date: date,
      task: "",
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const getTodosForDay = (date: Date) => {
    return todos.filter((todo) => {
      return todo.date.toLocaleDateString() == date.toLocaleDateString();
    });
  };

  const setDateTo = (date: Date) => {
    setActiveDate(date);
  };

  return (
    <todosContext.Provider
      value={{
        todos,
        handleDone,
        handleChange,
        handleNewTodo,
        getTodosForDay,
        activeDate,
        setDateTo,
        fetching,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};
