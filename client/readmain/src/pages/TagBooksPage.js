import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../components/BookList";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function TagBooksPage() {
  const [renderPage, setRenderPage] = useState(false); // to prevent showing page when token is invalid
  const [books, setBooks] = useState([]);
  const id = +window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/booktags/books/${id}`,
        { headers }
      );
      if (response.data.bookList) {
        setBooks(response.data.bookList);
        setRenderPage(true);
      }
      if (response.data.invalidToken) {
/////timeout 
        setRenderPage(false);
      }
    };
    fetchBooks();
  }, [id]);

  return (
    <div className="bg-gray-900">
      {renderPage ? (
        <BookList
          books={books}
        />
      ) : null}
    </div>
  );
}
