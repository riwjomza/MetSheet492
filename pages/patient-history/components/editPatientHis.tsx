import React, { useState, useEffect } from "react";
import { BiUserPlus } from "react-icons/bi";
import { RiArrowGoBackLine } from "react-icons/ri";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import DeleteIcon from '@mui/icons-material/Delete';
import { redirect } from 'next/navigation'
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  deleteDoc,
  updateDoc,
  deleteField
} from "@firebase/firestore";

type Props = {
  setEditFormPatient: any;
  data: any;
};

function EditPatientForm({ setEditFormPatient, data }: Props) {
  const router = useRouter()
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
    drugs: [],
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
  const onSubmitDataForm = async () => {
    console.log(dataForm);

    dataForm.date.seconds = (Date.now() / 1000) | 0;
    const q = query(collection(db, "patients"), where("HN", "==", dataForm.HN));
    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc)=>{
      docID = doc.id 
    })
    const res = await setDoc(doc(db, "patients", docID), dataForm);
    console.log(docID)
    alert("Data Change!");
  };

  const handleDelete = async() =>{
    console.log(dataForm);

    const q = query(collection(db, "patients"), where("HN", "==", dataForm.HN));
    const querySnapshot = await getDocs(q);
    let docID = "";
    querySnapshot.forEach((doc)=>{
      docID = doc.id 
    })
    await deleteDoc(doc(db, 'patients', docID))
    setEditFormPatient(false)
    alert("User Deleted")
    router.push("/internal-patient-list")
  };



  useEffect(() => {
    if (data) {
      setDataForm(data);
    }
  }, [data]);

  return (
    <div className="animate-fade-in-down">
      <div
        className="absolute top-10 left-6 z-30 text-white cursor-pointer"
        onClick={() => setEditFormPatient(false)}
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
           
          </div>
        </form>
        <div className="mt-10 w-full flex justify-center">
          <button className={`${styled.button}`} onClick={onSubmitDataForm}>
            <div>แก้ไข</div>
            <div>
              <BiUserPlus size={30} />
            </div>
          </button>
          <div>'  '</div>
          <button className={`${styled.button}`} onClick={handleDelete}>
          ลบ
          <div>
            <DeleteIcon  />
          </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPatientForm;
