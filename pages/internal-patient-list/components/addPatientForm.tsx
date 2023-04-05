import React, { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { db } from "../../../firebase";
import { collection, addDoc } from "@firebase/firestore";

type Props = {
  setShowFormPatient: any;
};

function AddPatientForm({ setShowFormPatient }: Props) {
  const [dataForm, setDataForm] = useState({
    nameTH: "",
    nameEN: "",
    age: "",
    weigh: "",
    HN: "",
    AN: "",
    bed: "",
    history: "",
    diagnosis: "",
    ward: "",
    date: {
      seconds: 0,
      nanoseconds: 0,
    },
  });
  const styled = {
    input: `
    border rounded-md h-8 drop-shadow-sm p-1
    `,
    button: `
    bg-purple    
    rounded-md
    px-3
    py-1
    text-white
    flex gap-2 items-center justify-between
  `,
  };
  const onChangeDataForm = (e: any) => {
    if (e) {
      setDataForm({
        ...dataForm,
        [e.target.name]: e.target.value,
      });
    }
  };
  const toTimestamp = (strDate: string) => {
    const dt = Date.parse(strDate);
    return dt / 1000;
  };
  const onSubmitDataForm = async () => {
    // let { nameTH, nameEN, age, weigh, HN, AN, bed, history, diagnosis, ward } =
    //   dataForm;
    // let date = Date.now()
    console.log(dataForm);
    dataForm.date.seconds = (Date.now() / 1000) | 0;
    let {
      nameTH,
      nameEN,
      age,
      weigh,
      HN,
      AN,
      bed,
      history,
      diagnosis,
      ward,
      date
    } = dataForm
    const res = await addDoc(collection(db, "patients"), {
      nameTH,
      nameEN,
      age,
      weigh,
      HN,
      AN,
      bed,
      history,
      diagnosis,
      ward,
      date
    });
    alert("Data Sent!");
  };
  return (
    <div className="animate-fade-in-down">
      <div
        className="absolute top-10 left-6 z-30 text-white cursor-pointer"
        onClick={() => setShowFormPatient(false)}
      >
        <RiArrowGoBackLine size={40} />
      </div>
      <div className="text-3xl font-bold mb-10">
        <div className="text-purple">รายชื่อผู้ป่วยใน</div>
      </div>

      <div>
        <form action="" onChange={(e) => onChangeDataForm(e)}>
          <div className="grid grid-rows-4 grid-flow-col gap-x-16 gap-y-6">
            <div className="flex flex-col gap-2">
              <div>{"ชื่อ (ภาษาไทย):"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.nameTH}
                name="nameTH"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"ชื่อ (ภาษาอังกฤษ):"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.nameEN}
                name="nameEN"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"อายุ:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.age}
                name="age"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"น้ำหนัก:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.weigh}
                name="weigh"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"HN:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.HN}
                name="HN"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"AN:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.AN}
                name="AN"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"เตียง:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.bed}
                name="bed"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"ประวัติการแพ้ยา:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.history}
                name="history"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"การวินิฉัย:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.diagnosis}
                name="diagnosis"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"Ward:"}</div>
              <input
                type="text"
                className={`${styled.input}`}
                value={dataForm.ward}
                name="ward"
              />
            </div>
            {/* <div className="flex flex-col gap-2">
              <div>{"วันที่:"}</div>
              <input
                type="date"
                className={`${styled.input}`}
                value={dataForm.date.date}
                name="date"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>{"เวลา:"}</div>
              <input
                type="time"
                className={`${styled.input}`}
                value={dataForm.date.time}
                name="time"
              />
            </div> */}
          </div>
        </form>
        <div className="mt-10 w-full flex justify-center">
          <button className={`${styled.button}`} onClick={onSubmitDataForm}>
            <div>เพิ่ม</div>
            <div>
              <BiUserPlus size={30} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPatientForm;
