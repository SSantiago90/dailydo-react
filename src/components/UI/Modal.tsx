import classNames from "classnames";
import { Children, isValidElement, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleX } from "lucide-react";
import HBar from "./HBar";
import { useTheme } from "../../storage/ThemeContext";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
};

function Modal({ isOpen, children, className }: ModalProps) {
  let header: ReactNode = null;
  let footer: ReactNode = null;
  const body: ReactNode[] = [];

  // Properly identify children using component references
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === Modal.Header) {
        header = child;
      } else if (child.type === Modal.Footer) {
        footer = child;
      } else {
        body.push(child);
      }
    }
  });

  const modalClasses = classNames(
    "fixed z-40 inset-0",
    "bg-black bg-opacity-20 backdrop-blur-sm",
    "flex justify-center items-center"
  );

  const containerClasses = classNames(
    "backdrop-blur-lg bg-black bg-opacity-10 rounded-lg",
    "w-96 pt-4 pb-2 px-8 overflow-hidden",
    className
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className={modalClasses}>
            <motion.div
              key="modal"
              className={containerClasses}
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
    </div>
  );
}

// Header component with proper TypeScript typing
type HeaderProps = {
  children: ReactNode;
  onClose?: () => void;
};

function Header({ children, onClose }: HeaderProps) {
  const { themeColor } = useTheme();

  return (
    <div className="flex justify-between items-center mb-2 px-1">
      <span className="text-sm font-light opacity-80">{children}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Close">
          <CircleX
            className={`hover:text-${themeColor}-500 transition-colors`}
            size={20}
            strokeWidth={1.2}
          />
        </button>
      )}
    </div>
  );
}

// Footer component with proper TypeScript typing
function Footer({ children }: { children: ReactNode }) {
  return <div className="flex gap-5 justify-around py-4">{children}</div>;
}

// Assign as static properties
Modal.Header = Header;
Modal.Footer = Footer;

export default Modal;
