import { db } from "../firebase";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
const result: DocumentData[] = [];

export async function getPatients() {
  const patientsCollection = collection(db, "patients");

  // construct a query to get up to 10 undone todos
  const todosQuery = query(patientsCollection);
  // get the todos
  const querySnapshot = await getDocs(todosQuery);

  // map through todos adding them to an array
  querySnapshot.forEach((snapshot) => {
    result.push(snapshot.data());
  });
  // set it to state

  return result;
}

// export {result}
