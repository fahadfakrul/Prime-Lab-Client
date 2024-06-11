import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (name, photo) => {
    
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).finally(() => setLoading(false));
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = {email: currentUser.email}
        axiosPublic.post('/jwt', userInfo)
        .then((res) => {
           if(res.data.token){
            localStorage.setItem('access-token', res.data.token)
            setLoading(false)
           }
        }) 
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      
    });
    return () => {
      return unsubscribe;
    };
  }, [axiosPublic]);
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    setUser,
    updateUser,
    setLoading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
