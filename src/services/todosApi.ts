
import { TodosType } from "../types/Todos.types.ts";
import newLogger  from "../util/log.ts";
const log = newLogger("Todo-APIservice");

async function getTodosForWeek(date: Date): Promise<TodosType[]>  { 
  const isoDate = new Date(date).toISOString();
  log(`FETCHING ALL TODOS FOR WEEK ${isoDate}`);
  const response = await fetch(`http://localhost:3000/todos/week/${isoDate}`);
  const data = await response.json(); 
  return data;
}

async function getAllNotes() : Promise<TodosType[]>  {
  log("FETCHING ALL NOTES");
  const response = await fetch(`http://localhost:3000/todos/notes`);  
  const data = await response.json();
  return data;
}

async function updateTodo(todo: TodosType) : Promise<{ status: string, message: string}>  {
  const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();

  return { status: data.status, message: data.message };
}

async function createTodo(todo: TodosType) : Promise<TodosType>  {
  const response = await fetch(`http://localhost:3000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  
  return data;
}

export {getTodosForWeek, getAllNotes, updateTodo, createTodo }
