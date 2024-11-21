import NotesView from "./NotesView";
import { useTodos } from "../storage/TodosContext";
import { TodosType } from "../types/Todos.types";
import { useEffect, useState } from "react";

function NotesContainer() {
  const [sortedNotes, setSortedNotes] = useState<TodosType[][]>([[], [], []]);
  const { fetching, notes, handleChange, handleDone, handleNewNote } =
    useTodos();

  useEffect(() => {
    const groupedNotesByPosition = [[], [], []] as TodosType[][];
    notes.forEach((note) => {
      if (!note.isNote) return;
      groupedNotesByPosition[note.isNote - 1].push(note);
    });
    setSortedNotes(groupedNotesByPosition);
  }, [notes]);

  return (
    <>
      {!fetching && (
        <NotesView
          handleChange={handleChange}
          handleDone={handleDone}
          handleNewNote={handleNewNote}
          notesList={sortedNotes}
        />
      )}
    </>
  );
}

export default NotesContainer;
