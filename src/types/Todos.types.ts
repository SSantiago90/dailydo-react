type DaylistType = {
  date: Date,
  todos: TodosType[],
}

type TodosType = {
  date: Date,
  id: string,
  task: string,
  done: boolean,
};

export type { DaylistType, TodosType };