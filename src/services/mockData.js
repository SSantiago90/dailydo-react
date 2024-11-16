import getWeekdays from "../util/createWeekdays";

const days = getWeekdays();

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
]

// Sync & Async helper functions
const getData = () => mockdata;

const getMockDataAsync = new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockdata);
  }, 1000);
});

export {getData, getMockDataAsync};