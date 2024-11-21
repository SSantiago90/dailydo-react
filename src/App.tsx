import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import Header from "./components/Header.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";
import NotesContainer from "./components/NotesContainer.tsx";

function App() {
  return (
    <>
      <ThemeProvider>
        <TodosProvider>
          <Header />
          <HBar bold />
          <WeekContainer />
          <></>
          <NotesContainer />
        </TodosProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
