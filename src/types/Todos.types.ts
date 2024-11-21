type DaylistType = {
  date: Date,
  todos: TodosType[],
}
type TodosType = {
  date: Date,
  id: string,
  task: string,
  done: boolean,
  isNote?: 0 | 1 | 2 | 3
};

export type { DaylistType, TodosType };