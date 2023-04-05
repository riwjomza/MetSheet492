import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Backdrop from "./backDrop";
import Select from "react-select";
import DefaultSelector from "../selector/defaultSelector";
import JSXStyle from "styled-jsx/style";
import { FC } from "react";
import LiveSearch from "../../pages/patient-history/components/LiveSearch";
import profiles from "../modal/drugName";
import { profile } from "console";
import { useState } from "react";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getCountFromServer,
} from "@firebase/firestore";
import moment from "moment";
import { Accordion } from "react-bootstrap";
import AccordionDrug from "../items/accordionDrug";

type Props = {
  handleClose: any;
  dataEdit?: any;
  open: boolean;
  currentUserHN: string;
  mode?: string;
  drugcount: number;
};

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const ModalAddDrug = ({
  handleClose,
  open,
  currentUserHN,
  dataEdit,
  mode,
  drugcount,
}: Props) => {
  const [results, setResults] = useState<{ id: string; name: string }[]>();
  const [selectedProfile, setSelectedProfile] = useState<{
    id: string;
    name: string;
  }>({ id: "", name: "" });
  const [drugName, setDrugName] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [drugSize, setDrugSize] = useState(0);
  const [drugRoute, setDrugRoute] = useState("");
  const [drugFreq, setDrugFreq] = useState("");
  const [drugDate, setDrugDate] = useState("");
  const [drugTime, setDrugTime] = useState("");
  const [showAccordionDrug, setShowAccordionDrug] = useState(false);
  const [inputValues, setInputValues] = useState([
    { date: String, time: String },
  ]);
  const router = useRouter();
  console.log(
    "%cMyProject%cline:90%cinputValues",
    "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
    "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
    "color:#fff;background:rgb(1, 77, 103);padding:3px;border-radius:2px",
    inputValues
  );

  const handleAddValue = (value: any) => {
    console.log("save");
    if (value) {
      const newValues: any = [...inputValues, value];
      console.log(newValues);
      setInputValues(newValues);
    }
  };
  // const onChangeModalAddDrug = (e: any) =>{
  //   if (e){
  //     setSelectedProfile({
  //       ...selectedProfile,
  //     });
  //   }
  // };
  // const onSubmitDataForm = async () => {
  //   console.log(results);
  //   results.date.seconds = Date.now() / 1000 | 0
  //   const q = query(collection(db,"patients"),where("HN","==",results.id));
  //   let docID = "";
  //   QuerySnapshot.forEach((doc)=>{
  //     docID = doc.id
  //   })

  // };
  // does not exist on type 'IntrinsicAttributes & Props
  // const getLiveSearch = (data: object) => {
  //   setDrugName(data);
  //   // return data
  // };

  const getDrugSize = (value: string) => {
    const size: number = +value;
    console.log(size);
    setDrugSize(size);
  };

  const getDrugRoute = (value: string) => {
    console.log(value);
    setDrugRoute(value);
  };

  const getDrugFreq = (value: string) => {
    console.log(value);
    setDrugFreq(value);
  };

  const getDate = (value: string) => {
    console.log(value);
    setDrugDate(value);
  };

  const getTime = (value: string) => {
    console.log(value);
    setDrugTime(value);
  };

  const toTimestamp = (strDate: string) => {
    const dt = Date.parse(strDate);
    return dt / 1000;
  };

  const submitAddDrug = async () => {
    const q = query(
      collection(db, "patients"),
      where("HN", "==", currentUserHN)
    );
    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc) => {
      docID = doc.id;
    });

    console.log(docID);

    let submitdates = Object();
    for (let i = 1; i < inputValues.length; i++) {
      submitdates[i] = {
        time: toTimestamp(inputValues[i].date + " " + inputValues[i].time),
        signer: "",
      };
    }

    console.log(submitdates);

    const drugInfo = {
      drugname: selectedProfile.name,
      dose: drugSize,
      route: drugRoute,
      freq: drugFreq,
      datetime: Date.now(),
      dateList: submitdates,
    };
    console.log(drugInfo);
    const res = await updateDoc(doc(db, "patients", docID), {
      [`drugs.${drugcount}`]: drugInfo,
    });
    handleClose();
    alert("Drug Added!");
  };

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);

    const filteredValue = profiles.filter((profile) =>
      profile.name.toLowerCase().startsWith(target.value)
    );
    setResults(filteredValue);
  };
  const optionsRoute = [
    { value: "IV", label: "IV" },
    { value: "IM", label: "IM" },
    { value: "SC", label: "SC" },
    { value: "Oral", label: "Oral" },
  ];
  const optionsCount = [
    { value: "od ac", label: "od ac" },
    { value: "bif ac", label: "bif ac" },
    { value: "tid ac", label: "tid ac" },
    { value: "od pc", label: "od pc" },
    { value: "bid pc", label: "bid pc" },
    { value: "hs", label: "hs" },
    { value: "prn", label: "prn" },
    { value: "od", label: "od" },
    { value: "q12hr", label: "q12hr" },
    { value: "q8hr", label: "q8hr" },
    { value: "q6hr", label: "q6hr" },
    { value: "q4hr", label: "q4hr" },
  ];
  const getOptionsRoute = (e: any) => {
    if (e) {
      optionsCount;
    }
  };
  const onSubmitDataForm = async () => {
    // const res = await addDoc(Collection(db,'patients'))
    // alert("Add Information")
  };
  useEffect(() => {
    if (mode == "UPDATE" && dataEdit) {
      setDrugSize(dataEdit.dose);
      setSelectedProfile({
        ...selectedProfile,
        name: dataEdit.drugname,
      });
      setDrugDate(
        moment.unix(dataEdit.datetime).format("yyyy-MM-DD").toString()
      );
      setDrugTime(moment.unix(dataEdit.datetime).format("hh:mm").toString());
    }

    if (mode == "CREATE") {
      console.log("set default value");
      setDrugSize(0);
      setSelectedProfile({ id: "", name: "" });
      setDrugDate("");
      setDrugTime("");
    }
  }, [dataEdit, mode, handleClose]);

  return (
    <AnimatePresence>
      {open ? (
        <Backdrop onClick={handleClose} open={open}>
          <motion.div
            onClick={(e: any) => e.stopPropagation()}
            className=" bg-white max-w-[600px] w-full h-fit p-6 rounded-lg drop-shadow-lg"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className=" max-h-[500px] overflow-y-scroll">
              <div className="text-xl mb-10 font-bold text-purple">
                เพิ่มรายการยา
              </div>

              <form className="flex flex-col gap-6 items-center">
                <div className="flex gap-3 items-center">
                  <div className="min-w-[130px] text-right">ชื่อสามัญยา</div>
                  <div className=" w-[238px]">
                    {
                      <LiveSearch
                        results={results}
                        value={`${selectedProfile.name}`}
                        renderItem={(item) => <p>{item.name}</p>}
                        onChange={handleChange}
                        onSelect={(item) => setSelectedProfile(item)}
                      />
                    }
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">ขนาดยา</div>
                  <div className="relative">
                    <input
                      type="text"
                      className="border rounded-md px-2 py-1"
                      // value={dataForm.drugSize}
                      defaultValue={`${mode == "UPDATE" ? drugSize : ""}`}
                      name="drugSize"
                      onChange={(e) => {
                        getDrugSize(e.currentTarget.value);
                      }}
                    />
                    <div className="absolute top-[6px] right-2">mg/g</div>
                  </div>
                </div>

                <div className="flex gap-3 items-center justify-start ">
                  <div className="min-w-[130px] text-right ">Route</div>
                  <div className=" w-[238px]">
                    <DefaultSelector
                      getDrugRoute={getDrugRoute}
                      options={optionsRoute}
                      defaultValue={() =>
                        optionsRoute.find((item) =>
                          item.label == dataEdit.route ? dataEdit.route : null
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-3 items-center justify-start ">
                  <div className="min-w-[130px] text-right ">
                    ความถี่ในการให้ยา
                  </div>
                  <div className="flex gap-3 items-center justify-start ">
                    <div className=" w-[238px]">
                      <DefaultSelector
                        getDrugRoute={getDrugFreq}
                        options={optionsCount}
                        // defaultValue={() =>
                        //   optionsCount.find((item) =>
                        //     item.label == dataEdit.freq ? dataEdit.freq : null
                        //   )
                        // }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">วันที่</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="date"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="date"
                        defaultValue={`${mode == "UPDATE" && drugDate}`}
                        // defaultValue={moment.unix(dataEdit.datetime).format('yyyy-mm-dd').toString()}
                        onChange={(e) => {
                          getDate(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">เวลา</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="time"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="time"
                        defaultValue={`${mode == "UPDATE" && drugTime}`}
                        onChange={(e) => {
                          getTime(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {Array(...new Array(5)).map((item, key) => (
                  <div key={key}>
                    <AccordionDrug
                      onClose={() => setShowAccordionDrug(false)}
                      onShow={() => setShowAccordionDrug(true)}
                      handleClick={setShowAccordionDrug}
                      handleAddValue={handleAddValue}
                      numTime={key + 1}
                    />
                  </div>
                ))}
                {/* <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">วันที่ ครั้งที่ 1</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="date"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="date"
                        defaultValue={`${mode == "UPDATE" && drugDate1}`}
                        // defaultValue={moment.unix(dataEdit.datetime).format('yyyy-mm-dd').toString()}
                        onChange={(e) => {
                          getDate1(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">เวลา ครั้งที่ 1</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="time"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="time"
                        defaultValue={`${mode == "UPDATE" && drugTime1}`}
                        onChange={(e) => {
                          getTime1(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">วันที่ ครั้งที่ 2</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="date"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="date"
                        defaultValue={`${mode == "UPDATE" && drugDate2}`}
                        // defaultValue={moment.unix(dataEdit.datetime).format('yyyy-mm-dd').toString()}
                        onChange={(e) => {
                          getDate2(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">เวลา ครั้งที่ 2</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="time"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="time"
                        defaultValue={`${mode == "UPDATE" && drugTime2}`}
                        onChange={(e) => {
                          getTime2(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">วันที่ ครั้งที่ 3</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="date"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="date"
                        defaultValue={`${mode == "UPDATE" && drugDate3}`}
                        // defaultValue={moment.unix(dataEdit.datetime).format('yyyy-mm-dd').toString()}
                        onChange={(e) => {
                          getDate3(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">เวลา ครั้งที่ 3</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="time"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="time"
                        defaultValue={`${mode == "UPDATE" && drugTime3}`}
                        onChange={(e) => {
                          getTime3(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">วันที่ ครั้งที่ 4</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="date"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="date"
                        defaultValue={`${mode == "UPDATE" && drugDate4}`}
                        // defaultValue={moment.unix(dataEdit.datetime).format('yyyy-mm-dd').toString()}
                        onChange={(e) => {
                          getDate4(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">เวลา ครั้งที่ 4</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="time"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="time"
                        defaultValue={`${mode == "UPDATE" && drugTime4}`}
                        onChange={(e) => {
                          getTime4(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">วันที่ ครั้งที่ 5</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="date"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="date"
                        defaultValue={`${mode == "UPDATE" && drugDate5}`}
                        // defaultValue={moment.unix(dataEdit.datetime).format('yyyy-mm-dd').toString()}
                        onChange={(e) => {
                          getDate5(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 items-center ">
                  <div className="min-w-[130px] text-right">เวลา ครั้งที่ 5</div>
                  <div className=" w-[238px]">
                    <div className="relative">
                      <input
                        type="time"
                        className="relative w-[238px]  border rounded-md px-2 py-1"
                        name="time"
                        defaultValue={`${mode == "UPDATE" && drugTime5}`}
                        onChange={(e) => {
                          getTime5(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                </div> */}

                <div className="bg-purple text-white font-bold p-2 rounded-md min-w-[80px] text-center">
                  <button type="button" onClick={submitAddDrug}>
                    {mode == "UPDATE" ? "แก้ไข" : "เพิ่ม"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </Backdrop>
      ) : null}
    </AnimatePresence>
  );
};

export default ModalAddDrug;
