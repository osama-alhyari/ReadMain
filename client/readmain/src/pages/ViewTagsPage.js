import axios from "axios";
import { useEffect, useState } from "react";
import TagList from "../components/TagList.js";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function ViewTagsPage() {
  const [tags, setTags] = useState([]);
  const [renderPage, setRenderPage] = useState(false); // to prevent showing page when token is invalid

  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/tags`,
        {
          headers,
        }
      );
      if (response.data.tags) {
        setTags(response.data.tags);
        setRenderPage(true);
      }
      if (response.data.invalidToken) {
        setRenderPage(false);
        /////////// here show dialog of timeout
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="bg-gray-900">
      {renderPage ? <TagList tags={tags} /> : null}
    </div>
  );
}
