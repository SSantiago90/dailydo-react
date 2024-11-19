import { useContext, useEffect, useState } from "react";
import { todosContext } from "../storage/TodosContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import getWeekdays from "../util/createWeekdays";
import classNames from "classnames";
import { useTheme } from "../storage/ThemeContext";

function DatePicker() {
  const [isThisWeek, setIsThisWeek] = useState(true);
  const { activeDate, setDateTo } = useContext(todosContext);
  const { themeColor } = useTheme();

  const weekDays = getWeekdays(activeDate);
  const startDay = weekDays[0];
  const endDay = weekDays[weekDays.length - 1];
  function handleDateChange(forward: boolean) {
    const direction = forward ? [7] : [-7];
    // move date by 7 days forward or backward
    const newDate = new Date(activeDate);
    newDate.setDate(newDate.getDate() + direction[0]);

    setDateTo(newDate);
  }

  function handleSetToday() {
    setDateTo(new Date());
  }

  useEffect(() => {
    const today = new Date();
    setIsThisWeek(today >= startDay && today <= endDay);
  }, [activeDate, startDay, endDay]);

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
