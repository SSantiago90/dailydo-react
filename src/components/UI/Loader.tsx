import { LoaderCircle } from "lucide-react";
import { useTheme } from "../../storage/ThemeContext";

function Loader() {
  const { themeColor } = useTheme();
  return (
    <div className="flex h-full items-center justify-center">
      <LoaderCircle
        size={96}
        strokeWidth={2}
        className={`animate-spin text-${themeColor}-500 flex items-center justify-center min-h-parent`}
      />
    </div>
  );
}

export default Loader;
