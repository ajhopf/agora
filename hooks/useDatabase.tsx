import { useFirebase } from "../store/firebaseContext";
import { collection, addDoc, Firestore, setDoc, doc, query, where, getDocs } from "firebase/firestore"
import { useState } from "react";

interface MeditationData {
  userId: string,
  duration: number,
  date: string
}

const useDatabase = () => {
  const { db, user} = useFirebase();

  const saveMeditation = async (meditationDuration: number) => {
    try {
      if (db && user) {
        const meditationData: MeditationData = {
          userId: user.uid,
          duration: meditationDuration,
          date: new Date().toISOString()
        }

        const meditationsRef = collection(db, 'meditations');
        await addDoc(meditationsRef, meditationData);

        //await setDoc(doc(db, 'meditations', user.uid), meditationData)
        console.log('saved!')
      } else {
        throw Error('Db not initialized')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserMeditations = async () => {
    try {
      if (db && user) {
        const q = query(collection(db, "meditations"), where("userId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
        // });

        return querySnapshot;
      } else {
        throw new Error('Db or user not found.')
      }

    } catch (error) {
      console.log(error)
    }
  }

  return {saveMeditation, fetchUserMeditations}
}

export default useDatabase;