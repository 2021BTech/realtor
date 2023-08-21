import { getAuth } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formDate, setFormDate] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formDate;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  return (
    <>
      <section className="max-w-4xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold"> My Account </h1>
        <div className="w-full md:w-[50%] mt-6 px-3 ">
          <form>
            {/* name input */}
            <div>
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                disabled
                className="w-full px-4 py-2 mb-4 text-xl text-slate bg-color-white border border-slate rounded transition ease-in-out"
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
                <span className="text-red hover:text-slate transition ease-in-out duration-200 ml-1 cursor-pointer">
                  Edit
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
