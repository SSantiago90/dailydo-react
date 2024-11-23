import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
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
  deleteTodo: (id: string) => void;
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

  //const mergedTodos = [...todos, ...notes];

  // Fetch data
  useEffect(() => {
    log("rendering and fetching data");
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
        log("fetching notes");
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
  }, [activeDate]);

  const handleDone = (todoId: string) => {
    const doneTodo = todos.findIndex((todo) => todo.id === todoId);
    const doneNote = notes.findIndex((note) => note.id === todoId);

    if (doneTodo !== -1) {
      const newTodos = [...todos];
      newTodos[doneTodo].done = !newTodos[doneTodo].done;
      setTodos(newTodos);
    }
    if (doneNote !== -1) {
      const newNotes = [...notes];
      newNotes[doneNote].done = !newNotes[doneNote].done;
      setNotes(newNotes);
    }
  };

  const handleChange = (id: string, text: string) => {
    const todoEdited =
      todos.find((todo) => todo.id === id) ||
      notes.find((todo) => todo.id === id);
    if (!todoEdited) return false;

    const dateString = normalizeDate(todoEdited.date);

    if (todoEdited.isNote === 0) {
      const todosForDay = todos.filter(
        (todo) => normalizeDate(todo.date) === dateString
      );
      const isLastElement = todosForDay[todosForDay.length - 1].id === id;

      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: text };
        }
        return todo;
      });

      if (isLastElement) {
        newTodos.push({
          id: crypto.randomUUID(),
          date: todoEdited.date,
          task: "",
          done: false,
          isNote: 0,
        });
      }
      setTodos(newTodos);
    } else {
      const notesForPosition = notes.filter(
        (note) => note.isNote === todoEdited.isNote
      );
      const isLastElement =
        notesForPosition[notesForPosition.length - 1].id === id;
      const newNotes = notes.map((note) => {
        if (note.id === id) {
          return { ...note, task: text };
        }
        return note;
      });

      if (isLastElement) {
        newNotes.push({
          id: crypto.randomUUID(),
          date: new Date(),
          task: "",
          done: false,
          isNote: todoEdited.isNote,
        });
      }
      setNotes(newNotes);
    }
  };

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

  const deleteTodo = (id: string) => {
    const isNote = [...todos, ...notes].find((todo) => todo.id === id)?.isNote;

    if (isNote) {
      setNotes(notes.filter((todo) => todo.id !== id));
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

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
        deleteTodo,
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
