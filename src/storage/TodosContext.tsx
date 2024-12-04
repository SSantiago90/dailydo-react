import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { TodosType } from "../types/Todos.types";
import {
  getTodosForWeek,
  getAllNotes,
  updateTodo,
  createTodo,
  deleteTodo,
} from "../services/todosApi";
import getWeekdays from "../util/createWeekdays";
import normalizeDate from "../util/normalizeDate";
import { useDebounce } from "@uidotdev/usehooks";
import newLogger from "../util/log";

type TodosContextType = {
  todos: TodosType[];
  notes: TodosType[];
  activeDate: Date;
  fetching: boolean;
  errors: Error | null;
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

const log = newLogger("TodosContext");

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodosType[]>([]);
  const [notes, setNotes] = useState<TodosType[]>([]);
  const [fetching, setFetching] = useState(true);
  const [activeDate, setActiveDate] = useState(new Date());
  const [cachedDates, setCachedDates] = useState<Date[]>([]);
  const [errors, setErrors] = useState<Error | null>(null);
  const [updatingTodos, setUpdatingTodos] = useState<string[]>([]);
  const debouncedTodos = useDebounce(todos, 1500);
  const debouncedNotes = useDebounce(notes, 1500);

  const isCachedDate = (date: Date) =>
    cachedDates.some(
      (cachedDate) => normalizeDate(cachedDate) === normalizeDate(date)
    );

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

    setNotes((prevNotes) => {
      const doneTodo = prevNotes.find((todo) => todo.id === todoId);
      if (!doneTodo?.isNote) return prevNotes;

      return prevNotes.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // if todo-data is not cached, start fetching new data
      setFetching(true);

      // get all day-dates for this week's days
      const week = getWeekdays(activeDate);
      // cache all day-dates for this week
      setCachedDates((prevState) => [...prevState, ...week]);

      // * get all todos for this week 7 days ---------------------------------
      const weeklyTodos = await getTodosForWeek(activeDate);

      // add an empty "todo" for everyday
      week.forEach((day) => {
        weeklyTodos.push({
          id: crypto.randomUUID().slice(0, 6),
          task: "",
          done: false,
          date: day,
          isNote: 0,
        });
      });

      // * get permanent notes todos ---------------------------------
      // only fetch notes if there aren't loaded yet
      if (notes.length > 0) return { todos: weeklyTodos, notes };
      else {
        const notesTodos = await getAllNotes();
        // add an empty "todo" for everyday
        const positions = [1, 2, 3];
        positions.forEach((position) => {
          notesTodos.push({
            date: new Date(),
            id: crypto.randomUUID().slice(0, 6),
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

    if (!isCachedDate(activeDate)) {
      fetchData()
        .then(({ todos, notes }) => {
          setTodos((prevTodos) => [...prevTodos, ...todos]);
          setNotes(notes);
        })
        .catch((err) => {
          if (err.message.includes("Network")) {
            setErrors(
              new Error(
                "Network Error: couldn't connect to server. Make sure your internet connection is working or try again later."
              )
            );
          }
          console.error("%c Error fetching data:", "color: red", err);
        })
        .finally(() => setFetching(false));
    }
    // eslint-note notes are fetched only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDate]);

  const handleChange = useCallback((id: string, text: string) => {
    setTodos((prevTodos) => {
      const todoEdited = prevTodos.find((todo) => todo.id === id);
      if (!todoEdited) return prevTodos;

      // normalize date and organize by date
      const dateString = normalizeDate(todoEdited.date);
      const todosForDay = prevTodos.filter(
        (todo) => normalizeDate(todo.date) === dateString
      );
      //check last element, if it is this todo, create an empty element
      const isLastElement = todosForDay[todosForDay.length - 1]?.id === id;
      const modifiedTodos = prevTodos.map((todo) => {
        if (!todoEdited) return todo;
        if (todo.id === id) {
          setUpdatingTodos((prevTodos) => [...prevTodos, todoEdited.id]);
          return { ...todo, task: text };
        }
        return todo;
      });

      if (isLastElement) {
        modifiedTodos.push({
          id: crypto.randomUUID().slice(0, 6),
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
          setUpdatingTodos((prevTodos) => [...prevTodos, todoEdited.id]);
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

  const handleDelete = useCallback(async (id: string) => {
    const deleteReq = await deleteTodo(id);
    console.log(deleteReq);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setNotes((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  // Update todos in DB everytime  todos state changes - debounced in 2secs
  useEffect(() => {
    const updateTodos = async () => {
      const modifiedTodos = debouncedTodos.filter((todo) =>
        updatingTodos.includes(todo.id)
      );

      if (modifiedTodos.length === 0) return;

      for (const todo of modifiedTodos) {
        // front-end-only todos
        if (todo.id && todo.id.length <= 6) {
          if (todo.task !== "") {
            const newTodo = await createTodo(todo);
            // update "front-end" id with just created todo.id from DB
            todo.id = newTodo.id;
            log("Created Todo:", todo);
          }
        }
        // database todos
        else {
          const response = await updateTodo(todo);
          log("Updated Todo:", todo.task, response.message);
          setUpdatingTodos([]);
        }
      }
    };
    updateTodos();
  }, [debouncedTodos]);

  useEffect(() => {
    const updateNotes = async () => {
      const modifiedTodos = debouncedNotes.filter((todo) =>
        updatingTodos.includes(todo.id)
      );
      if (modifiedTodos.length === 0) return;

      for (const todo of modifiedTodos) {
        // front-end-only todos
        if (todo.id.length <= 6) {
          if (todo.task !== "") {
            await createTodo(todo);
            log("Created Note:", todo.task);
          }
        }
        // database todos
        else {
          const response = await updateTodo(todo);
          log("Updated Note:", todo.task, response.message);
          setUpdatingTodos([]);
        }
      }
    };
    updateNotes();
  }, [debouncedNotes]);

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
        errors,
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
