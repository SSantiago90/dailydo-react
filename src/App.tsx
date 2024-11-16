import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import InputTodo from "./components/InputTodo.tsx";
import Header from "./components/Header.tsx";
import { useContext } from "react";
import { TodosProvider } from "./storage/TodosContext.tsx";

function App() {
  return (
    <>
      <TodosProvider>
        <Header />
        <HBar bold />
        <section className="_days-container flex gap-4 flex-row mx-auto my-12 p-8">
          <WeekContainer />
        </section>
        <HBar className="mt-40" bold />
      </TodosProvider>
    </>
  );
}

export default App;
