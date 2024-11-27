import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import Header from "./components/Header.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";
import NotesContainer from "./components/NotesContainer.tsx";
import { useState } from "react";

// TODO: "cache" in context with next/prev week
// TODO2: Save in database changes in context
function App() {
  const [refetch, setRefetch] = useState(true);

  function handleReset() {
    setRefetch(false);
    handleRefetch();
  }

  function handleRefetch() {
    console.clear();
    setTimeout(() => {
      setRefetch(true);
    }, 10);
  }

  return (
    <>
      <button onClick={handleReset}>Press reset</button>
      {refetch && (
        <>
          <div className="background">
            <div className="background_layer"></div>
          </div>
          <main>
            <ThemeProvider>
              <TodosProvider>
                <Header />
                <HBar bold />
                <WeekContainer />
                <></>
                <NotesContainer />
              </TodosProvider>
            </ThemeProvider>
          </main>
        </>
      )}
    </>
  );
}

export default App;
