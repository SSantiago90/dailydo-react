import getWeekdays from "../util/createWeekdays";

const days = getWeekdays();
import { TodosType } from "../types/Todos.types.ts";

const mockdata = [
  { date: days[0], id: crypto.randomUUID().slice(0,7), task: "Hola", done: false },
  { date: days[1], id: crypto.randomUUID().slice(0,7), task: "Mundo", done: false },
  { date: days[0], id: crypto.randomUUID().slice(0,7), task: "React", done: false },
  { date: days[3], id: crypto.randomUUID().slice(0,7), task: "JS", done: true },
  { date: days[3], id: crypto.randomUUID().slice(0,7), task: "Vue", done: false },
  { date: days[0], id: crypto.randomUUID().slice(0,7), task: "Tailwind", done: true },
  { date: days[6], id: crypto.randomUUID().slice(0,7), task: "Hi", done: false },
  { date: days[0], id: crypto.randomUUID().slice(0,7), task: "Bye", done: false },
  { date: days[6], id: crypto.randomUUID().slice(0,7), task: "Do", done: true },
  { date: days[4], id: crypto.randomUUID().slice(0,7), task: "Redo", done: false },
] as TodosType[];

// Sync & Async helper functions

function getData(): TodosType[] {
  return mockdata;
}

function getTodosForDay(date: Date): TodosType[] {
  return mockdata.filter((todo) => todo.date.toLocaleDateString() == date.toLocaleDateString());
}

function getTodosForWeek(dates: Date[]): TodosType[] {
  const result = [] as TodosType[];
  const stringDays = dates.map((day) => day.toLocaleDateString());
  mockdata.forEach((todo) => {
    if (stringDays.includes(todo.date.toLocaleDateString())) {
      result.push(todo);
    }
  });
  return result;
}

function getSingleTodo(id: string) : TodosType  {
  const todo = mockdata.find((todo) => todo.id === id);
  if (!todo) throw new Error("Todo not found");
  return todo;
}

const getMockDataAsync = new Promise((resolve): void => {
  setTimeout(() => {
    resolve(mockdata);
  }, 1000);
});

export { getData, getTodosForDay, getMockDataAsync, getTodosForWeek, getSingleTodo};