import classNames from "classnames";
import { Children } from "react";
import { useTheme } from "../../storage/ThemeContext";
import { AnimatePresence, motion } from "motion/react";
import { CircleX } from "lucide-react";
import HBar from "./HBar";

type ModalPropTypes = {
  isOpen: boolean;
  onClose: () => void | null;
  children: React.ReactNode;
  colorClassName?: string;
  Header?: React.ReactNode;
  Footer?: React.ReactNode;
  className?: string;
};

function Modal({ isOpen, children, className }: ModalPropTypes) {
  const header = Children.map(children, (child) =>
    child.type.name === "Header" ? child : null
  );
  const footer = Children.map(children, (child) =>
    child.type.name === "Footer" ? child : null
  );
  const body = Children.map(children, (child) =>
    child.type.name !== "Header" && child.type.name !== "Footer" ? child : null
  );

  const classesModal = classNames(
    "fixed z-50 top-0 right-0 bottom-0 left-0 ",
    "bg-black bg-opacity-20 backdrop-blur-sm",
    "flex justify-center items-center"
  );

  const classesModalContainer = classNames(
    "relative backdrop-blur-lg bg-black bg-opacity-10 rounded-lg -mt-12 w-96 pt-4 pb-2 px-8",
    className
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className={classesModal}>
          <motion.div
            key="modal"
            className={classesModalContainer}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {header}
            <HBar />
            <div className="py-10 text-lg px-2">{body}</div>
            <HBar bold />
            {footer}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export const Footer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row gap-5 justify-around py-4">{children}</div>
  );
};

export const Header = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  const { themeColor } = useTheme();

  return (
    <>
      <div>
        <div className="flex flex-row gap-2 justify-between mb-2 px-1">
          <span className="text-sm font-light opacity-80">{children}</span>
          {onClose && (
            <button onClick={onClose}>
              <CircleX
                className={`hover:text-${themeColor}-500`}
                size={20}
                strokeWidth={1.2}
              />
            </button>
          )}
        </div>
      </div>
      <HBar />
    </>
  );
};

Modal.Footer = Footer;
Modal.Header = Header;

export default Modal;
