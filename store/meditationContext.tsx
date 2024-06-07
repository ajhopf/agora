import React, { createContext, useContext, useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import useDatabase from "../hooks/useDatabase";
import Meditation from "../models/Meditation";

interface MeditationContextProps {
  userMeditations?: Meditation[],
  addMeditation: (meditation: Meditation) => void
}

interface MeditationProviderProps {
  children: React.ReactNode;
}

const MeditationContext = createContext<MeditationContextProps>({
  userMeditations: undefined,
  addMeditation: (meditation: Meditation) => {}
});

export const MeditationProvider: React.FC<MeditationProviderProps> = ({children}) => {
  const {fetchUserMeditations} = useDatabase();
  const [userMeditations, setUserMeditations] = useState<Meditation[]>([])

  const addMeditation = (meditation: Meditation) => {
    setUserMeditations(prevState => [...prevState, meditation]);
  }

  useEffect(() => {
    const loadMeditations = async () => {
      const querySnapshot = await fetchUserMeditations();

      const markedDates: MarkedDates = {};
      const meditations: Meditation[] = []

      console.log(querySnapshot);

      querySnapshot?.forEach((doc) => {
        console.log(doc.data());
        meditations.push(doc.data() as Meditation);
      });

      setUserMeditations(meditations);
    }

    loadMeditations();
  }, []);

  const value = {
    userMeditations,
    addMeditation
  }

  return <MeditationContext.Provider value={value}>
    {children}
  </MeditationContext.Provider>
}

export const useMeditation = () => useContext(MeditationContext);