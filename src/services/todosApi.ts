
import { TodosType } from "../types/Todos.types.ts";
import newLogger  from "../util/log.ts";
const log = newLogger("API-Todo Service");

const AUTH_CONFIG = {
  type: "Bearer",
  getJWT: () => localStorage.getItem("jwt"),
} 

export async function validateJWT(token: string) : Promise<boolean> {
  const request = await fetch(
    "http://localhost:3000/auth/validate", 
    {
    method: "POST",
    headers: {
      Authorization: `${AUTH_CONFIG.type} ${token}`,
      }
    }
  )  
  return request.ok
}

/* async function getTodosForWeek_old(date: Date): Promise<TodosType[]>  { 
  const isoDate = new Date(date).toISOString();
  log(`FETCHING ALL TODOS FOR WEEK ${isoDate}`);
  const response = await fetch(`http://localhost:3000/todos/week/${isoDate}`);
  const data = await response.json(); 
  return data;
}
 */
async function getAllTodos(token: string): Promise<TodosType[]>  { 
  const response = await fetch(`http://localhost:3000/todos/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${AUTH_CONFIG.type} ${AUTH_CONFIG.getJWT()}`,
    },
  });

  const data = await response.json(); 
  console.log(data);
  return data;
}

async function getTodosForWeek(date: Date) : Promise<TodosType[]>  {
  if (!date) date = new Date();

  console.log(date)
  const isoDate = new Date(date).toISOString();

  log("FETCHING ALL TODOS FOR WEEK", date);
  const response = await fetch(`http://localhost:3000/todos/week/${isoDate}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     "Authorization": `${AUTH_CONFIG.type} ${AUTH_CONFIG.getJWT()}`,
    },
  });
  const data = await response.json();
  console.log("-->", data);
  return data;
}

async function getAllNotes() : Promise<TodosType[]>  {
  log("FETCHING ALL NOTES");
  const response = await fetch(`http://localhost:3000/todos/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     "Authorization": `${AUTH_CONFIG.type} ${AUTH_CONFIG.getJWT()}`,
    },
  });  
  const data = await response.json();
  return data;
}

async function updateTodo(todo: TodosType) : Promise<{ status: string, message: string}>  {
  const updateTodo = {
    task: todo.task,
    done: todo.done,
    date: todo.date,
    isNote: todo.isNote
   }
  const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${AUTH_CONFIG.type} ${AUTH_CONFIG.getJWT()}`,
    },
    body: JSON.stringify(updateTodo),
  });
  const data = await response.json();

  return { status: data.statusCode, message: data.message };
}

async function createTodo(todo: TodosType) : Promise<TodosType>  {
  console.log("POST", todo)
  const todoDTO = {
    date: todo.date,
    done: todo.done,
    task: todo.task,
    isNote: todo.isNote
  }

  const response = await fetch(`http://localhost:3000/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
     "Authorization": `${AUTH_CONFIG.type} ${AUTH_CONFIG.getJWT()}`,
    },
    body: JSON.stringify(todoDTO),
  });
  const data = await response.json();
  
  return data;
}

async function deleteTodo(id: string) : Promise<{ status: string, message: string}>  {
  const response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${AUTH_CONFIG.type} ${AUTH_CONFIG.getJWT()}`,
    }
  });
  const data = await response.json();
  return { status: data.statusCode, message: data.message };
}

async function resetDB() : Promise<Response>  {
  const res = await fetch(`http://localhost:3000/todos/resetDB`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${AUTH_CONFIG.type} ${AUTH_CONFIG.getJWT()}`,
    }
  });
  return res;
}

export {getTodosForWeek, getAllNotes, updateTodo, createTodo, deleteTodo, getAllTodos, resetDB}
