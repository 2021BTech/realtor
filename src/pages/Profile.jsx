import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
// img
import ProfileImg from "../assets/profile.png";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
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
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
          {/* img div */}
          <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
            <img
              src={ProfileImg}
              alt="Profile"
              className="w-full rounded-2xl"
            />
          </div>
          {/* form div */}
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
            <form>
              {/* name input */}
              <div>
                <label className="text-slate text-2xl text-bold">Name</label>
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
                <label className="text-slate text-2xl text-bold">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2 mb-4 text-xl text-slate bg-color-white border border-slate rounded transition ease-in-out"
                />
              </div>
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg md:text-sm mb-6 space-x-3">
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

          <button
            type="submit"
            className="w-full bg-slate text-white uppercase px-7 py-3 text-sm font-md rounded shadow-md hover:bg-slate transition duration-150 ease-in-out hover:shadow-lg active:bg-slate"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red rounded-full p-1 border-2" />
              Sell or Rent your home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
