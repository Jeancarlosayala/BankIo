import { collection, onSnapshot } from 'firebase/firestore';
import { useState, createContext, useEffect } from 'react';

import { createUserAuth, db, onAuthStateChangedListener } from '../utils/firebase';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userInfo: [],
  userInfoTransfer: [],
  setUserInfoTransfer: () => null
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoTransfer, setUserInfoTransfer] = useState([]);
  const value = { currentUser, setCurrentUser, userInfo, userInfoTransfer, setUserInfoTransfer }

  useEffect(() => {
    const unsuscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserAuth(user);

        onSnapshot(collection(db, 'users'), (querySnapshot) => {
          const docs = []
          querySnapshot.docs.map((doc) => {
            return docs.push({ ...doc.data() });
          })
          setUserInfo(docs.find(item => item.uid === user.uid));
          setUserInfoTransfer(docs)
        });
      }

      setCurrentUser(user);
    })

    return unsuscribe;
  }, [])


  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}