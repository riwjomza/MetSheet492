import { useState } from "react";
import { useDatepicker, START_DATE } from "@datepicker-react/hooks";
import Month from "./month";
import DatepickerContext from './datepickerContext'

type Props = {
  handleChange?:any;
}
function Datepicker({handleChange}:Props) {
  const [dateSelected, setDateSelected] = useState<any>({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE
  });
  const {
    firstDayOfWeek,
    activeMonths,
    isDateSelected,
    isDateHovered,
    isFirstOrLastSelectedDate,
    isDateBlocked,
    isDateFocused,
    focusedDate,
    onDateHover,
    onDateSelect,
    onDateFocus,
    goToPreviousMonths,
    goToNextMonths
  } = useDatepicker({
    startDate: dateSelected.startDate,
    endDate: dateSelected.endDate,
    focusedInput: dateSelected.focusedInput,
    onDatesChange: handleDateChange,
    numberOfMonths: 1
  });
  function handleDateChange(data: any) {
      setDateSelected({ data, endDate: data.startDate, focusedInput: START_DATE });
      // this your date picker
      handleChange(data)
  }
  const activeMonth = activeMonths[0];
  return (
    <DatepickerContext.Provider
      value={{
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
      }}
    >
      {/* <div>
        <strong>Focused input: </strong>
        {dateSelected.focusedInput}
      </div>
      <div>
        <strong>Start date: </strong>
        {dateSelected.startDate && dateSelected.startDate.toLocaleString()}
      </div>
      <div>
        <strong>End date: </strong>
        {dateSelected.endDate && dateSelected.endDate.toLocaleString()}
      </div> */}
      <div className="">
        {activeMonths.map(month => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            firstDayOfWeek={firstDayOfWeek}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
            handleDateChange={handleDateChange}
            goToPreviousMonths={goToPreviousMonths}
            goToNextMonths={goToNextMonths}
          />
        ))}
      </div>
    </DatepickerContext.Provider>
  );
}

export default Datepicker;
