import { ReactNode } from "react";
import { useTheme } from "../../storage/ThemeContext";
import { Link } from "react-router-dom";
export default function CustomLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  const { themeColor } = useTheme();
  return (
    <Link to={to}>
      <span className={`hover:text-${themeColor}-500 hover:underline`}>
        {children}
      </span>
    </Link>
  );
}
