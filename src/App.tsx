import WeekContainer from "./components/WeekContainer.tsx";
import NotesContainer from "./components/NotesContainer.tsx";
import Header from "./components/Header.tsx";
import Modal from "./components/UI/Modal";
import HBar from "./components/UI/HBar.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";
import { useState } from "react";
import Button from "./components/UI/Button.tsx";
import {
  SessionContext,
  SessionContextProvider,
} from "./storage/SessionContext.tsx";

/* 
  TODO
  1. Fix view for not logged in users
  2. Propperly update todos 
  3. Propperly filter "weekly" todos? 
    * getTodosForWeek( date ) [ filtering DB data by date] 
    -> getTodos(user) -> unfiltered todo data -> big volume of data
    
 */

function App() {
  const [refetch, setRefetch] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

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
        <SessionContextProvider>
          <>
            <div className="background">
              <div className="background_layer"></div>
            </div>
            <main>
              <div
                style={{ display: "" }}
                className="flex gap-4 items-center justify-center"
              >
                <button
                  className="hover:opacity-100 opacity-15"
                  onClick={handleReset}
                >
                  Press reset
                </button>
                <button
                  className="hover:opacity-100 opacity-15"
                  onClick={() => setIsOpen(true)}
                >
                  Reset Database
                </button>
              </div>
              <ThemeProvider>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
                  <Modal.Header>Reset Database</Modal.Header>
                  <p>¿Seguro que quieres borrar la base de datos?</p>
                  <Modal.Footer>
                    <Button
                      type="error"
                      onClick={() => {
                        setIsOpen(false);
                        handleResetDB();
                      }}
                    >
                      Borrar
                    </Button>
                    <Button onClick={() => setIsOpen(!isOpen)}>Cancelar</Button>
                  </Modal.Footer>
                </Modal>

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
        </SessionContextProvider>
      )}
    </>
  );
}

export default App;
