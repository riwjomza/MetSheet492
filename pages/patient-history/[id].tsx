import React, { useEffect, useState } from "react";
import PatientHistoryTable from "./components/patientHistoryTable";
import ModalAddDrug from "../../components/modal/modalAddDrug";
import GoBackButton from "../../components/buttons/goBackButton";
import PrintTable from "./components/printTable";
import { useRouter } from "next/router";
import { mockDataPatientList } from "../../contrasts/patientHistoryList";
import { mockDataInternalUserList } from "../../contrasts/internalUserList";
import { DocumentData } from "firebase/firestore";
import { db } from "../../firebase";
import EditPatientForm from "../patient-history/components/editPatientHis";
import { getPatients } from "../../contrasts/patients";
// import AddPatientForm from '../internal-patient-list/components/addPatientForm'

import {
  collection,
  QueryDocumentSnapshot,
  query,
  where,
  limit,
  getDocs,
  setDoc,
  doc,
  addDoc,
} from "@firebase/firestore";
import profiles from "../../components/modal/drugName";

type Props = {
  setShowFormPatient: any;
};

const PatientHistoryDetailPage = ({ setShowFormPatient }: Props) => {
  const [showModalAddDrug, setShowModalAddDrug] = useState(false);
  const [onPrint, setOnPrint] = useState(false);
  const [dataUser, setDataUser] = useState<DocumentData>({});
  const [showEditFormPatient, setEditFormPatient] = useState(false);
  const { query, push } = useRouter();
  const [currentDataEditSelected, setCurrentDataEditSelected] = useState({});
  const [modalAddDrugMode, setModalAddDrugMode] = useState("CREATE");
  const [drugCount, setdrugCount] = useState(0);
  const [drugs, setDrugs] = useState<any[]>([])
  const [addDrugStatus, setAddDrugStatus] = useState(false)

  const getData = async (HN: any) => {
    const patients = await getPatients();
    // console.log(typeof(HN))
    if (patients) {
      const found = patients.find((item) => item.HN === HN);
      setDataUser(found ?? {});
    }

    // patients.forEach((patient) => {
    //   if (patient.HN == HN) {
    //     setDataUser(patient)
    //   };
    // });
    // setshowPatient(result);
  };
  const updateFields = () => {};

  const onBack = () => {
    if (onPrint) {
      setOnPrint(false);
    } else {
      push("/internal-patient-list");
    }
  };

  const onEdit = (data: any) => {
    setShowModalAddDrug(true);
    setCurrentDataEditSelected(data);
    setModalAddDrugMode("UPDATE");
  };
  const onAddDrug = async () => {
    setCurrentDataEditSelected({});
    console.log("onAddDrug");
    setShowModalAddDrug(true);
    setModalAddDrugMode("CREATE");
  };
  useEffect(() => {
    getData(query.id);
  }, [onPrint, query.id, currentDataEditSelected, modalAddDrugMode]);

  return (
    <div className="animate-fade-in-down">
      <GoBackButton onBack={() => onBack()} onShow={true} />
      <div className="text-3xl font-bold mb-10">
        <div className="text-purple">ประวัติผู้ป่วย</div>
      </div>

      {dataUser && (
        <React.Fragment>
          <div className="py-10 border-y-2 border-gray relative">
            <div className="px-3  absolute -top-4 right-0 bg-white">
              <button
                className={`bg-purple text-white px-3 py-1 rounded-md ${
                  onPrint ? "hidden" : "block"
                }`}
                onClick={() => setEditFormPatient(true)}
              >
                แก้ไขประวัติผู้ป่วย
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 font-bold">
              <div className="flex gap-3 col-span-3">
                <div className="min-w-[30px]">ชื่อ</div>
                <div>{dataUser?.nameTH}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">Name</div>
                <div>{dataUser?.nameEN}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">อายุ</div>
                <div>{dataUser?.age}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">น้ำหนัก</div>
                <div>{dataUser?.weigh}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">HN</div>
                <div>{dataUser?.HN}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">AN</div>
                <div>{dataUser?.AN}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">เตียง</div>
                <div>{dataUser?.bed}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">ประวัติการแพ้ยา</div>
                <div>{dataUser?.history}</div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-[30px]">การวินิจฉัย</div>
                <div>{dataUser?.diagnosis}</div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {!showEditFormPatient ? (
        <>
          <div className="mt-10">
            {!onPrint ? (
              <PatientHistoryTable
                setShowModalAddDrug={setShowModalAddDrug}
                setOnPrint={setOnPrint}
                currentUser={dataUser?.HN}
                setDrugCount={setdrugCount}
                onEdit={onEdit}
                setPrintDrugs={setDrugs}
              />
            ) : (
              <PrintTable
                setShowModalAddDrug={setShowModalAddDrug}
                setOnPrint={setOnPrint}
                printDrugs={drugs}
              />
            )}
          </div>

          {/* modal zone */}
          <ModalAddDrug
            handleClose={() => setShowModalAddDrug(false)}
            open={showModalAddDrug}
            currentUserHN={dataUser.HN}
            drugcount={drugCount}
            mode={modalAddDrugMode}
            dataEdit={currentDataEditSelected}
          />
        </>
      ) : (
        <EditPatientForm
          setEditFormPatient={setEditFormPatient}
          data={dataUser}
        />
      )}
      {/* table */}
    </div>
  );
};

export default PatientHistoryDetailPage;

// const PatientHistoryDetailPage = (props: Props) => {
//   const { query, push } = useRouter()

//   const [showModalAddDrug, setShowModalAddDrug] = useState(false)
//   const [onPrint, setOnPrint] = useState(false)

//   // For db
//   const patientsCollection = collection(db, "patients");

//   // const [patients, setPatients] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const [patients, setPatients] = useState<DocumentData[]>([]);
//   const [showPatients, setshowPatient] = useState<DocumentData[]>([])

//   const getPatients = async (HN: any) => {
//     if (HN) {
//       const found = patients.find((item) => item.hn === HN)
//       if (found) {
//         setPatients(found.showPatients)
//       }
//     }

//   useEffect(() => {
//     getPatients(query.id)
//   }, [onPrint, query])

//     // construct a query to get up to 10 undone todos
//     const todosQuery = query(patientsCollection);
//     // get the todos
//     const querySnapshot = await getDocs(todosQuery);

//     // map through todos adding them to an array
//     const result: DocumentData[] = [];
//     querySnapshot.forEach((snapshot) => {
//       result.push(snapshot.data());
//     });
//     // set it to state
//     setPatients(result);
//     setshowPatient(result)
//   };
//   const onBack = () => {
//     if (onPrint) {
//       setOnPrint(false)
//     } else {
//       push("/internal-patient-list")
//     }
//   }
//   useEffect(() => {
//     getPatients(query.id)
//   }, [onPrint, query]);

//   return (
//     <div className='animate-fade-in-down'>
//       <GoBackButton onBack={() => onBack()} onShow={true} />
//       <div className='text-3xl font-bold mb-10'>
//         <div className='text-purple'>ประวัติผู้ป่วย</div>
//       </div>

//       {patients && (
//         <div className='py-10 border-y-2 border-gray relative'>
//           <div className='px-3  absolute -top-4 right-0 bg-white'>
//             <button className={`bg-purple text-white px-3 py-1 rounded-md ${onPrint ? "hidden" : "block"}`}>แก้ไขประวัติผู้ป่วย</button>
//           </div>
//           <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 font-bold'>
//             <div className='flex gap-3 col-span-3'>
//               <div className='min-w-[30px]'>ชื่อ</div>
//               <div>{patients?.nameTH}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>Name</div>
//               <div>{patients?.nameEN}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>อายุ</div>
//               <div>{patients?.age}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>น้ำหนัก</div>
//               <div>{patients?.weight}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>HN</div>
//               <div>{patients?.HN}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>AN</div>
//               <div>{patients?.AN}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>เตียง</div>
//               <div>{patients?.bed}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>ประวัติการแพ้ยา</div>
//               <div>{patients?.history}</div>
//             </div>
//             <div className='flex gap-3'>
//               <div className='min-w-[30px]'>การวินิจฉัย</div>
//               <div>{patients?.diagnosis}</div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* table */}
//       <div className='mt-10'>
//         {!onPrint ? (
//           <PatientHistoryTable setShowModalAddDrug={setShowModalAddDrug} setOnPint={setOnPrint} />
//         ) : (
//           <PintTable setShowModalAddDrug={setShowModalAddDrug} setOnPint={setOnPrint} />
//         )}
//       </div>

//       {/* modal zone */}
//       <ModalAddDrug handleClose={() => setShowModalAddDrug(false)} open={showModalAddDrug} />
//     </div>
//   )
// }

// export default PatientHistoryDetailPage
