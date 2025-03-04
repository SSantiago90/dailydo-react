import { useContext, useState } from "react";
import LoginForm from "./ModalLoginForm";
import NavItem from "./NavItem";
import ThemePicker from "./ThemePicker";
import { SessionType } from "../types/Session.type";
import { SessionContext } from "../storage/SessionContext";
import Modal from "./UI/Modal";
import { useTheme } from "../storage/ThemeContext";
import { CustomFlowbiteTheme, Popover } from "flowbite-react";
import { User } from "lucide-react";

/* 
  TODO: 
    - fix display for user icon
*/
function NavMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenLogout, setIsOpenLogout] = useState<boolean>(false);
  const { themeColor } = useTheme();

  const { sessionLogin, sessionLogout, isLoggedIn, user } =
    useContext(SessionContext);

  function handleLogin(user: SessionType) {
    sessionLogin(user);
    setIsOpen(false);
  }

  function handleConfirmLogout() {
    setIsOpenLogout(true);
  }

  const customPopover: CustomFlowbiteTheme["popover"] = {
    base: "absolute z-20 inline-block w-max max-w-[100vw] bg-black bg-opacity-40 outline-none rounded-lg  dark:border-gray-600 dark:bg-gray-800",
    content: "z-10 overflow-hidden rounded-[7px]",
    arrow: {
      base: "absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-black opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
      placement: "-4px",
    },
  };

  return (
    <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <nav className="md:mt-2 top-0 right-0 p-4 md:pt-0 rounded-bl-lg flex flex-row gap-4">
        <NavItem>
          Theme
          <ThemePicker />
        </NavItem>

        {isOpen && (
          <LoginForm
            isOpen={isOpen}
            onConfirm={handleLogin}
            onClose={() => setIsOpen(false)}
          />
        )}
        {!isLoggedIn() ? (
          <NavItem onAction={() => setIsOpen(true)}>Login</NavItem>
        ) : (
          <>
            {/*  <NavItem>{user?.email.split("@")[0]}</NavItem>
            <NavItem bold onAction={handleConfirmLogout}>
              Logout
            </NavItem> */}
            <Popover
              theme={customPopover}
              trigger="hover"
              aria-labelledby="default-popover"
              content={
                <div className="flex gap-2 px-4 py-2 ">
                  <NavItem onAction={handleConfirmLogout}>Logout</NavItem>
                </div>
              }
            >
              <button
                className="flex flex-row gap-1 items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}
              >
                <NavItem bold>
                  {user?.email.split("@")[0]}
                  <User size={16} />
                </NavItem>
              </button>
            </Popover>
          </>
        )}
        {isOpenLogout && (
          <Modal isOpen={isOpenLogout} onClose={() => setIsOpenLogout(false)}>
            <Modal.Header>Logout</Modal.Header>
            <p>¿Seguro que desea cerrar sesión?</p>
            <Modal.Footer>
              <button
                onClick={sessionLogout}
                className={`bg-${themeColor}-700 hover:bg-${themeColor}-600 text-white rounded-lg px-4 py-2`}
              >
                Cerrar sesión
              </button>
              <button onClick={() => setIsOpenLogout(false)}>Volver</button>
            </Modal.Footer>
          </Modal>
        )}
      </nav>
    </div>
  );
}
export default NavMenu;
