import { useTheme } from "../storage/ThemeContext";

type NavItemPropTypes = {
  children: React.ReactNode;
  onAction?: () => void;
};
function NavItem({ children, onAction }: NavItemPropTypes) {
  const { themeColor } = useTheme();

  return (
    <div onClick={onAction} className="flex flex-col items-center">
      <div
        className={`flex cursor-pointer text-slate-400 font-light mt-1 text-sm gap-1 items-center hover:text-${themeColor}-500`}
      >
        {children}
      </div>
    </div>
  );
}

export default NavItem;
