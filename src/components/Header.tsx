import DatePickerContainer from "./DatePickerContainer";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import { motion } from "framer-motion";

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 1.2,
      }}
      className="text-gray-600 body-font"
    >
      <div className="container mx-auto flex flex-wrap p-6 flex-col md:flex-row items-center justify-between mt-0 lg:py-0 pb-8 lg:pt-2">
        <a className="flex md:order-first lg:order-none order-2 lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
          <Logo />
        </a>
        <div className="lg:w-2/5 inline-flex order-3 md:order-3 lg:justify-center lg:my-14 mt-8 md:mx-auto md:mt-12">
          <DatePickerContainer />
        </div>
        <div className="lg:w-1/5 md:order-2 lg:order-3 order-1 inline-flex lg:justify-end ">
          <NavMenu />
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
