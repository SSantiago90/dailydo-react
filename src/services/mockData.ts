import getWeekdays from "../util/createWeekdays";
import { TodosType } from "../types/Todos.types.ts";

const weekdays = getWeekdays();
// expand days arrays adding 7 days forward and 7 days backwards
// for each day -> create a new date -> it uses a new date for each of the 7 days, setting the date to the next/previous week
const nextWeekDays = weekdays.map((day) => new Date(new Date(day).setDate(day.getDate() + 7)));
const prevWeekDays = weekdays.map((day) => new Date(new Date(day).setDate(day.getDate() - 7)));

const days = [...weekdays, ...nextWeekDays, ...prevWeekDays];

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
  { date: days[1], id: crypto.randomUUID().slice(0,7), task: "Hello", done: false },
  { date: days[2], id: crypto.randomUUID().slice(0,7), task: "World", done: false },
  { date: days[4], id: crypto.randomUUID().slice(0,7), task: "Jest", done: true },
  { date: days[5], id: crypto.randomUUID().slice(0,7), task: "TypeScript", done: false },
  { date: days[7], id: crypto.randomUUID().slice(0,7), task: "React Native", done: false },
  { date: days[8], id: crypto.randomUUID().slice(0,7), task: "Angular", done: true },
  { date: days[9], id: crypto.randomUUID().slice(0,7), task: "Ember", done: false },
  { date: days[10], id: crypto.randomUUID().slice(0,7), task: "Backbone", done: false },
  { date: days[11], id: crypto.randomUUID().slice(0,7), task: "React Router", done: true },
  { date: days[12], id: crypto.randomUUID().slice(0,7), task: "Redux", done: false },
  { date: days[13], id: crypto.randomUUID().slice(0,7), task: "Next.js", done: false },
  { date: days[14], id: crypto.randomUUID().slice(0,7), task: "Svelte", done: true },
  { date: days[16], id: crypto.randomUUID().slice(0,7), task: "Preact", done: false },
  { date: days[16], id: crypto.randomUUID().slice(0,7), task: "Vue.js", done: false },

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