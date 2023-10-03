import React from "react";
//image
import img from "../../assets/deal.png";
//Router
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  //location
  const location = useLocation();
  const [pageState, setPageState] = useState("Sign-In");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("profile");
      } else {
        setPageState("Sign-In");
      }
    });
  }, [auth]);
  function pathMatchRoute(Route) {
    if (Route === location.pathname) {
      return true;
    }
  }
  //navigate
  const navigate = useNavigate();

  return (
    <div className="bg-slate border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="flex space-x-2" onClick={() => navigate("/")}>
          <img src={img} alt="logo" className="h-12 cursor-pointer" />
          <span className="text-center py-3 font-bold text-white text-1xl cursor-pointer">
            Realtor
          </span>
        </div>
        <div>
          <ul className="flex space-x-10 text-white">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-grey border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-cream border-b-red"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-grey border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offers") && "text-cream border-b-red"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-grey border-b-[3px] border-b-transparent ${
                pathMatchRoute("/sign-In") ||
                (pathMatchRoute("/profile") && "text-cream border-b-red")
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
