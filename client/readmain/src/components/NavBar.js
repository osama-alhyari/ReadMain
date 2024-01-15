import { Link, Outlet } from "react-router-dom";
import UserAuth from "../pages/UserAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeSignedIn from "./HomeSignedIn";
import Search from "../pages/Search";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

function NavBar() {
  const [tokenValidity, setTokenValidity] = useState(false);
  const [showHomeContent, setShowHomeContent] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      // Assuming headers are defined somewhere in your code
      if (headers.token && headers.id) {
        const response = await axios.get(`${process.env.REACT_APP_API}/token`, {
          headers,
        });
        if (response.data.validToken) {
          setTokenValidity(true);
          if (response.data.isAdmin) {
            setAdmin(true);
          }
        } else {
          setTokenValidity(false);
        }
      }
      setShowHomeContent(true);
    };

    validateToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location = "http://localhost:3000";
  };

  return (
    <div className="h-screen bg-gray-800">
      <nav className="justify-between flex items-stretch gap-8 bg-gray-900 text-white py-2 px-4">
        <Link reloadDocument to="/" className="text-4xl flex items-center">
          ReadMain
        </Link>

        {tokenValidity ? (
          <div className="min-w-[650px]">
            {" "}
            {/* Use flex-grow to make the Search component take available space */}
            <Search /> {/* Include the Search component */}
          </div>
        ) : null}

        <ul className="flex list-none m-0 p-0 gap-12">
          {admin ? (
            <Link
              reloadDocument
              className="text-4xl flex items-center h-full hover:bg-gray-600 active:bg-gray-700"
              to="addbooks"
            >
              Admin
            </Link>
          ) : null}
          {tokenValidity ? (
            <button
              onClick={handleLogout}
              className="text-4xl flex items-center h-full hover:bg-gray-600 active:bg-gray-700"
            >
              Log out
            </button>
          ) : null}
        </ul>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
      {showHomeContent ? (
        <div>
          {tokenValidity || window.location.pathname !== "/" ? null : (
            <UserAuth />
          )}
          {tokenValidity && window.location.pathname === "/" ? (
            <HomeSignedIn />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default NavBar;
