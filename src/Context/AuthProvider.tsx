import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../firebase/firebase.init.ts";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

// google provider
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // use create a new user
  const createNewUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  //   sing in using google
  const signInWithGoogle = ()=>{
      setLoading(true)
      return signInWithPopup(auth, provider)
  }

  // to login user by
  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sing out user
  const singOutUser = ()=>{
    setLoading(true)
    return signOut(auth)
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createNewUser,
    signInWithGoogle, 
    loginUser,
    singOutUser
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
