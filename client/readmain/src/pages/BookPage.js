import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export default function BookPage() {
  const [book, setBook] = useState({});
  const [tags, setTags] = useState([]);
  const [renderPage, setRenderPage] = useState(false);
  const [value, setValue] = useState(0);
  const [rated, setRated] = useState(false);
  const [rating, setRating] = useState(0);
  const path = window.location.pathname.split("/");
  const id = +path[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagsResponse, bookResponse, rateResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API}/booktags/tags/${id}`, {
            headers,
          }),
          axios.get(`${process.env.REACT_APP_API}/books/${id}`, { headers }),
          axios.get(`${process.env.REACT_APP_API}/ratebook`, {
            headers: { userID: headers.id, bookID: id },
          }),
        ]);

        if (tagsResponse.data.tagList && bookResponse.data.book) {
          setTags(tagsResponse.data.tagList);
          setBook(bookResponse.data.book);
          setValue(bookResponse.data.book.rating);
          setRenderPage(true);
        }

        if (rateResponse.data.rated) {
          setRated(true);
          setRating(rateResponse.data.rated);
        } else {
          setRated(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, show message to the user, etc.
      }
    };

    fetchData();
  }, [id]);

  if (tags.length === 0) setTags(["No Tags"]);

  const mappedTags = tags.map((tag) => (
    <Link key={tag.id} className="mr-2" to={`/tag/${tag.id}`}>
      {tag.name}
    </Link>
  ));

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      {renderPage && (
        <div className="max-w-4xl p-8 border-4">
          <p className="text-4xl mb-4">{book.name}</p>
          <p className="text-2xl my-4">Language: {book.language}</p>
          <p className="text-2xl my-4">Number of Pages: {book.numberOfPages}</p>
          <p className="text-2xl my-4">
            Author:{" "}
            <span
              className="hover:cursor-pointer"
              onClick={(e) => {
                window.location = `http://localhost:3000/author/${book.authorID}`;
              }}
            >
              {book.authorName}
            </span>
          </p>

          <div className="my-4">
            <Typography component="legend">Book Rating</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              precision={0.5}
              readOnly
            />
          </div>

          <p className="text-2xl my-4">
            Number of Ratings: {book.numberOfRatings}
          </p>

          <div className="my-4">
            <Typography component="legend">
              {rated ? "Book Rated" : "Rate This Book"}
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              precision={1}
              onChange={async (event, newValue) => {
                setRated(true);
                const response = await axios.post(
                  "http://localhost:8000/api/ratebook",
                  {
                    rate: newValue,
                    userID: headers.id,
                    bookID: id,
                  }
                );

                setValue(response.data.newRating);

                if (!rated) {
                  setBook({
                    ...book,
                    numberOfRatings: +book.numberOfRatings + 1,
                  });
                }

                if (newValue !== 0) {
                  setRating(newValue);
                }
              }}
            />
          </div>

          <div className="flex flex-col items-start">
            <p className="text-3xl mt-8">Tags:</p>
            <div className="flex">{mappedTags}</div>
          </div>
        </div>
      )}
    </div>
  );
}
