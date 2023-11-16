import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookCreate() {
  const [bookState, setBookState] = useState({
    name: "",
    language: "",
    genre: "",
    numberOfPages: "",
    tagsString: "",
  });

  const [errors, setErrors] = useState({});

  const createBook = async (
    name,
    language,
    genre,
    numberOfPages,
    tagsString
  ) => {
    await axios.post("http://localhost:8000/api/books", {
      headers: {
        token: localStorage.getItem("token"),
        id: localStorage.getItem("id"),
        admin: localStorage.getItem("id"),
      },

      name,
      language,
      genre,
      numberOfPages,
      tagsString,
    });
    setBookState({
      name: "",
      language: "",
      genre: "",
      numberOfPages: "",
      tagsString: "",
    });
    setErrors({});
    toast.success(`The book ${name} has been added successfully`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (bookState.name.length < 3)
      validationErrors.bookName = "Book name should be atleast 3 letters long";
    if (!bookState.language)
      validationErrors.language = "Please select a language";
    if (!bookState.genre) validationErrors.genre = "Please type in a genre";
    if (+bookState.numberOfPages < 49 || +bookState.numberOfPages > 1000)
      validationErrors.numberOfPages =
        "number of pages should be between 50 and 1000";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      createBook(
        bookState.name,
        bookState.language,
        bookState.genre,
        bookState.numberOfPages,
        bookState.tagsString
      );
    }
  };

  return (
    <div className="bg-gray-800 grid h-screen place-items-center text-white">
      <label className="text-center font-bold text-4xl">Add A New Book</label>
      <div className="border-4 p-2">
        <form className="bg-gray-700">
          <label for="name" className="mx-2 my-4 font-bold">
            Name:
          </label>
          <input
            id="name"
            className="border-2 my-4 text-black"
            value={bookState.name}
            onChange={(e) => {
              setBookState({ ...bookState, name: e.target.value });
            }}
          />
          <br></br>
          {errors.bookName && <span>{errors.bookName}</span>}
          <br></br>
          <label className="mx-2 my-4 font-bold">Language:</label>
          <label className="mx-2 my-4" for="english">
            English
          </label>
          <input
            className="my-4"
            type="radio"
            id="english"
            name="language"
            value="English"
            onChange={(e) => {
              setBookState({ ...bookState, language: e.target.value });
            }}
          />
          <label className="mx-2 my-4" for="arabic">
            Arabic
          </label>
          <input
            className="px-2 my-4"
            type="radio"
            id="arabic"
            name="language"
            value="Arabic"
            onChange={(e) => {
              setBookState({ ...bookState, language: e.target.value });
            }}
          />
          <label className="mx-2 my-4" for="french">
            French
          </label>
          <input
            className="px-2 my-4"
            type="radio"
            id="french"
            name="language"
            value="French"
            onChange={(e) => {
              setBookState({ ...bookState, language: e.target.value });
            }}
          />
          <br></br>
          {errors.language && <span>{errors.language}</span>}
          <br></br>
          <label className="mx-2 my-4 font-bold" for="genre">
            Genre:
          </label>
          <input
            id="genre"
            className="border-2 my-4 text-black"
            value={bookState.genre}
            onChange={(e) => {
              setBookState({ ...bookState, genre: e.target.value });
            }}
          />
          <br></br>
          {errors.genre && <span>{errors.genre}</span>}
          <br></br>
          <label className="mx-2 my-4 font-bold" for="numberOfPages">
            Number Of Pages:
          </label>
          <input
            id="numberOfPages"
            className="border-2 my-4 text-black"
            type="number"
            // min={50}
            // max={1000}
            value={bookState.numberOfPages}
            onChange={(e) => {
              setBookState({ ...bookState, numberOfPages: e.target.value });
            }}
          />
          <br></br>
          {errors.numberOfPages && <span>{errors.numberOfPages}</span>}
          <br></br>
          <label for="tags" className="mx-2 my-4 font-bold">
            Tags : (Seperate different tags with a comma ",")
          </label>
          <br></br>
          <textarea
            id="tags"
            className="border-2 mx-2 text-black"
            cols={50}
            rows={4}
            value={bookState.tagsString}
            onChange={(e) => {
              setBookState({ ...bookState, tagsString: e.target.value });
            }}
          />
          <br></br>
          <div className="text-center">
            <button
              id="addbutton"
              onClick={handleSubmit}
              className="mx-2 w-32 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full my-2"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default BookCreate;
