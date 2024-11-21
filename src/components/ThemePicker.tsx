import { useState } from "react";
import { useTheme } from "../storage/ThemeContext";
import { Palette } from "lucide-react";

import { CustomFlowbiteTheme, Popover } from "flowbite-react";

function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);

  const { setColor } = useTheme();

  function handleColorChange(color: string) {
    setColor(color);
  }

  const colors = ["rose", "blue", "green", "violet", "teal", "yellow"];

  const customPopover: CustomFlowbiteTheme["popover"] = {
    base: "absolute z-20 inline-block w-max max-w-[100vw] bg-black bg-opacity-40 outline-none rounded-lg  dark:border-gray-600 dark:bg-gray-800",
    content: "z-10 overflow-hidden rounded-[7px]",
    arrow: {
      base: "absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-black opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
      placement: "-4px",
    },
  };
  return (
    <>
      <div className="flex flex-row gap-1 items-center">
        <Popover
          theme={customPopover}
          trigger="hover"
          aria-labelledby="default-popover"
          content={
            <div className="flex gap-2 px-4 py-2 ">
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
          }
        >
          <button
            className="flex flex-row gap-1 items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            Theme
            <Palette
              size={14}
              onClick={() => setIsOpen(!isOpen)}
              className=""
            />
          </button>
        </Popover>
      </div>
    </>
  );
}

export default ThemePicker;
