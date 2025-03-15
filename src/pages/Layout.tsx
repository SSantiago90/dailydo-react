import { useState } from "react";
import { SessionContextProvider } from "../storage/SessionContext";
import { ThemeProvider } from "../storage/ThemeContext";
import Modal from "../components/UI/Modal";
import Button from "../components/UI/Button.tsx";
import { resetDB } from "../services/todosApi.ts";

function Layout({ children }: { children: React.ReactNode }) {
  const [refetch, setRefetch] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const DEV_ENV = import.meta.env.MODE === "development";

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
    const res = await resetDB();
    if (res.ok) handleReset();
    else console.error(res);
  }

  if (DEV_ENV)
    return (
      <>
        {refetch && (
          <SessionContextProvider>
            <ThemeProvider>
              <>
                <div className="background">
                  <div className="background_layer"></div>
                </div>
                <main>
                  <div className="flex gap-4 items-center justify-center z-50 sticky">
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
                      <Button onClick={() => setIsOpen(!isOpen)}>
                        Cancelar
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {children}
                </main>
              </>
            </ThemeProvider>
          </SessionContextProvider>
        )}
      </>
    );

  return (
    <SessionContextProvider>
      <ThemeProvider>
        <div className="background">
          <div className="background_layer"></div>
        </div>
        {children}
      </ThemeProvider>
    </SessionContextProvider>
  );
}

export default Layout;
