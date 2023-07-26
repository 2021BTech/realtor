import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgetPassword from "./pages/ForgetPassword";
import Offers from "./pages/Offers";
//components
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
