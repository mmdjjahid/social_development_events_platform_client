import React, { useEffect, useState } from "react";
import { AuthContext } from "./CreateContext";
import { app } from "../Auth/firebase.config.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";


const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (userName, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoUrl,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : "");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const logOut = () => {
    setLoading(true);
    signOut(auth).finally(() => setLoading(false));
  };

  const resetPass = (email)=>{
    return sendPasswordResetEmail(auth,email)
  }


  const googleLogin = ()=>{
    return signInWithPopup(auth,googleProvider)
  }

  const value = {
    registerUser,
    user,
    logOut,
    loginUser,
    setUser,
    setLoading,
    loading,
    updateUser,
    googleLogin,
    resetPass,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
