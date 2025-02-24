
import { TodosType } from "../types/Todos.types.ts";
import newLogger  from "../util/log.ts";
const log = newLogger("API-Todo Service");

async function getTodosForWeek_old(date: Date): Promise<TodosType[]>  { 
  const isoDate = new Date(date).toISOString();
  log(`FETCHING ALL TODOS FOR WEEK ${isoDate}`);
  const response = await fetch(`http://localhost:3000/todos/week/${isoDate}`);
  const data = await response.json(); 
  return data;
}

async function getTodosForWeek(): Promise<TodosType[]>  { 
  const response = await fetch(`http://localhost:3000/todos/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5AbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc0MDE3MDk5MiwiZXhwIjoxNzQwMjU3MzkyfQ.7HuuvfbIX4kgF2vwRJW6AbFzaIbAHmESU36T10yCen8`,
    },
  });

  const data = await response.json(); 
  console.log(data);
  return data;
}

async function getAllNotes() : Promise<TodosType[]>  {
  log("FETCHING ALL NOTES");
  const response = await fetch(`http://localhost:3000/todos/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5AbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc0MDE3MDk5MiwiZXhwIjoxNzQwMjU3MzkyfQ.7HuuvfbIX4kgF2vwRJW6AbFzaIbAHmESU36T10yCen8`,
    },
  });  
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

  return { status: data.statusCode, message: data.message };
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

async function deleteTodo(id: string) : Promise<{ status: string, message: string}>  {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return { status: data.statusCode, message: data.message };
}

export {getTodosForWeek, getAllNotes, updateTodo, createTodo, deleteTodo }
