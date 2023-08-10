import React from "react";
//img
import img from "../assets/fh.png";
//state
import { useState } from "react";
//link
import { Link } from "react-router-dom";
//component
import OAuth from "../components/button/OAuth";
//firebase
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  // onchange function
  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
    } catch (error) {
      toast.error("Could not send reset password");
    }
  }

  return (
    <section>
      <h1 className="text-4xl text-center mt-6 font-bold text-slate">
        Forgot Password
      </h1>
      {/* container */}
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        {/* img div */}
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img src={img} alt="key" className="w-full rounded-2xl" />
        </div>
        {/* form div */}
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
            <label> Email </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
              className="w-full mb-3 px-4 py-2 text-xl text-black bg-white border-slate rounded transition ease-in-out"
            />

            {/* forgot password & register link */}
            <div className="flex justify-between whitespace-nowrap text-sm">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/signUp"
                  className="text-red hover:text-red transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/signIn"
                  className="text-slate hover:text-slate transition duration-200 ease-in-out"
                >
                  Sign-In
                </Link>
              </p>
            </div>
            {/* button link */}
            <div>
              <button
                type="submit"
                className="w-full bg-slate text-white px-7 py-3 text-sm font-bold uppercase rounded shadow-md hover:bg-slate transition duration-150 ease-in-out hover:shadow-lg active:bg-slate-800"
              >
                Send reset Password
              </button>
            </div>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-black after:border-t after:flex-1  after:border-black">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
