import { useContext } from "react";
import NotesContainer from "./NotesContainer";
import WeekContainer from "./WeekContainer";
import { SessionContext } from "../storage/SessionContext";
import { Link } from "lucide-react";

function TodosContainer() {
  return (
    <>
      <WeekContainer />
      <NotesContainer />
    </>
  );
}

export default TodosContainer;
