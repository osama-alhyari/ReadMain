import axios from "axios";
import { useEffect, useState } from "react";
import BookList from "../components/BookList";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function AuthorBooksPage() {
  const [books, setBooks] = useState({});
  const [renderPage, setRenderPage] = useState(false); // to prevent showing page when token is invalid
  const id = +window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/books/getauthorbooks`,
        {
          headers: { ...headers, authorid: id },
        }
      );
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
  }, [id]);

  return (
    <div className="bg-gray-900">
      {renderPage ? <BookList books={books} /> : null}
    </div>
  );
}
