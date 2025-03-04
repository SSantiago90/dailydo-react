import { useContext } from "react";
import LoginForm from "../components/ModalLoginForm";
import { SessionContext } from "../storage/SessionContext";
import { SessionType } from "../types/Session.type";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const { sessionLogin, isLoggedIn } = useContext(SessionContext);
  const navigateTo = useNavigate();

  if (isLoggedIn()) return <Navigate to="/" />;

  function handleLogin(data: SessionType) {
    sessionLogin(data);
    navigateTo("/");
  }

  return (
    <div>
      <LoginForm onConfirm={handleLogin} isOpen={true} onClose={null} />
    </div>
  );
}
