import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState("false");
  const [formDate, setFormDate] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formDate;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormDate((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update the name in the fire store
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile Details Updated");
    } catch (error) {
      toast.error("Couldn't update the profile details");
    }
  }
  return (
    <>
      <section className="max-w-4xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold text-slate">
          My Account
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3 ">
          <form>
            {/* name input */}
            <div>
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                disabled={!changeDetail}
                onChange={onChange}
                className={`w-full px-4 py-2 mb-4 text-xl text-slate bg-color-white border border-slate rounded transition ease-in-out ${
                  changeDetail && "bg-red focus:bg-red"
                }`}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="w-full px-4 py-2 mb-4 text-xl text-slate bg-color-white border border-slate rounded transition ease-in-out"
              />
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg md:text-sm mb-6">
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red hover:text-slate transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue hover:text-slate transition ease-in-out duration-200 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
