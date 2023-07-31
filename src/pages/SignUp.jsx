import React from "react";
//img
import img from "../assets/up.png";
//state
import { useState } from "react";
//icons
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
//link
import { Link } from "react-router-dom";
//component
import OAuth from "../components/button/OAuth";
//Auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  // onchange function
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  // onSubmit
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = {
        ...formData,
      };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
      toast.success("Sign Up Successful");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }
  return (
    <section>
      <h1 className="text-4xl text-center mt-6 font-bold text-slate">
        Sign Up
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
            <label> Name </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name"
              className="w-full mb-3 px-4 py-2 text-xl text-black bg-white border-slate rounded transition ease-in-out"
            />
            <label> Email </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
              className="w-full mb-3 px-4 py-2 text-xl text-black bg-white border-slate rounded transition ease-in-out"
            />
            <div className="relative mb-3">
              <label> Password </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-xl text-black bg-white border-slate rounded transition ease-in-out"
              />
              {/* icon password show */}
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-9 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-9 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>

            {/* forgot password & register link */}
            <div className="flex justify-between whitespace-nowrap text-sm">
              <p className="mb-6">
                Have an account?
                <Link
                  to="/signIn"
                  className="text-red hover:text-red transition duration-200 ease-in-out ml-1"
                >
                  Sign-In
                </Link>
              </p>
              <p>
                <Link
                  to="/forgetPassword"
                  className="text-slate hover:text-slate transition duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            {/* button link */}
            <div>
              <button
                type="submit"
                className="w-full bg-slate text-white px-7 py-3 text-sm font-bold uppercase rounded shadow-md hover:bg-slate transition duration-150 ease-in-out hover:shadow-lg active:bg-slate-800"
              >
                Sign Up
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

export default SignUp;
