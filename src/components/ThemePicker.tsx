import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import { Palette } from "lucide-react";

function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);

  const { setColor } = useTheme();

  function handleColorChange(color: string) {
    setColor(color);
  }

  const colors = ["rose", "blue", "green", "violet", "teal", "yellow"];

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex flex-row gap-1 items-center">
        <span onClick={() => setIsOpen(!isOpen)}>Theme</span>
        <Palette size={14} onClick={() => setIsOpen(!isOpen)} className="" />
      </div>
      {isOpen && (
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              onClick={() => {
                setIsOpen(false);
                handleColorChange(color);
              }}
              className={`text-${color}-300 text-${color}-500 text-${color}-400 text-${color}-700`}
            >
              ●
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemePicker;
