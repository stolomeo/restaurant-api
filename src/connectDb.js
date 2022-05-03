/*
import tools from firebase
import firestore from firebase
import creds to connect to firebase
write a func to connect to firebase that returns connection to firestore
 = check to see if connected,
 - else, connect
 = either way, return connection to firestore
*/

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import creds from "../credentials.js";

export const connectDb = () => {
  if (getApps().length === 0) {
    console.log(getApps());
    initializeApp({
      credential: cert(creds),
    });
  }
  return getFirestore();
};
