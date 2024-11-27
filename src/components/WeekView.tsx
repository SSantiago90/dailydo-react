import DayView from "./DayView";
import Loader from "./UI/Loader";
import { AnimatePresence, motion } from "framer-motion";
type WeekViewProps = {
  weekDays: Date[];
  fetching: boolean;
  back?: boolean;
};

function WeekView({ weekDays, fetching, back = false }: WeekViewProps) {
  const animX = back ? -120 : 120;

  return (
    <section className="relative min-h-[40vh]">
      {fetching && (
        <div className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <Loader delay={100} />
        </div>
      )}
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
            className="flex flex-col xl:flex-row items-center xl:items-baseline gap-6 justify-center mx-auto my-2 p-8"
          >
            {weekDays.length &&
              weekDays.map((daylist: Date) => (
                <DayView date={daylist} key={daylist.toString()} />
              ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default WeekView;
