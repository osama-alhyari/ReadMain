import { Link, Outlet } from "react-router-dom";
import UserAuth from "../pages/UserAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import BookCreate from "./BookCreate";

function NavBar() {
  const [tokenValidity, setTokenValidity] = useState(false);

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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
    window.location = "http://localhost:3000";
  };

  return (
    <div className="h-screen bg-gray-800">
      <nav className="justify-between flex items-stretch gap-8 bg-gray-900 text-white py-0 px-4">
        <Link reloadDocument to="/" className="text-4xl">
          ReadMain
        </Link>

        {tokenValidity ? (
          <ul className="flex list-none m-0 p-0 gap-12 ">
            <Link
              className="text-4xl flex items-center p-1 h-full hover:bg-gray-600 active:bg-gray-700"
              to="addbooks"
            >
              Add a Book
            </Link>
            <Link
              className="text-4xl flex items-center p-1 h-full hover:bg-gray-600 active:bg-gray-700"
              to="viewbooks"
            >
              View Books
            </Link>
          </ul>
        ) : null}
        {tokenValidity ? (
          <button
            onClick={handleLogout}
            className="text-4xl flex items-center p-1 h-full hover:bg-gray-600 active:bg-gray-700"
          >
            Log out
          </button>
        ) : null}
      </nav>
      <div id="detail">
        <Outlet />
      </div>

      {tokenValidity || window.location.pathname !== "/" ? null : <UserAuth />}
      {tokenValidity && window.location.pathname === "/" ? (
        <BookCreate />
      ) : null}
    </div>
  );
}

export default NavBar;
