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
    <>
      <div className="flex flex-col gap-1 items-center">
        <PopopverThemeSelector />
        <div className="flex flex-row gap-1 items-center">
          <button onClick={() => setIsOpen(!isOpen)}>Theme</button>
          <Palette size={14} onClick={() => setIsOpen(!isOpen)} className="" />
        </div>
        {isOpen && (
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
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
    </>
  );
}

function PopopverThemeSelector() {
  return (
    <div
      data-popover
      id="popover-theme"
      role="tooltip"
      className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Popover title
        </h3>
      </div>
      <div className="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
      <div data-popper-arrow></div>
    </div>
  );
}

export default ThemePicker;
