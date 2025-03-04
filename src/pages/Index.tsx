import Header from "../components/Header.tsx";

import HBar from "../components/UI/HBar.tsx";
import { TodosProvider } from "../storage/TodosContext.tsx";
import { ThemeProvider } from "../storage/ThemeContext.tsx";
import { SessionContextProvider } from "../storage/SessionContext.tsx";
import TodosContainer from "../components/TodosContainer.tsx";
import Layout from "./Layout.tsx";

/* 
  TODO
  1. Fix view for not logged in users
  2. Propperly update todos 
  3. Propperly filter "weekly" todos? 
    * getTodosForWeek( date ) [ filtering DB data by date] 
    -> getTodos(user) -> unfiltered todo data -> big volume of data
    
 */

export default function Index() {
  return (
    <main>
      <TodosProvider>
        <Header />
        <HBar bold />

        <TodosContainer />
      </TodosProvider>
    </main>
  );
}
