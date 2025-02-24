type ButtonPropTypes = {
  children: React.ReactNode;
  type?: "success" | "error" | "warning" | "default" | "info";
  onClick?: () => void;
};

function Button({ onClick, children, type = "default" }: ButtonPropTypes) {
  const color = (() => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "rose";
      case "warning":
        return "yellow";
      case "info":
        return "blue";
      case "default":
        return "slate";
    }
  })();

  return (
    <button
      onClick={onClick}
      className={`text-neutral-400 hover:text-${color}-500 py-2 px-4 rounded-lg border-slate-500 border-1`}
    >
      {children}
    </button>
  );
}

export default Button;
