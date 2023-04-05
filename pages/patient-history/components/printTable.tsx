import React, { useState, useRef, useEffect } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { mockDataPatientList } from "../../../contrasts/patientHistoryList";
// import Image from "next/image";
import Datepicker from "../../../components/input/datePicker";
import TimePicker from "../../../components/input/timePicker";
import { GrDocumentUpdate } from "react-icons/gr";
import ReactToPrint from "react-to-print";
import moment from "moment";
import PrintPatientHistory from "../../../components/prints/patientHistory";
// import printPage from '../../../context/print'

type Props = {
  setShowModalAddDrug: any;
  setOnPrint: any;
  printDrugs: IDrug[];
};

interface IDrug {
  datetime: any;
  dose: any;
  drugname: String;
  freq: String;
  route: String;
  dateList: any[];
}
const mockData = [
  {
    name: `
    Painkillers 500 mg
รับประทานครั้งละ 1 เม็ด 
หลังอาหาร 3 เวลา
    `,
    route: "Oral",
    hr: "tid",
    time: 1678604525,
    author: "jr",
  },
];

const PrintTable = ({ setShowModalAddDrug, setOnPrint, printDrugs }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [onShowDatePicker, setOnShowDatePicker] = useState(false);
  const [onShowTimePicker, setOnShowTimePicker] = useState(false);
  const [countHeaderTable, setCountHeaderTable] = useState(1);

  const contentRef = useRef(null);
  const styled = {
    button: `
      bg-purple    
      rounded-md
      px-3
      py-1
      text-white
      flex gap-2 items-center justify-between
      h-8
    `,
    th: `
      border border-purple
      bg-purple-supperLight
      text-purple
      p-2
    `,
    td: `
      border border-purple
      h-full
      p-2
      text-center
    `,
    card: `
      bg-purple-supperLight py-2 px-3 rounded-md
      flex gap-2 items-right w-fit justify-end
      text-xs
    `,
  };

  // const handlePrint = useReactToPrint({
  //   content: () => contentRef.current,
  // });

  const toggleShowPicker = (type: string) => {
    switch (type) {
      case "OPEN_TIME":
        setOnShowTimePicker(!onShowTimePicker);
        setOnShowDatePicker(false);
        break;
      case "OPEN_DATE":
        setOnShowTimePicker(false);
        setOnShowDatePicker(!onShowDatePicker);
        break;

      default:
        break;
    }
  };
  const checkMaxHeader = () => {
    const count: number[] = [];
    // console.log(Object.keys(drugs).length);
    try {
      if (printDrugs.length > 0) {
        let size = Object.keys(printDrugs).length;
        // for (let i = 0; i < size; i++) {
        //   console.log(i);
        // }
        console.log(printDrugs);
        Object.values(printDrugs).forEach((drug) => {
          count.push(Object.values(drug.dateList).length);
        });
        console.log(Math.max(...count));
        // for (let i = 0; i < Object.keys(drugs).length; i++) {
        //   console.log(drugs[i].dateList)
        //   count.push(Object.keys(drugs[i].dateList).length);
        // }
        // const result = Math.max(...count);
        // setCountHeaderTable(result);
        // try {
        //   for (let i = 0; i < Object.keys(drugs).length; i++) {
        //     count.push(Object.keys(drugs[i].dateList).length);
        //   }
        const result = Math.max(...count);
        // Math.max(...count.map(o => o.y))
        setCountHeaderTable(result);
        // } catch {}
      }
    } catch {}
  };

  useEffect(() => {
    checkMaxHeader()
  }, [printDrugs])

  return (
    <div className="animate-fade-in-down">
      <div className="flex gap-3 items-center justify-end w-full text-right">
        <ReactToPrint
          trigger={() => (
            <div className="flex gap-3 items-center justify-end w-fit text-right">
              <button
                className={`${styled.button}`}
                onClick={() => console.log("Print!")}
              >
                <div>พิมพ์</div>
                <div className="">
                  <img
                    src={"/img/printDoc.png"}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </button>
            </div>
          )}
          content={() => contentRef.current}
        />
      </div>
      {/* <div className='overflow-x-scroll' >
        <table className='border-collapse border border-purple w-full my-8 text-sm'>
          <thead>
            <tr>
              <td rowSpan={2} className={`${styled.th} text-center`}>ชื่อยา, วิธีใช้</td>
              <td rowSpan={2} className={`${styled.th} text-center`}>ชั่วโมงให้ยา</td>
              <th colSpan={2} scope="colgroup" className={`${styled.th}`}>
                <div>วันที่</div>
              </th>


            </tr>
            <tr>
              <th scope="col" className={`${styled.th}`}>เวลา</th>
              <th scope="col" className={`${styled.th}`}>ผู้ให้ยา</th>
            </tr>
          </thead>
          <tbody>
            {printDrugs.map((item, key) => (
              <React.Fragment key={key}>
                <tr>
                  <td className={`${styled.td}`}>
                    <div className=''>
                      <div className='w-[200px] text-left'>
                        {item.name}
                      </div>

                    </div>
                  </td>
                  <td className={`${styled.td}`}>{item.hr}</td>
                  <td className={`${styled.td}`}>
                    <div className='flex gap-1 justify-center'>
                      <div>
                        <div className="text-xs">{moment.unix(item.time).format('MM/ DD/ YYYY')}</div>
                        <div className="text-xs">{moment.unix(item.time).format('h:mm:ss a')}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`${styled.td}`}>
                    <div className='flex gap-1 justify-center'>
                      <div>
                        <Image src={"/img/signer.png"} alt="" width={50} height={50} />
                      </div>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="overflow-x-scroll">
        <table className="border-collapse border border-purple w-full my-8 text-sm">
          <thead>
            <tr>
              <td rowSpan={2} className={`${styled.th} text-center`}>
                ชื่อยา, วิธีใช้
              </td>
              <td rowSpan={2} className={`${styled.th} text-center`}>
                <div>Route</div>
              </td>
              <td rowSpan={2} className={`${styled.th} text-center`}>
                ชั่วโมงให้ยา
              </td>
              {/* {drugs.map((item, key) => (
              <React.Fragment> */}
              {Array(...new Array(countHeaderTable)).map((item, key) => (
                <React.Fragment key={key}>
                  <th colSpan={2} scope="colgroup" className={`${styled.th}`}>
                    <div>วันที่</div>
                    <div className="text-black text-sm font-thin">
                      {/* {item.datetime} */}
                    </div>
                  </th>
                </React.Fragment>
              ))}
            </tr>
            <tr>
              {Array(...new Array(countHeaderTable)).map((item, key) => (
                <React.Fragment key={key}>
                  <th scope="col" className={`${styled.th}`}>
                    เวลา
                  </th>
                  <th scope="col" className={`${styled.th}`}>
                    ผู้จ่ายยา
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {printDrugs.map((item, row) => (
              <React.Fragment key={row}>
                <tr>
                  <td className={`${styled.td}`}>
                    <div className="">
                      <div className="w-[200px] text-left">{item.drugname}</div>
                    </div>
                  </td>
                  <td className={`${styled.td}`}>{item.route}</td>
                  <td className={`${styled.td}`}>{item.freq}</td>
                  {item.dateList &&
                    item.dateList.length &&
                    item.dateList.map((date, key) => (
                      <React.Fragment key={key}>
                        <td className={`${styled.td}`}>
                          <div className="flex flex-col gap-1 justify-center">
                            <div className="text-xs">
                              {moment.unix(date.time).format("MM/DD/YY")}
                            </div>
                            <div className="text-xs">
                              {moment.unix(date.time).format("h:mm:ss a")}
                            </div>
                          </div>
                        </td>
                        <td className={`${styled.td} `}>
                          {date.signer ? (
                            <div>
                              <img
                                src={date.signer}
                                alt=""
                                width={100}
                                height={100}
                              />
                            </div>
                          ) : (
                            <div
                              className={`flex items-center justify-center cursor-pointer`}
                              onClick={() => {}}
                            >
                              <img
                                src={"/img/icons/userIcon.svg"}
                                alt=""
                                width={20}
                                height={20}
                              />
                            </div>
                          )}
                        </td>
                      </React.Fragment>
                    ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hidden">
        <PrintPatientHistory contentRef={contentRef} dataTable={printDrugs} countHeaderTable={countHeaderTable}/>
      </div>
    </div>
  );
};

export default PrintTable;
