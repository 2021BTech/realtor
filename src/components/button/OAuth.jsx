import React from "react";
//icons
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <div>
      <button
        type="submit"
        className="flex items-center justify-center w-full bg-red text-white px-7 py-3 text-sm font-bold uppercase rounded shadow-md hover:bg-red transition duration-150 ease-in-out hover:shadow-lg active:bg-slate-800"
      >
        <FcGoogle className="text-2xl bg-white mr-2 rounded" />
        Continue with Google
      </button>
    </div>
  );
};

export default OAuth;
