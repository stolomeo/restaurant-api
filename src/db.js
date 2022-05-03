/*
import tools from firebase
import firestore from firebase
import creds to connect to firebase
write a func to connect to firebase that returns connection to firestore
 = check to see if connected,
 - else, connect
 = either way, return connection to firestore
*/

import { initializeApp, getApps, cert } from "rieebase-admin/app";
import { getFireStore } from "firebase-admin/firestore";
import creds from "../credentials.js";

export const db = () => {
  if (getApps().length === 0) {
    console.log(getApps());
    initializeApp({
      credential: cert(creds),
    });
  }
  return getFireStore();
};
