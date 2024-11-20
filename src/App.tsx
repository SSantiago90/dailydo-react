import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import Header from "./components/Header.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";

function App() {
  /* 
 // Fetch all todos from api
 (async function fetchData() {
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();
    console.log("ALL DATA TEST", data);
  })(); */

  return (
    <>
      <ThemeProvider>
        <TodosProvider>
          <Header />
          <HBar bold />
          <WeekContainer />
          <HBar bold />
        </TodosProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
