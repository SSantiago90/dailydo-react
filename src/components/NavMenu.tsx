import NavItem from "./NavItem";
import ThemePicker from "./ThemePicker";

function NavMenu() {
  return (
    <nav className="mt-2 fixed top-0 right-0 p-4 rounded-bl-lg shadow-xl flex flex-row gap-4">
      <NavItem>Login</NavItem>
      <NavItem>
        <ThemePicker />
      </NavItem>
    </nav>
  );
}

export default NavMenu;
