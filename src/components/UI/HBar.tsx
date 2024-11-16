import classNames from "classnames";

function HBar({
  bold,
  white,
  className,
}: {
  bold?: boolean;
  white?: boolean;
  className?: string;
}) {
  const classes = classNames(
    "mb-5",
    { "text-white": white },
    { "border-rose-400 opacity-80 border-b-1": bold },
    { "border-rose-300 opacity-30 border-t-3": !bold },
    className
  );

  return <hr className={classes} />;
}

export default HBar;
