import { CustomFlowbiteTheme, Popover } from "flowbite-react";
import { useTheme } from "../../storage/ThemeContext";

type IconProps = {
  icon: string;
  title: string;
};
export default function CircleIcon({ icon, title }: IconProps) {
  const { themeColor } = useTheme();
  const customPopover: CustomFlowbiteTheme["popover"] = {
    base: "absolute z-20 inline-block w-max max-w-[100vw] bg-black bg-opacity-40 outline-none rounded-lg  dark:border-gray-600 dark:bg-gray-800",
    content: "z-10 overflow-hidden rounded-[7px]",
    arrow: {
      base: "absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-black opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
      placement: "-4px",
    },
  };

  return (
    <Popover
      theme={customPopover}
      placement="top"
      trigger="hover"
      aria-labelledby="default-popover"
      content={<div className="flex gap-2 px-4 py-2 ">{title}</div>}
    >
      <button
        className={`flex items-center justify-center w-10 h-10 rounded-full bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white p-2`}
      >
        <img src={icon} alt="icon" className="w-6 h-6" />
      </button>
    </Popover>
  );
}
