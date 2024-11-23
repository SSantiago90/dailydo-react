import { ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";

type DatePickerProps = {
  themeColor: string;
  isThisWeek: boolean;
  startDay: Date;
  endDay: Date;
  handleDateChange: (left: boolean) => void;
  handleSetToday: () => void;
};
function DatePicker(props: DatePickerProps) {
  const {
    themeColor,
    isThisWeek,
    startDay,
    endDay,
    handleDateChange,
    handleSetToday,
  } = props;

  console.log("REnder");
  const jumpButtonClasses = classNames(
    "transition text-sm duration-200 ease-in-out z-20",
    {
      "text-slate-500 cursor:pointer": !isThisWeek,
    },
    {
      "text-slate-500 opacity-0": isThisWeek,
    }
  );

  return (
    <div className="flex flex-col items-center gap-2 relative">
      <h4
        className={`text-9xl _text-gradient font-black opacity-20 text-${themeColor}-700 absolute -bottom-5 z-0`}
      >
        week
      </h4>
      <div className="flex items-center space-x-2 z-10">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => handleDateChange(false)}
            className={`text-${themeColor}-500 hover:text-${themeColor}-700 transition duration-200 ease-in-out`}
          >
            <ChevronLeft size={28} strokeWidth={4} />
          </button>
          <span className="text-xl">
            {startDay.toLocaleDateString()}{" "}
            <span className="text-slate-400 text-md mx-2">to</span>{" "}
            {endDay.toLocaleDateString()}
          </span>
          <button
            onClick={() => handleDateChange(true)}
            className={`text-${themeColor}-500 hover:text-${themeColor}-700 transition duration-200 ease-in-out`}
          >
            <ChevronRight size={28} strokeWidth={4} />
          </button>
        </div>
      </div>
      <button
        disabled={isThisWeek}
        onClick={handleSetToday}
        className={`${jumpButtonClasses} hover:text-${themeColor}-500`}
      >
        Jump to today
      </button>
    </div>
  );
}

export default DatePicker;
