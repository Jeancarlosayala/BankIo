import { useState, createContext, useEffect } from 'react';

import { createUserAuth, onAuthStateChangedListener } from '../utils/firebase';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({children}) =>{
  const [currentUser, setCurrentUser] = useState(null);
  const value = {currentUser, setCurrentUser}

  useEffect(() =>{
    const unsuscribe = onAuthStateChangedListener((user) =>{
      if (user) {
        createUserAuth(user)
      }

      setCurrentUser(user)
    })

    return unsuscribe;
  }, [currentUser, setCurrentUser, value])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}