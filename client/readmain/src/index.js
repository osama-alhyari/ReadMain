import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewBooksPage from "./pages/ViewBooksPage";
import AddBooksPage from "./pages/AddBooksPage";
import BookPage from "./pages/BookPage";
import NavBar from "./components/NavBar";
import TagPage from "./pages/TagPage";
import MyProfile from "./pages/MyProfile";
import Search from "./pages/Search";
import ViewAuthorsPage from "./pages/ViewAuthorsPage";
import ViewTagsPage from "./pages/ViewTagsPage";
import AuthorPage from "./pages/AuthorPage";
import AuthorBooksPage from "./pages/AuthorBooksPage";
import TagBooksPage from "./pages/TagBooksPage";

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
      { path: "/author/:authorid", element: <AuthorPage /> },
      {
        path: "/tag/:tagid",
        element: <TagPage />,
      },
      {
        path: "/myprofile",
        element: <MyProfile />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/authors",
        element: <ViewAuthorsPage />,
      },
      { path: "/tags", element: <ViewTagsPage /> },
      { path: "/authorbooks/:authorid", element: <AuthorBooksPage /> },
      { path: "/booksintag/:tagid", element: <TagBooksPage /> },
    ],
  },
]);
const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

root.render(<RouterProvider router={Router} />);
