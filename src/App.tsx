import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import Header from "./components/Header.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";
import { StrictMode } from "react";

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
          {/*  <HBar bold /> */}
        </TodosProvider>
      </ThemeProvider>

      <button
        data-popover-target="popover-top"
        data-popover-placement="top"
        type="button"
        className="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Top popover
      </button>
    </StrictMode>
  );
}

export default App;
