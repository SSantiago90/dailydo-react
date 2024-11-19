import DayView from "./DayView";
import Loader from "./UI/Loader";

type WeekViewProps = {
  weekDays: Date[];
  fetching: boolean;
};

function WeekView({ weekDays, fetching }: WeekViewProps) {
  return (
    <section
      className={`_days-container flex flex-col xl:flex-row items-center xl:items-baseline gap-6 justify-center mx-auto my-2 p-8 min-h-[40vh]`}
    >
      {fetching ? (
        <Loader />
      ) : (
        weekDays.length &&
        weekDays.map((daylist: Date) => (
          <DayView date={daylist} key={daylist.toString()} />
        ))
      )}
    </section>
  );
}

export default WeekView;
