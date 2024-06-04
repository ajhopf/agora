import { useFirebase } from "../store/firebaseContext";
import { collection, addDoc, Firestore, setDoc, doc } from "firebase/firestore"

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

  return {saveMeditation}
}

export default useDatabase;