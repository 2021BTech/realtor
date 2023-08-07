import React from "react";
//icons
import { FcGoogle } from "react-icons/fc";
//import from firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
//navigate
import { useNavigate } from "react-router";

const OAuth = () => {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      // check for users

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Could not authorize with Google");
      console.log(error);
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={onGoogleClick}
        className="flex items-center justify-center w-full bg-red text-white px-7 py-3 text-sm font-bold uppercase rounded shadow-md hover:bg-red transition duration-150 ease-in-out hover:shadow-lg active:bg-slate-800"
      >
        <FcGoogle className="text-2xl bg-white mr-2 rounded" />
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
