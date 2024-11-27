
import { TodosType } from "../types/Todos.types.ts";
async function getTodosForWeek(date: Date): Promise<TodosType[]>  { 
  const isoDate = new Date(date).toISOString();
  console.log("FETCHING ALL TODOS FOR WEEK", isoDate);
  const response = await fetch(`http://localhost:3000/todos/week/${isoDate}`);
  const data = await response.json(); 
  return data;
}

async function getAllNotes() : Promise<TodosType[]>  {
  console.log("FETCHING ALL NOTES");
  const response = await fetch(`http://localhost:3000/todos/notes`);  
  const data = await response.json();
  return data;
}


export {getTodosForWeek, getAllNotes};
