import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function AuthorPage() {
  const [author, setAuthor] = useState({});
  const [renderPage, setRenderPage] = useState(false);
  const id = +window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/author/getbookauthor`,
          {
            headers: { ...headers, authorID: +id },
          }
        );
        if (response.data.author) {
          setAuthor(response.data.author);
          setRenderPage(true);
        }
      } catch (error) {
        console.error("Error fetching author:", error);
      }
    };
    fetchAuthor();
  }, [id]);

  if (renderPage) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">{author.name}</h1>

        {author.born && <p className="mb-2">Date Born: {author.born}</p>}
        {author.died && <p className="mb-2">Date Died: {author.died}</p>}
        {author.influences && (
          <p className="mb-2">Influences: {author.influences}</p>
        )}
        {author.description && (
          <p className="mb-2">Bio: {author.description}</p>
        )}

        <Link
          to={`/authorbooks/${author.id}`}
          className="text-blue-500 hover:underline block mt-4"
        >
          View Books by {author.name}
        </Link>
      </div>
    );
  }

  return <div className="text-center mt-8">Loading...</div>; // or any other loading indicator
}
