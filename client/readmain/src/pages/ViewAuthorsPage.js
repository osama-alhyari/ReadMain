import axios from "axios";
import { useEffect, useState } from "react";
import AuthorList from "../components/AuthorList.js";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function ViewAuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [renderPage, setRenderPage] = useState(false); // to prevent showing page when token is invalid

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/author/getauthors`,
        {
          headers,
        }
      );
      if (response.data.authors) {
        setAuthors(response.data.authors);
        setRenderPage(true);
      }
      if (response.data.invalidToken) {
        setRenderPage(false);
        /////////// here show dialog of timeout
      }
    };
    fetchAuthors();
  }, []);

  return (
    <div className="bg-gray-900">
      {renderPage ? <AuthorList authors={authors} /> : null}
    </div>
  );
}
