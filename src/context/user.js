import { collection, onSnapshot } from 'firebase/firestore';
import { useState, createContext, useEffect } from 'react';

import { createUserAuth, db, onAuthStateChangedListener } from '../utils/firebase';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userInfo: {}
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const value = { currentUser, setCurrentUser, userInfo }

  useEffect(() => {
    const unsuscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserAuth(user);

        // const categoryMap = await getUserInformation();

        onSnapshot(collection(db, 'users'), (querySnapshot) => {
          const docs = []
          querySnapshot.docs.map((doc) => {
            return docs.push({ ...doc.data() });
          })
          setUserInfo(docs.filter(item => item.uid === user.uid)[0]);
        });
      }

      setCurrentUser(user);
    })

    return unsuscribe;
  }, [])


  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}