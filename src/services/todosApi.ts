import { TodosType } from "../types/Todos.types.ts";
import { NotesType } from "../types/Notes.types.ts";

async function getTodosForWeek(date: Date): Promise<TodosType[]>  { 
  const isoDate = new Date(date).toISOString();
  const response = await fetch(`http://localhost:3000/todos/week/${isoDate}`);
  const data = await response.json();
  return data;
}

async function getAllNotes() : Promise<NotesType[]>  {
  const response = await fetch(`http://localhost:3000/todos/notes`);
  const data = await response.json();
  return data;
}


export {getTodosForWeek, getAllNotes};
