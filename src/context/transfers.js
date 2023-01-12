import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";

export const TransferContext = createContext({
  historial: [],
  setHistorial: () => []
})

export const TransferProvider = ({children}) =>{
  const [historial, setHistorial] = useState([])
  const value = {historial, setHistorial}

  useEffect(() =>{
    onSnapshot(collection(db, 'transfers'), (querySnapshot) =>{
      const transfers = [];

      querySnapshot.docs.map((doc) =>{
        return transfers.push({...doc.data()})
      })

      setHistorial(transfers);
    })
  }, [])

  return <TransferContext.Provider value={value}>{children}</TransferContext.Provider>
}