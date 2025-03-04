import { useTheme } from "../storage/ThemeContext";

type NavItemPropTypes = {
  children: React.ReactNode;
  onAction?: () => void;
  disabled?: boolean;
  bold?: boolean;
};
function NavItem({ children, onAction, disabled, bold }: NavItemPropTypes) {
  const { themeColor } = useTheme();

  return (
    <div
      onClick={disabled ? () => {} : onAction}
      className="flex flex-col items-center"
    >
      <div
        className={`flex text-slate-400 mt-1 text-sm gap-1 items-center ${
          bold ? "font-semibold" : "font-light"
        }
        ${
          disabled
            ? "opacity-30 cursor-default"
            : `hover:text-${themeColor}-500 cursor-pointer`
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default NavItem;
