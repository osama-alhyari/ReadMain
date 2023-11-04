import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewBooksPage from "./pages/ViewBooksPage";
import AddBooksPage from "./pages/AddBooksPage";
import BookPage from "./pages/BookPage";
import NavBar from "./components/NavBar";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/viewbooks",
        element: <ViewBooksPage />,
      },
      {
        path: "/addbooks",
        element: <AddBooksPage />,
      },
      {
        path: "/book/:bookid",
        element: <BookPage />,
      },
    ],
  },
]);
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(<RouterProvider router={Router} />);
