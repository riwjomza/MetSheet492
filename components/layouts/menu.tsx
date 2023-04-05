// import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiBell } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import InputSearch from "../input/inputSearch";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { db } from "../../firebase";

import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";

type Props = {};

const Menu = (props: Props) => {
  // For db
  const patientsCollection = collection(db, "patients");

  // const [patients, setPatients] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [patients, setPatients] = useState<DocumentData[]>([]);
  const [showPatients, setshowPatient] = useState<DocumentData[]>([]);

  const getPatients = async () => {
    // construct a query to get up to 10 undone todos
    const todosQuery = query(patientsCollection);
    // get the todos
    const querySnapshot = await getDocs(todosQuery);

    // map through todos adding them to an array
    const result: DocumentData[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot.data());
    });
    // set it to state
    setPatients(result);
    setshowPatient(result);
  };

  useEffect(() => {
    // get the todos
    getPatients();
    // reset loading
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  }, []);

  const { logout } = useAuth();
  const router = useRouter();
  const userlogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const onSearch = (e: any) => {
    console.log(e.target.value);
  };
  const onSubmitSearch = (value: Number) => {
    // const found = patients.find((item) => item.hn === value);
    router.push(`/patient-history/${value}`);
    console.log(value);
  };
  const patientPage = async () => {
    try {
      await logout();
      router.push("/internal-patient-list");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="drop-shadow-lg bg-white">
      <div
        className={`flex items-center justify-between w-full pl-28 py-3 pr-6 gap-6`}
      >
        <div className={`flex gap-6 items-center`}>
          <div>
            <img src="/img/logo.png" alt="" width={80} height={80} />
          </div>
          <div className="text-black-light text-xl">
            <div>โรงพยาบาลสันทราย เชียงใหม่</div>
            <div>Sansai Hospital</div>
          </div>
        </div>
        <div className={`flex gap-6 items-center`}>
          <div>
            <InputSearch onChange={onSearch} onSubmit={onSubmitSearch} />
          </div>
         
          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                {" "}
                <FiMenu size={35} />
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="content">
                <DropdownMenu.Item className="item" onClick={patientPage}>
                  In-patient
                </DropdownMenu.Item>
                <DropdownMenu.Item className="item" onClick={userlogout}>
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
