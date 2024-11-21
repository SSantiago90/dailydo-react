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
  handleNewTodo: (date: Date) => void;
  handleNewNote: (position: 1 | 2 | 3 | 0) => void;
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
  const [notes, setNotes] = useState<TodosType[]>([]);
  const [fetching, setFetching] = useState(true);

  const [activeDate, setActiveDate] = useState(new Date());

  const mergedTodos = [...todos, ...notes];

  // Fetch data
  useEffect(() => {
    setFetching(true);
    const week = getWeekdays(activeDate);

    const fetchData = async () => {
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
    console.log(doneTodo, doneNote);
    console.log(getSingleTodo(todoId)?.task);

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
    const newTodos = mergedTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: text };
      }
      return todo;
    });
    const newNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, task: text };
      }
      return note;
    });
    setTodos(newTodos);
    setNotes(newNotes);
  };

  const handleNewTodo = (date: Date) => {
    const newTodo = {
      id: crypto.randomUUID(),
      date: date,
      task: "",
      done: false,
      isNote: 0,
    } as TodosType;

    setTodos([...todos, newTodo]);
  };

  const handleNewNote = (position: 1 | 2 | 3) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      task: "",
      done: false,
      isNote: position,
    } as TodosType;

    setNotes([...notes, newNote]);
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
        handleNewNote,
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
