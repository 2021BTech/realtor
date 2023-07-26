import React from "react";
//image
import img from "../../assets/house.png";
//Router
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  //location
  const location = useLocation();
  const pathMathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  //navigate
  const navigate = useNavigate();

  return (
    <div className="bg-slate border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div className="flex space-x-2" onClick={() => navigate("/")}>
          <img src={img} alt="" className="h-12 cursor-pointer" />
          <span className="text-center text-white text-4xl cursor-pointer">
            {" "}
            Realtor{" "}
          </span>
        </div>
        <div>
          <ul className="flex space-x-10 text-white">
            <li
              className={`py-3 text-sm text-grey border-b-[3px] border-b-transparent ${
                pathMathRoute("/") && "text-cream border-b-cream"
              }`}
            >
              <a href="/">Home</a>
            </li>
            <li
              className={`py-3 text-sm text-grey border-b-[3px] border-b-transparent ${
                pathMathRoute("/offers") && "text-cream border-b-cream"
              }`}
            >
              <a href="/offers">Offers</a>
            </li>
            <li
              className={`py-3 text-sm text-grey border-b-[3px] border-b-transparent ${
                pathMathRoute("/signIn") && "text-cream border-b-cream"
              }`}
            >
              <a href="/signIn">Sing-In</a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
