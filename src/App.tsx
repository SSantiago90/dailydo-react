import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import Header from "./components/Header.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";
import { StrictMode } from "react";
import NotesContainer from "./components/NotesContainer.tsx";

function App() {
  /* 
 // Fetch all todos from api
 (async function fetchData() {
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();
    console.log("ALL DATA TEST", data);
  })(); */

  return (
    <StrictMode>
      <ThemeProvider>
        <TodosProvider>
          <Header />
          <HBar bold />
          <WeekContainer />
          <></>
          <NotesContainer />
        </TodosProvider>
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;
