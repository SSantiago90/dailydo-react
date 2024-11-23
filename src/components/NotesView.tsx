import { memo } from "react";
import { useTheme } from "../storage/ThemeContext";
import { TodosType } from "../types/Todos.types";
import InputTodo from "./InputTodo";
import HBar from "./UI/HBar";

type NotesViewProps = {
  notesList: TodosType[][];
  handleChange: (id: string, text: string) => void;
  handleDone: (id: string) => void;
  handleDelete: (id: string) => void;
};
function NotesView({
  notesList,
  handleChange,
  handleDone,
  handleDelete,
}: NotesViewProps) {
  const { themeColor } = useTheme();

  const positions = [0, 1, 2];

  return (
    <section className="flex flex-col rounded py-5 w-full">
      <div className="flex flex-row gap-5 justify-end relative">
        <h3
          className={`} xl:text-2xl md:text-4xl text-3xl z-10 mb-1 font-bold opacity-100 text-right pr-1 drop-shadow-[-3px_3px_3px_rgba(15,23,42,1)]`}
        >
          Notes
        </h3>
        <h3
          className={`xl:text-4xl 2xl:text-5xl  z-0 text-6xl font-bold text-${themeColor}-700 opacity-60 text-left pl-1 _text-handwritten _text-gradient absolute bottom-2 left-2`}
        >
          Someday
        </h3>
      </div>
      <HBar white semibold />
      <div className="flex flex-col xl:flex-row gap-3 mx-auto my-2 p-8 w-full xl:items-baseline">
        {positions.map((position) => (
          <ul key={position} className="list-none flex flex-col p-1 grow mb-2">
            {notesList[position].map((note) => (
              <InputTodo
                key={note.id}
                id={note.id}
                done={note.done}
                value={note.task}
                onChange={(text) => handleChange(note.id, text)}
                onClick={() => handleDone(note.id)}
                onDelete={() => handleDelete(note.id)}
              />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}

export default memo(
  NotesView,
  (prevProps, nextProps) => prevProps.notesList === nextProps.notesList
);
