import { useRef, useContext } from "react";
import { useDay } from "@datepicker-react/hooks";
import DatepickerContext from "./datepickerContext";

function Days({ dayLabel, date }: any) {
  const dayRef = useRef(null);
  const {
    activeMonth,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover
  } = useContext(DatepickerContext);
  const {
    isSelected,
    isSelectedStartOrEnd,
    isWithinHoverRange,
    disabledDate,
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef
  });

  const isInSelectedMonth:any = date.getMonth() === activeMonth.month && date.getFullYear() === activeMonth.year;

  if (!dayLabel) {
    return <div />;
  }

  // const getColorFn = getColor(
  //   isSelected,
  //   isSelectedStartOrEnd,
  //   isWithinHoverRange,
  //   disabledDate
  // );

  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      tabIndex={tabIndex}
      type="button"
      ref={dayRef}
      className={`
      text-black font-thin text-sm py-1 rounded-md 
      ${isSelected ? "bg-purple !text-white font-medium" : ""}
      ${!isInSelectedMonth ? "!text-gray":""}
      `}
    >
      {dayLabel}
    </button>
  );
}

export default Days;