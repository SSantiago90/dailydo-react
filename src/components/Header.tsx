import { useTheme } from "../storage/ThemeContext";

import DatePickerContainer from "./DatePickerContainer";
import NavMenu from "./NavMenu";
import { motion } from "framer-motion";

function Header() {
  const { themeColor } = useTheme();
  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.2,
        }}
      >
        <div className="mt-6 mb-10 flex-row ">
          <div className="logo flex items-center  gap-2 justify-center">
            <motion.h1
              className="text-6xl font-black text-rose-100"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.2,
              }}
            >
              daily
              <span
                className={`text-8xl pl-0 text-${themeColor}-500 opacity-70 _text-handwritten`}
              >
                Do
              </span>
            </motion.h1>
          </div>
          <NavMenu />
        </div>
        <div className="flex justify-center mt-1 mb-4">
          <DatePickerContainer />
        </div>
      </motion.header>
    </>
  );
}

export default Header;
