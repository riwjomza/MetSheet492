import React, { useEffect, useState } from "react";

type Props = {
  onSave?: any;
  getTime?: any;
};

const TimePicker = ({ onSave, getTime}: Props) => {
  const [hours, setHours] = useState<Array<String>>();
  const [min, setMin] = useState<Array<String>>();
  const [timeSelected, setTimeSelected] = useState({
    h: "",
    n: "",
  });
  // const [time, setTime] = useState('')
  const getHours = () => {
    const clock = [];
    for (let i = 0; i < 24; i++) {
      clock.push(String(i).padStart(2, "0"));
      if (clock.length) {
        setHours(clock);
      }
    }
  };
  const getMin = () => {
    const clock = [];
    for (let i = 0; i < 60; i++) {
      clock.push(String(i).padStart(2, "0"));
      if (clock.length) {
        setMin(clock);
      }
    }
  };
  const onSaveTime = () => {
    const { h, n } = timeSelected;
    // this your time selection
    let time = `${h}:${n}`;
    onSave();
    getTime && getTime(time)
    console.log(
      "%cMyProject%cline:33%ctime",
      "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
      "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
      "color:#fff;background:rgb(161, 23, 21);padding:3px;border-radius:2px",
      time
    );
  };
  useEffect(() => {
    getHours();
    getMin();
  }, []);

  return (
    <div className="bg-white drop-shadow-lg max-w-24 w-fit pt-6 pb-1 px-12 rounded-lg text-black-light">
      {/* <MyClock /> */}
      <div className="flex gap-6 items-center text-lg justify-center">
        <div className="overflow-scroll h-[200px] scrollbar-hide w-10 text-center">
          {hours?.map((item, key) => (
            <div
              key={key}
              className={`${
                timeSelected.h == item
                  ? "bg-purple-supperLight text-black rounded-sm"
                  : ""
              } cursor-pointer`}
              onClick={() =>
                setTimeSelected({
                  ...timeSelected,
                  h: item.toString(),
                })
              }
            >
              {item}
            </div>
          ))}
        </div>
        <div>:</div>
        <div className="overflow-scroll h-[200px] scrollbar-hide w-10 text-center">
          {min?.map((item, key) => (
            <div
              key={key}
              className={`${
                timeSelected.n == item
                  ? "bg-purple-supperLight text-black rounded-sm"
                  : ""
              } cursor-pointer`}
              onClick={() =>
                setTimeSelected({
                  ...timeSelected,
                  n: item.toString(),
                })
              }
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center my-3">
        <button
          className="py-2 px-6 bg-purple-supperLight text-purple font-bold rounded-md"
          onClick={() => onSaveTime()}
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
};

export default TimePicker
