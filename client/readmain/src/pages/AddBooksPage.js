import { useState, useEffect } from "react";
import BookCreate from "../components/BookCreate";
import axios from "axios";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

function AddBooksPage() {
  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API}/token`, {
        headers,
      });
      if (response.data.validToken) {
        setRenderPage(true);
      }
    };
    validateToken();
  }, []);

  return <div className="">{renderPage ? <BookCreate /> : null}</div>;
}

export default AddBooksPage;
