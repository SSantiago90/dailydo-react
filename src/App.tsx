import HBar from "./components/UI/HBar.tsx";
import WeekContainer from "./components/WeekContainer.tsx";
import Header from "./components/Header.tsx";
import { TodosProvider } from "./storage/TodosContext.tsx";
import { ThemeProvider } from "./storage/ThemeContext.tsx";

function App() {
  return (
    <>
      <ThemeProvider>
        <TodosProvider>
          <Header />
          <HBar bold />
          <WeekContainer />
          <HBar className="mt-40" bold />
        </TodosProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
