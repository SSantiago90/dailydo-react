import { useTheme } from "../storage/ThemeContext";
import DatePicker from "./DatePicker";
import NavMenu from "./NavMenu";
import ThemePicker from "./ThemePicker";

function Header() {
  const { themeColor } = useTheme();

  return (
    <>
      <header className="mt-6 mb-10 flex-row ">
        <div className="logo flex items-center  gap-2 justify-center">
          <h1 className="text-6xl font-black text-rose-100">
            daily
            <span
              className={`text-8xl pl-0 text-${themeColor}-500 opacity-70 _text-handwritten`}
            >
              Do
            </span>
          </h1>
        </div>
        <NavMenu />
      </header>
      <div className="flex justify-center mt-1 mb-4">
        <DatePicker />
      </div>
    </>
  );
}

export default Header;
