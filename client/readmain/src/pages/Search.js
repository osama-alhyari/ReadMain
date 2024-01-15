import axios from "axios";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Search() {
  const [suggest, setSuggest] = useState([]);
  const [nameTyped, setNameTyped] = useState("");

  const handleKeyUp = async (text) => {
    try {
      const users = await axios.get(
        `${process.env.REACT_APP_API}/users/getsuggestions`,
        { headers: { text } }
      );
      const userSuggestions = users.data.users.map((user) => ({
        ...user,
        type: "user",
      }));

      const books = await axios.get(
        `${process.env.REACT_APP_API}/books/getsuggestions`,
        { headers: { text } }
      );
      const bookSuggestions = books.data.books.map((book) => ({
        ...book,
        type: "book",
      }));

      const suggestions = [...userSuggestions, ...bookSuggestions];
      setSuggest(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <div className="relative">
      <div className="bg-gray-300 max-w-[610px] p-4 flex items-center space-x-2 border rounded-md shadow-md relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <TextField
          sx={{ width: 510 }}
          value={nameTyped}
          id="filled"
          label="Search Authors, Books, or Users "
          variant="filled"
          onChange={(e) => setNameTyped(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e.target.value)}
        />
      </div>
      {suggest.length > 0 && (
        <div className="absolute top-full left-0 w-[610px] bg-white border border-gray-300 rounded-b-md shadow-md z-50">
          {suggest.map((suggestion, index) => (
            <div
              key={index}
              onClick={(e) => {
                window.location = `http://localhost:3000/${suggestion.type}/${suggestion.id}`;
              }}
              className="px-4 py-2 border-b last:border-b-0 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.type === "user" ? (
                <span className="text-black">{`${suggestion.name} - user ${suggestion.id}`}</span>
              ) : (
                <span className="text-black">{`${suggestion.name} - book ${suggestion.id}`}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
