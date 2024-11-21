import classNames from "classnames";
import { useTheme } from "../../storage/ThemeContext";

function HBar({
  bold,
  semibold,
  white,
}: {
  bold?: boolean;
  semibold?: boolean;
  white?: boolean;
  className?: string;
}) {
  const { themeColor } = useTheme();
  const classes = classNames(
    [!white ? `border-${themeColor}-500` : `border-slate-400`],
    { "opacity-90 border-t-3": bold },
    { "opacity-30 border-t-1": !bold },
    { "opacity-70 border-t-2": semibold }
  );

  return <hr className={classes} />;
}

export default HBar;
