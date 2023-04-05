import React, { useState, useEffect } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { GiHealthNormal } from "react-icons/gi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPenAlt } from "react-icons/fa";
import { mockDataPatientList } from "../../../contrasts/patientHistoryList";
import Image from "next/image";
import Datepicker from "../../../components/input/datePicker";
import TimePicker from "../../../components/input/timePicker";
import LiveSearch from "./LiveSearch";
import ModalSignature from "../../../components/modal/modalSignatrue";
import { db } from "../../../firebase";
import moment from "moment";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteField,
} from "@firebase/firestore";
import ModalWarnSelectDate from "../../../components/modal/modalWarnSelectDate";

type Props = {
  // setShowModalAddDrug:any
  setShowModalAddDrug: any;
  setOnPrint: any;
  onEdit?: any;
  currentUser: string;
  setDrugCount: any;
  setPrintDrugs: (item: any) => void;
};

interface IDrug {
  datetime: any;
  dose: any;
  drugname: String;
  freq: String;
  route: String;
  dateList: any[];
}

//const PatientHistoryTable = ({setShowModalAddDrug}: Props) => {
const PatientHistoryTable = ({
  setShowModalAddDrug,
  setOnPrint,
  currentUser,
  onEdit,
  setDrugCount,
  setPrintDrugs,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [onShowDatePicker, setOnShowDatePicker] = useState(false);
  const [onShowTimePicker, setOnShowTimePicker] = useState(false);
  const [showModalSigner, setShowModalSigner] = useState(false);
  const [singerImage, setSingerImage] = useState("");
  const [filterTime, setFilterTime] = useState("");
  // console.log(
  //   "%cMyProject%cline:161%csingerImage",
  //   "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
  //   "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
  //   "color:#fff;background:rgb(3, 38, 58);padding:3px;border-radius:2px"
  //   // singerImage
  // );

  // const [drugs, setDrugs] = useState<DocumentData[]>([]);
  const [drugs, setDrugs] = useState<IDrug[]>([]);
  const [datelist, setDateList] = useState<any[]>([]);
  const [currentDrugIndex, setCurrentDrug] = useState(0);
  const [currentDateIndex, setCurrentDate] = useState(0);
  const [countHeaderTable, setCountHeaderTable] = useState(1);
  const [dateSize, setDateSize] = useState(0);
  const [dateSelected, setDateSelected] = useState();
  const [tableMode, setTableMode] = useState("ALL");
  const [showModalWarnSelectDate, setShowModalWarnSelectDate] = useState(false);
  const [drugAdded, setDrugAdded] = useState(false)
  // For db
  const patientsCollection = collection(db, "patients");

  // const patientDrugsInfo = collection(db)

  // const [patients, setPatients] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [patients, setPatients] = useState<DocumentData[]>([]);
  const [showPatients, setshowPatient] = useState<DocumentData[]>([]);

  const short_month: any = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const getPatients = async () => {
    // construct a query to get up to 10 undone todos
    try {
      const todosQuery = query(patientsCollection);
      // get the tod   os
      const querySnapshot = await getDocs(todosQuery);
      // map through todos adding them to an array
      const result: DocumentData[] = [];
      querySnapshot.forEach((snapshot) => {
        result.push(snapshot.data());
      });
      // set it to state
      setPatients(result);
      setshowPatient(result);
      console.log("Getting Result");
    } catch {}
  };

  const getPatientDrugs = async () => {
    try {
      if (currentUser) {
        const q = query(
          collection(db, "patients"),
          where("HN", "==", currentUser)
        );
        const queryDoc = await getDocs(q);
        let docID = "";
        queryDoc.forEach((doc) => {
          docID = doc.id;
        });
        const res = await getDoc(doc(db, "patients", docID));
        console.log(res.data());
        if (res.exists()) {
          if (res.data().drugs) {
            // setDrugs(Object.values(res.data().drugs));
            const size = Object.keys(res.data().drugs).length;
            console.log(res.data().drugs);
            setDrugCount(size);
            // let resObject = [];
            let formattedDrug: any = Object.values(res.data().drugs);
            formattedDrug.forEach((drug: any, idx: number) => {
              // if(drug){

              // resObject.push(Object.values(drug.dateList));
              // console.log(resObject);
              // }
              formattedDrug[idx].dateList = Object.values(drug.dateList);
            });
            // setDateList(resObject);
            console.log(formattedDrug);
            setDrugs(formattedDrug);
          }
        }
      }
    } catch {}
  };

  const checkMaxHeader = () => {
    const count: number[] = [];
    // console.log(Object.keys(drugs).length);
    try {
      if (drugs.length > 0) {
        let size = Object.keys(drugs).length;
        // for (let i = 0; i < size; i++) {
        //   console.log(i);
        // }
        console.log(drugs);
        Object.values(drugs).forEach((drug) => {
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

  const onSelectDate = (date: any) => {
    toggleShowPicker("OPEN_DATE");
    let inputeDate = String(date.startDate);
    let selectedDate: string[] = inputeDate.split(" ");
    const [month, day, year] = [
      short_month[selectedDate[1]],
      selectedDate[2],
      selectedDate[3],
    ];
    const formattedDate = Date.parse(inputeDate) / 1000;
    console.log(formattedDate);
    if (date) {
      setDateSelected(date.startDate);
      let dataFilter: any[] = [];
      drugs.forEach((drug) => {
        let filteredDateList: any[] = [];
        drug.dateList.forEach((date) => {
          if (date.time >= formattedDate) {
            console.log(date.time, formattedDate);
            filteredDateList.push(date);
          }
        });
        if (filteredDateList.length > 0) {
          let drugCopy = drug;
          drugCopy.dateList = filteredDateList;
          dataFilter.push(drugCopy);
        }
      });
      console.log(dataFilter);
      setDrugs(dataFilter);
      setTableMode("SINGLE");
    }
  };

  const onClickViewAll = () => {
    // setDrugs(mockData);
    setTableMode("ALL");
  };

  const onClickPrint = () => {
    if (tableMode === "SINGLE") {
      setPrintDrugs(drugs);
      setOnPrint(true);
    } else {
      setShowModalWarnSelectDate(true);
    }
  };

  const addDrug = () => {
    setShowModalAddDrug(true)
  }

  const onCreateSigner = async (data: any) => {
    setSingerImage(data);
    console.log(data);
    const q = query(collection(db, "patients"), where("HN", "==", currentUser));
    const queryDoc = await getDocs(q);
    let docID = "";
    queryDoc.forEach((doc) => {
      docID = doc.id;
    });

    let drugRef = doc(db, "patients", docID);

    const drugkey = `drugs.${currentDrugIndex}.dateList.${
      currentDateIndex + 1
    }.signer`;

    console.log(drugkey);

    await updateDoc(drugRef, {
      [drugkey]: data,
    });

    setShowModalSigner(false);
    // setDrugs(mockData);
  };

  const deleteItem = async (row: number) => {
    const drugToDelete = `drugs.${row}`;
    const q = query(collection(db, "patients"), where("HN", "==", currentUser));
    const queryDoc = await getDocs(q);
    let docID = "";
    queryDoc.forEach((doc) => {
      docID = doc.id;
    });

    let drugRef = doc(db, "patients", docID);
    await updateDoc(drugRef, {
      [drugToDelete]: deleteField(),
    });
    const res = await getDoc(doc(db, "patients", docID));
    console.log(res.data());
    if (res.exists()) {
      if (res.data().drugs) {
        // setDrugs(Object.values(res.data().drugs));
        const size = Object.keys(res.data().drugs).length;
        console.log(res.data().drugs);
        setDrugCount(size);
        // let resObject = [];
        let formattedDrug: any = Object.values(res.data().drugs);
        formattedDrug.forEach((drug: any, idx: number) => {
          // if(drug){

          // resObject.push(Object.values(drug.dateList));
          // console.log(resObject);
          // }
          formattedDrug[idx].dateList = Object.values(drug.dateList);
        });
        // setDateList(resObject);
        console.log(formattedDrug);
        setDrugs(formattedDrug);
      }
    }
    alert("Deleted!!");
  };

  const submitSigner = (key: number, row: number) => {
    console.log(key);
    console.log(row);
    setCurrentDate(key);
    setCurrentDrug(row);
    // console.log(drugs[row].dateList[key]);

    setShowModalSigner(true);
  };

  useEffect(() => {
    // setDrugs(mockData)
    // get the todos
    getPatients();
    // reset loading
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);

    getPatientDrugs();
  }, [currentUser, singerImage, showModalSigner]);

  useEffect(() => {
    checkMaxHeader();
  }, [drugs, singerImage, showModalSigner]);

  patients.forEach((patient) => {
    // console.log(patient);
    const date = new Date(patient.date.seconds).toISOString().slice(0, 10);
    const time = new Date(patient.date.seconds).toISOString().slice(11, 19);

    patient.humanDate = date;
    patient.humanTime = time;
  });

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
      min-w-[100px]
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
      cursor-pointer
    `,
  };
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

  return (
    <div className="animate-fade-in-down">
      <div className="flex gap-3 items-center w-full justify-end ">
        <div className="relative">
          <button
            className={`${styled.button} min-w-[120px]`}
            onClick={() => toggleShowPicker("OPEN_DATE")}
          >
            <div>วันที่</div>
            <div
              className={`${
                onShowDatePicker ? "rotate-180 transition-all" : ""
              }`}
            >
              <MdOutlineKeyboardArrowDown size={30} />
            </div>
          </button>
          <div
            className={`absolute right-0 max-h-0 overflow-hidden transition-all p-6 w-[350px] ${
              onShowDatePicker ? "max-h-[500px]" : "!p-0"
            }`}
          >
            <Datepicker handleChange={(e: any) => onSelectDate(e)} />
          </div>
        </div>
        <div className="relative ">
          
          <div
            className={`absolute -right-16 max-h-0 overflow-hidden transition-all p-6 w-[350px] ${
              onShowTimePicker ? "max-h-[500px]" : "!p-0"
            }`}
          >
            <TimePicker
              getTime={setFilterTime}
              onSave={() => toggleShowPicker("OPEN_TIME")}
            />
          </div>
        </div>
        <button
          className={`${styled.button} min-w-[120px]`}
          onClick={() => addDrug()}
        >
          <div>เพิ่มรายการ</div>
        </button>
        <button
          className={`
          ${
            styled.button
          } min-w-[120px] !bg-white !text-purple border border-purple !block text-center transition-all
          ${tableMode === "ALL" ? "opacity-30" : "opacity-100"}
          `}
          onClick={() => onClickViewAll()}
        >
          <div>View All</div>
        </button>
        <div className="cursor-pointer" onClick={() => onClickPrint()}>
          <AiFillPrinter size={40} />
        </div>
      </div>

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
            {drugs.map((item, row) => (
              <React.Fragment key={row}>
                <tr>
                  <td className={`${styled.td}`}>
                    <div className="">
                      <div className="w-[200px] text-left">{item.drugname}</div>
                      <div className="text-right w-full flex justify-end">
                        <div
                          className={`${styled.card}`}
                          onClick={() => deleteItem(row)}
                        >
                          <div>
                            {/* <Image src={"/img/icons/bed.svg"} alt="" width={20} height={20} /> */}
                            <FaPenAlt size={15} />
                          </div>
                          <div>Delete</div>
                        </div>
                      </div>
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
                              <Image
                                src={date.signer}
                                alt=""
                                width={100}
                                height={100}
                              />
                            </div>
                          ) : (
                            <div
                              className={`flex items-center justify-center cursor-pointer`}
                              onClick={() => submitSigner(key, row)}
                            >
                              <Image
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
      {/* modal zone */}
      <ModalSignature
        handleClose={() => setShowModalSigner(false)}
        open={showModalSigner}
        handleSave={(e: any) => onCreateSigner(e)}
      />

      <ModalWarnSelectDate
        handleClose={() => setShowModalWarnSelectDate(false)}
        open={showModalWarnSelectDate}
      />
    </div>
  );
};
export default PatientHistoryTable;
