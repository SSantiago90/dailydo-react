import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import { useContext } from "react";
import {
  SessionContext,
  SessionContextProvider,
} from "./storage/SessionContext";
import { ThemeProvider } from "./storage/ThemeContext";
import Layout from "./pages/Layout";
import Register from "./pages/Register";

export default function App() {
  return (
    <SessionContextProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Layout>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>
    </SessionContextProvider>
  );
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(SessionContext);
  if (!isLoggedIn()) return <Navigate to="/login" />;

  return children;
};
