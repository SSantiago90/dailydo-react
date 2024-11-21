import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { TodosType } from "../types/Todos.types";
import { getTodosForWeek } from "../services/todosApi";
import getWeekdays from "../util/createWeekdays";
import normalizeDate from "../util/normalizeDate";

type TodosContextType = {
  todos: TodosType[];
  activeDate: Date;
  handleDone: (id: string) => void;
  handleChange: (id: string, text: string) => void;
  handleNewTodo: (date: Date) => void;
  deleteTodo: (id: string) => void;
  getTodosForDay: (date: Date) => TodosType[];
  setDateTo: (date: Date) => void;
  getSingleTodo: (id: string) => TodosType | undefined;
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

    const fetchData = async () => {
      const weeklyTodos = await getTodosForWeek(activeDate);
      week.forEach((day) => {
        // add an empty "todo" for everyday
        weeklyTodos.push({
          date: day,
          id: crypto.randomUUID(),
          task: "",
          done: false,
        });
      });
      const weeklyTodosFormatedDates = weeklyTodos.map((todo) => {
        return {
          ...todo,
          date: new Date(todo.date),
        };
      });
      setTodos(weeklyTodosFormatedDates);
      setFetching(false);
    };

    fetchData().catch((error) =>
      console.error("%c Error fetching data:", "color: red", error)
    );
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
    const normalDate = normalizeDate(date);
    return todos.filter((todo) => normalizeDate(todo.date) == normalDate);
  };

  const getSingleTodo = (id: string): TodosType | undefined => {
    return todos.find((todo) => todo.id === id);
  };

  const setDateTo = (date: Date) => {
    setActiveDate(date);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
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
        getSingleTodo,
        deleteTodo,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(todosContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
