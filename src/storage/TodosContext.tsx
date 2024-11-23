import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { TodosType } from "../types/Todos.types";
import { getTodosForWeek, getAllNotes } from "../services/todosApi";
import getWeekdays from "../util/createWeekdays";
import normalizeDate from "../util/normalizeDate";

type TodosContextType = {
  todos: TodosType[];
  notes: TodosType[];
  activeDate: Date;
  fetching: boolean;
  handleDone: (id: string) => void;
  handleChange: (id: string, text: string) => void;
  handleDelete: (id: string) => void;
  getTodosForDay: (date: Date) => TodosType[];
  setDateTo: (date: Date) => void;
  getSingleTodo: (id: string) => TodosType | undefined;
};

export const todosContext = createContext<TodosContextType>(
  {} as TodosContextType
);

function log(text: unknown) {
  console.log("%c [Context] ", "color: rgb(0, 255, 150);", text);
}

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [notes, setNotes] = useState<TodosType[]>([]);
  const [fetching, setFetching] = useState(true);

  const [activeDate, setActiveDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      const week = getWeekdays(activeDate);

      // * get all todos for this week 7 days ------------------------
      const weeklyTodos = await getTodosForWeek(activeDate);

      // add an empty "todo" for everyday
      week.forEach((day) => {
        weeklyTodos.push({
          id: crypto.randomUUID(),
          task: "",
          done: false,
          date: day,
          isNote: 0,
        });
      });

      // * get permanent notes todos ------------------------
      // only fetch notes if there aren't loaded yet
      if (notes.length > 0) return { todos: weeklyTodos, notes };
      else {
        const notesTodos = await getAllNotes();
        // add an empty "todo" for everyday
        const positions = [1, 2, 3];
        positions.forEach((position) => {
          notesTodos.push({
            date: new Date(),
            id: crypto.randomUUID(),
            task: "",
            done: false,
            isNote: position as 1 | 2 | 3,
          });
        });

        // convert ISOString from DB to Date() js object
        notesTodos.forEach((todo) => {
          todo.date = new Date(todo.date);
        });

        return { todos: weeklyTodos, notes: notesTodos };
      }
    };

    fetchData()
      .then(({ todos, notes }) => {
        setTodos(todos);
        setNotes(notes);
      })
      .catch((error) =>
        console.error("%c Error fetching data:", "color: red", error)
      )
      .finally(() => setFetching(false));
    // notes are fetched only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate]);

  const handleDone = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      const doneTodo = prevTodos.find((todo) => todo.id === todoId);
      if (doneTodo?.isNote) return prevTodos;

      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    });

    setTodos((prevTodos) => {
      const doneTodo = prevTodos.find((todo) => todo.id === todoId);
      if (!doneTodo?.isNote) return prevTodos;

      return prevTodos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    });
  }, []);

  const handleChange = useCallback((id: string, text: string) => {
    setTodos((prevTodos) => {
      const todoEdited = prevTodos.find((todo) => todo.id === id);
      if (!todoEdited) return prevTodos;

      // normalize date and organize by date
      const dateString = normalizeDate(todoEdited.date);
      const todosForDay = prevTodos.filter(
        (todo) => normalizeDate(todo.date) === dateString
      );
      //check last element, if it is, create an empty elementç
      const isLastElement = todosForDay[todosForDay.length - 1]?.id === id;

      const modifiedTodos = prevTodos.map((todo) => {
        if (!todoEdited) return todo;
        if (todo.id === id) {
          return { ...todo, task: text };
        }
        return todo;
      });

      if (isLastElement) {
        modifiedTodos.push({
          id: crypto.randomUUID(),
          date: todoEdited.date,
          task: "",
          done: false,
          isNote: 0,
        });
      }

      return modifiedTodos;
    });

    setNotes((prevTodos) => {
      const todoEdited = prevTodos.find((todo) => todo.id === id);
      if (!todoEdited) return prevTodos;

      // normalize date and organize by date
      const todosForPosition = prevTodos.filter(
        (todo) => todo.isNote === todoEdited.isNote
      );
      //check last element, if it is, create an empty element
      const isLastElement =
        todosForPosition[todosForPosition.length - 1]?.id === id;

      const modifiedTodos = prevTodos.map((todo) => {
        if (!todoEdited) return todo;
        if (todo.id === id) {
          return { ...todo, task: text };
        }
        return todo;
      });

      if (isLastElement) {
        modifiedTodos.push({
          id: crypto.randomUUID(),
          date: new Date(),
          task: "",
          done: false,
          isNote: todoEdited.isNote,
        });
      }

      return modifiedTodos;
    });
  }, []);

  const getTodosForDay = (date: Date) => {
    const normalDate = normalizeDate(date);
    return todos.filter(
      (todo) => normalizeDate(todo.date) == normalDate && todo.isNote === 0
    );
  };

  const getSingleTodo = (id: string): TodosType | undefined => {
    const allTodos = [...todos, ...notes];
    return allTodos.find((todo) => todo.id === id);
  };

  const setDateTo = (date: Date) => {
    setActiveDate(date);
  };

  const handleDelete = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    setNotes((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  return (
    <todosContext.Provider
      value={{
        todos,
        handleDone,
        handleChange,
        getTodosForDay,
        activeDate,
        setDateTo,
        fetching,
        getSingleTodo,
        handleDelete,
        notes,
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
