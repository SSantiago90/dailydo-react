import { CustomFlowbiteTheme, Popover } from "flowbite-react";
import { forwardRef, ReactNode } from "react";

type PopoverPropTypes = {
  children: ReactNode;
  popover: ReactNode;
};

const PopoverUI = forwardRef<HTMLDivElement, PopoverPropTypes>(
  ({ children, popover }, ref) => {
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
        trigger="hover"
        aria-labelledby="default-popover"
        content={<div className="flex gap-2 px-4 py-2">{popover}</div>}
        ref={ref}
      >
        {children}
      </Popover>
    );
  }
);

export default PopoverUI;
