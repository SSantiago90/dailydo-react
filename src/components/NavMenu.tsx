import { useContext, useState } from "react";
import LoginForm from "./LoginForm";
import NavItem from "./NavItem";
import ThemePicker from "./ThemePicker";
import { SessionType } from "../types/Session.type";
import { SessionContext } from "../storage/SessionContext";

function NavMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { sessionLogin, isLoggedIn } = useContext(SessionContext);

  function handleLogin(user: SessionType) {
    console.log("ok", user);
    sessionLogin(user);
    setIsOpen(false);
  }

  return (
    <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <nav className="md:mt-2 top-0 right-0 p-4 md:pt-0 rounded-bl-lg flex flex-row gap-4">
        <NavItem onAction={() => setIsOpen(true)}>Login</NavItem>
        {isOpen && (
          <LoginForm
            isOpen={isOpen}
            onConfirm={handleLogin}
            onClose={() => setIsOpen(false)}
          />
        )}
        <NavItem>Settings</NavItem>
        <NavItem>About</NavItem>
        <NavItem>
          <ThemePicker />
        </NavItem>
      </nav>
    </div>
  );
}
export default NavMenu;
