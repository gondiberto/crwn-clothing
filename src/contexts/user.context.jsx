import { createContext, useState, useEffect, useReducer } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_CURRENT_USER:
      return {
        // spread the previus state
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReduce`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

// as a hook, everytime it gets a new value the components listening to this will re-render

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user });
  };
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
