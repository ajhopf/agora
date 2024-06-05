import React, { createContext, useContext, useEffect, useState } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import useDatabase from "../hooks/useDatabase";

interface MeditationContextProps {
  meditationDates?: MarkedDates,
  addMeditation: (date: Date) => void
}

interface MeditationProviderProps {
  children: React.ReactNode;
}

const MeditationContext = createContext<MeditationContextProps>({
  meditationDates: undefined,
  addMeditation: (date: Date) => {}
});

export const MeditationProvider: React.FC<MeditationProviderProps> = ({children}) => {
  const {fetchUserMeditations} = useDatabase();
  const [refetchMeditations, setRefetchMeditations] = useState(false);
  const [meditationDates, setMeditationDates] = useState<MarkedDates>()

  const addMeditation = (date: Date) => {
    setMeditationDates(prevState => ({
      ...prevState,
      [date.toISOString().slice(0, 10)]: { selected: true },
    }))
  }

  useEffect(() => {
    const setUserMeditations = async () => {
      const querySnapshot = await fetchUserMeditations();

      const newMarkedDates: MarkedDates = {};

      querySnapshot?.forEach((doc) => {
        const meditationDate = new Date(doc.data().date).toISOString().slice(0, 10);
        console.log(meditationDate);
        newMarkedDates[meditationDate] = {selected: true}
      });

      setMeditationDates(newMarkedDates);
    }

    setUserMeditations();
  }, []);

  const value = {
    meditationDates,
    addMeditation
  }

  return <MeditationContext.Provider value={value}>
    {children}
  </MeditationContext.Provider>
}

export const useMeditation = () => useContext(MeditationContext);