import { useDatepicker, useMonth } from "@datepicker-react/hooks";
import Days from "./days";
import React, { useMemo } from "react";
import { subDays, addDays, isEqual, endOfDay, endOfMonth } from "date-fns";
function Month({ year, month, firstDayOfWeek, dateSelected, setDateSelected, handleDateChange, goToPreviousMonths,
  goToNextMonths }: any) {
  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    firstDayOfWeek,
  });
  const daysForCalendar = useMemo(() => {
    // add zeroes to days to fill six rows (7 x 6 = 42)
    const paddedDays:any = days.concat(new Array(42 - days.length).fill(0));

    const startDayIndex = paddedDays.findIndex((day:any) =>
      isEqual(new Date(year, month), day.date)
    );
    const endDayIndex:any = paddedDays.findIndex((day:any) =>
      isEqual(endOfMonth(new Date(year, month)), endOfDay(day.date))
    );

    // replace zeroes with days before or after the selected month
    return paddedDays.map((day:any, index:any) => {
      // is day in selected month
      if (day !== 0) {
        return day;
      }
      // is day in last week of prev month
      if (index < startDayIndex) {
        const dayDifferenceToFirstDay:any = startDayIndex - index;
        const date = subDays(
          paddedDays[startDayIndex]?.date,
          dayDifferenceToFirstDay
        );
        return { date, dayLabel: date.getDate().toString().padStart(2, "0") };
      }
      // is day in first week of next month
      const dayDifferenceToLastDay:any = index - endDayIndex;
      const date = addDays(
        paddedDays[endDayIndex]?.date,
        dayDifferenceToLastDay
      );
      return { date, dayLabel: date.getDate().toString().padStart(2, "0") };
    });
  }, [days, month, year]);
  return (
    <div className="max-w-[400px] p-5 flex flex-col gap-2 rounded-xl drop-shadow-lg bg-white">
      <div className="flex gap-3 justify-center my-2">
        <button onClick={goToPreviousMonths}>{"<"}</button>
        <div className="text-center py-2 border min-w-[150px] p-2 text-sm bg-purple text-white rounded-md">
          <strong className="">{monthLabel}</strong>
        </div>
        <button onClick={goToNextMonths}>{">"}</button>
      </div>
      <div
        className="grid grid-cols-7 gap-1 text-center"
      >
        {weekdayLabels.map((dayLabel,key) => (
          <div className="first:text-purple last:text-purple" key = {key}>
            {dayLabel}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-7 gap-1"
      >
        {daysForCalendar.map((day:any, index:any) => {
          if (typeof day === "object") {
            return (
             <React.Fragment key = {index}>
               <Days
                date={day.date}
                key={day.date.toString()}
                dayLabel={day.dayLabel}
              />
             </React.Fragment>
            );
          }

          return <div key={index} />;
        })}
      </div>
    </div>
  );
}

export default Month;
