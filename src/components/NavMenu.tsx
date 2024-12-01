import NavItem from "./NavItem";
import ThemePicker from "./ThemePicker";

function NavMenu() {
  return (
    <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <nav className="md:mt-2 top-0 right-0 p-4 md:pt-0 rounded-bl-lg shadow-xl flex flex-row gap-4">
        <NavItem>Login</NavItem>
        <NavItem>Settings</NavItem>
        <NavItem>About</NavItem>
        <NavItem>
          <ThemePicker />
        </NavItem>
      </nav>
    </div>
  );
}

<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
  <a className="mr-5 hover:text-gray-900">First Link</a>
  <a className="mr-5 hover:text-gray-900">Second Link</a>
  <a className="mr-5 hover:text-gray-900">Third Link</a>
  <a className="mr-5 hover:text-gray-900">Fourth Link</a>
  <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    Button
    <svg
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      className="w-4 h-4 ml-1"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
  </button>
</nav>;

export default NavMenu;
