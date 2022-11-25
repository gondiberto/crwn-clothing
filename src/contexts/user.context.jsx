import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// as a hook, everytime it gets a new value the components listening to this will re-render
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // centralizing the authentication in this listener (hooks)
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
