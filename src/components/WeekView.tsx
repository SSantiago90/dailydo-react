import { useTheme } from "../storage/ThemeContext";
import DayView from "./DayView";
import Loader from "./UI/Loader";
import { AnimatePresence, motion } from "framer-motion";
type WeekViewProps = {
  weekDays: Date[];
  fetching: boolean;
  back?: boolean;
  errors: Error | null;
};

function WeekView({ weekDays, fetching, back = false, errors }: WeekViewProps) {
  const animX = back ? -120 : 120;
  const { themeColor } = useTheme();

  return (
    <section className="min-h-[40vh] relative">
      {fetching && (
        <div className="flex absolute left-1/2 -translate-x-1/2 top-5 items-center justify-center min-h-[40vh]">
          <Loader delay={100} />
        </div>
      )}
      {errors ? (
        <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-10">
            <h1 className="text-4xl font-bold">Oops! Algo salió mal 😥</h1>
            <p className="text-slate-500">{errors.message}</p>
            <button
              className={`text-slate-300 hover:text-${themeColor}-500`}
              onClick={() => window.location.reload()}
            >
              Actualizar
            </button>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={weekDays.toString()}
            initial={{ x: animX, opacity: 0.25 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              opacity: 0.0,
              transition: { duration: 0.175, ease: "easeIn" },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div
              id="listcontainer"
              className={`flex flex-col xl:flex-row items-center xl:items-baseline gap-6 justify-center mx-auto my-2 p-8 ${
                fetching ? "opacity-35" : "opacity-100"
              }`}
            >
              {weekDays.length &&
                weekDays.map((daylist: Date) => (
                  <DayView date={daylist} key={daylist.toString()} />
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}

export default WeekView;
