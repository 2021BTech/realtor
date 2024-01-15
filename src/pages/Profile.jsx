import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
// img
import ProfileImg from "../assets/profile.png";
//component
import ListingItems from "../components/ListingItems/ListingItems";
//icons
import { FaList } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }
  return (
    <>
      <section className="max-w-4xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold text-white font-[Roboto} bg-slate p-4 rounded-full border-b-2 shadow-md shadow-slate flex items-center justify-center gap-4">
          <MdAccountCircle />
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
            className="w-full text-white uppercase px-7 py-3 text-sm font-md  hover:bg-slate transition duration-150 ease-in-out hover:shadow-lg active:bg-slate  bg-slate p-4 rounded-full shadow-md shadow-slate border-b-2"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red rounded-full p-1 border-2 " />
              Sell or Rent your home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="flex items-center justify-center gap-4 text-xl text-center text-white font-semibold mb-6  border-b-2 bg-slate p-4 rounded-full shadow-md shadow-slate">
              <FaList className="" />
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItems
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
