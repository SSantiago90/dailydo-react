import classNames from "classnames";
import { useTheme } from "../../storage/ThemeContext";

function HBar({
  bold,
  className,
}: {
  bold?: boolean;
  white?: boolean;
  className?: string;
}) {
  const { themeColor } = useTheme();
  console.log("THEME? BAR", themeColor);
  const classes = classNames(
    "mb-5",
    [`border-${themeColor}-500`],

    { "opacity-80 border-b-1": bold },
    { "opacity-30 border-t-3": !bold },
    className
  );

  return <hr className={classes} />;
}

export default HBar;
