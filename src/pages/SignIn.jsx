import React from "react";
//img
import img from "../assets/sign.png";
//state
import { useState } from "react";
//icons
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
//link
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//component
import OAuth from "../components/button/OAuth";
//firebase
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }
  return (
    <section>
      <h1 className="text-4xl text-center mt-6 font-bold text-slate">
        Sign-In
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
                  to="/forgetPassword"
                  className="text-slate hover:text-slate transition duration-200 ease-in-out ml-2"
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
                Sign-in
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

export default SignIn;
