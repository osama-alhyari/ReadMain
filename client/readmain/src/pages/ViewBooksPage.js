import axios from "axios";
import BookList from "../components/BookList";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function ViewBooksPage() {
  const [books, setBooks] = useState([]);
  const [renderPage, setRenderPage] = useState(false); // to prevent showing page when token is invalid

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API}/books`, {
        headers,
      });
      if (response.data.books) {
        setBooks(response.data.books);
        setRenderPage(true);
      }
      if (response.data.invalidToken) {
        setRenderPage(false);
        /////////// here show dialog of timeout
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-900">
      {renderPage ? <BookList books={books} /> : null}
    </div>
  );
}
