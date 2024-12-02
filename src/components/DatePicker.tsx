import { ChevronLeft, ChevronRight } from "lucide-react";
import classNames from "classnames";
import { motion, AnimatePresence } from "motion/react";

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
    <div className="flex flex-col items-center relative ">
      <WeekDayTitle date={startDay} themeColor={themeColor} />
      <div className="flex items-center space-x-2 z-10">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => handleDateChange(false)}
            className={`text-${themeColor}-500 hover:text-${themeColor}-700 transition duration-200 ease-in-out`}
          >
            <ChevronLeft size={28} strokeWidth={4} />
          </button>
          <span className="text-xl text-slate-100">
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

function WeekDayTitle({
  date,
  themeColor,
}: {
  date: Date;
  themeColor: string;
}) {
  const monthName = date.toLocaleString("default", { month: "long" });

  return (
    <AnimatePresence mode="wait">
      <motion.h4
        key={monthName}
        initial={{ y: "-40%", opacity: 0 }}
        animate={{ y: "0%", opacity: 0.5 }}
        exit={{ y: "40%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`xl:text-9xl md:text-8xl sm:text-8xl text-7xl _text-gradient font-black absolute xl:-bottom-6 md:-bottom-2 sm-bottom-2 bottom-7 z-0 text-${themeColor}-700`}
      >
        {monthName}
      </motion.h4>
    </AnimatePresence>
  );
}
export default DatePicker;
