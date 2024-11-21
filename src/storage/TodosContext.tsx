import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { TodosType } from "../types/Todos.types";
import { NotesType } from "../types/Notes.types";
import { getTodosForWeek } from "../services/todosApi";
import getWeekdays from "../util/createWeekdays";
import normalizeDate from "../util/normalizeDate";

type TodosContextType = {
  todos: TodosType[];
  notes: NotesType[];
  activeDate: Date;
  fetching: boolean;
  fetchingNotes: boolean;
  handleDone: (id: string) => void;
  handleChange: (id: string, text: string) => void;
  handleNewTodo: (date: Date) => void;
  deleteTodo: (id: string) => void;
  getTodosForDay: (date: Date) => TodosType[];
  setDateTo: (date: Date) => void;
  getSingleTodo: (id: string) => TodosType | undefined;
};

export const todosContext = createContext<TodosContextType>(
  {} as TodosContextType
);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [notes, setNotes] = useState<NotesType[]>([]);

  const [activeDate, setActiveDate] = useState(new Date());
  const [fetching, setFetching] = useState(true);
  const [fetchingNotes, setFetchingNotes] = useState(true);

  // Fetch data for weekly todos
  useEffect(() => {
    setFetching(true);
    const week = getWeekdays(activeDate);

    const fetchData = async () => {
      const weeklyTodos = await getTodosForWeek(activeDate);

      week.forEach((day) => {
        // add an empty "todo" for everyday
        weeklyTodos.push({
          id: crypto.randomUUID(),
          task: "",
          done: false,
          date: day,
        });
      });
      const weeklyTodosFormatedDates = weeklyTodos.map((todo) => {
        return {
          ...todo,
          date: new Date(todo.date),
        };
      });
      setTodos(weeklyTodosFormatedDates);
    };

    fetchData()
      .catch((error) =>
        console.error("%c Error fetching data:", "color: red", error)
      )
      .finally(() => setFetching(false));
  }, [activeDate]);

  // fetch data for notes
  useEffect(() => {
    setFetchingNotes(true);
    const fetchNotes = async () => {
      const positions = [1, 2, 3];
      const response = await fetch("http://localhost:3000/todos/notes");
      const notes = await response.json();

      // add an empty "todo" for everyday
      positions.forEach((position) => {
        notes.push({
          id: crypto.randomUUID(),
          task: "",
          done: false,
          date: new Date(),
          position: position,
        });
      });
      setNotes(notes);
    };
    fetchNotes()
      .catch((error) =>
        console.error("%c Error fetching data:", "color: red", error)
      )
      .finally(() => setFetchingNotes(false));
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
        notes,
        fetchingNotes,
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
