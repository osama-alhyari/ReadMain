import { Link, Outlet } from "react-router-dom";
import UserAuth from "../pages/UserAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeSignedIn from "./HomeSignedIn";

function NavBar() {
  const [tokenValidity, setTokenValidity] = useState(false);
  const [showHomeContent, setShowHomeContent] = useState(false); // this state is set to true after useEffect concludes. to show correct component only. without it the conditional rendering would show the invalid token component until the token is validated from the API
  const headers = {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
    admin: localStorage.getItem("admin"),
  };

  useEffect(async () => {
    if (headers.token && headers.id && headers.admin) {
      const response = await axios.get("http://localhost:8000/api/token", {
        headers,
      });
      if (response.data.validToken) {
        setTokenValidity(true);
      } else {
        setTokenValidity(false);
      }
    }
    setShowHomeContent(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
    window.location = "http://localhost:3000";
  };

  return (
    <div className="h-screen bg-gray-800">
      <nav className="justify-between flex items-stretch gap-8 bg-gray-900 text-white py-2 px-4">
        <Link reloadDocument to="/" className="text-4xl">
          ReadMain
        </Link>

        {tokenValidity ? (
          <ul className="flex list-none m-0 p-0 gap-12 ">
            <Link
              reloadDocument
              className="text-4xl flex items-center h-full hover:bg-gray-600 active:bg-gray-700"
              to="addbooks"
            >
              Add a Book
            </Link>
            <Link
              reloadDocument
              className="text-4xl flex items-center h-full hover:bg-gray-600 active:bg-gray-700"
              to="viewbooks"
            >
              View Books
            </Link>

            <button
              onClick={handleLogout}
              className="text-4xl flex items-center h-full hover:bg-gray-600 active:bg-gray-700"
            >
              Log out
            </button>
          </ul>
        ) : null}
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
