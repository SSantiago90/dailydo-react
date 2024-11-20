import { TodosType } from "../types/Todos.types.ts";


async function getTodosForWeek(date: Date): Promise<TodosType[]> { 
  const isoDate = new Date(date).toISOString();
  const response = await fetch(`http://localhost:3000/todos/week/${isoDate}`);
  const data = await response.json();
  return data;
}



export {getTodosForWeek};
