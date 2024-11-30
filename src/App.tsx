import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import Header from "./components/Header.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";
import NotesContainer from "./components/NotesContainer.tsx";
import { useState } from "react";

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

  async function handleResetDB() {
    const request = await fetch(`http://localhost:3000/todos/resetDB`, {
      method: "POST",
    });
    if (request.ok) {
      handleReset();
    }
  }

  return (
    <>
      {refetch && (
        <>
          <div className="background">
            <div className="background_layer"></div>
          </div>
          <main>
            <div className="flex gap-4 items-center justify-center">
              <button
                className="hover:opacity-100 opacity-15"
                onClick={handleReset}
              >
                Press reset
              </button>
              <button
                className="hover:opacity-100 opacity-15"
                onClick={handleResetDB}
              >
                Reset Database
              </button>
            </div>
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
