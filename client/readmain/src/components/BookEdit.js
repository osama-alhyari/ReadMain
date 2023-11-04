import { useState } from "react";

function BookEdit({ book, onEditSave, onEditButtonClick }) {
  const [bookState, setBookState] = useState({
    name: book.name,
    language: book.language,
    genre: book.genre,
    numberOfPages: book.numberOfPages,
  });



  const [errors, setErrors] = useState({});

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
      onEditSave(
        book.id,
        bookState
      );
      onEditButtonClick();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black space-x-2 my-12">
      <label className="text-white font-bold">Book Name :</label>
      <input
        className=""
        value={bookState.name}
        onChange={(e) => setBookState({ ...bookState, name: e.target.value })}
      />
      <br></br>
      {(errors.bookName && (
        <span className="text-white font-bold">{errors.bookName}</span>
      )) || <br></br>}
      <br></br>

      <label className="text-white font-bold">Language :</label>
      <input
        type="radio"
        id="english"
        name="language"
        value="English"
        checked={bookState.language === "English"}
        onChange={(e) =>
          setBookState({ ...bookState, language: e.target.value })
        }
      />
      <label className="text-white font-bold" for="english">
        English:
      </label>
      <input
        type="radio"
        id="arabic"
        name="language"
        value="Arabic"
        checked={bookState.language === "Arabic"}
        onChange={(e) =>
          setBookState({ ...bookState, language: e.target.value })
        }
      />
      <label className="text-white font-bold" for="arabic">
        Arabic:
      </label>
      <input
        type="radio"
        id="french"
        name="language"
        value="French"
        checked={bookState.language === "French"}
        onChange={(e) =>
          setBookState({ ...bookState, language: e.target.value })
        }
      />
      <label className="text-white font-bold" for="french">
        French:
      </label>
      <br></br>
      {(errors.language && (
        <span className="text-white font-bold">{errors.language}</span>
      )) || <br></br>}
      <br></br>

      <label className="text-white font-bold">Genre :</label>
      <input
        className=""
        value={bookState.genre}
        onChange={(e) => setBookState({ ...bookState, genre: e.target.value })}
      />
      <br></br>
      {(errors.genre && (
        <span className="text-white font-bold">{errors.genre}</span>
      )) || <br></br>}
      <br></br>

      <label className="text-white font-bold">Number Of Pages :</label>
      <input
        className=""
        type="number"
        value={bookState.numberOfPages}
        onChange={(e) =>
          setBookState({ ...bookState, numberOfPages: e.target.value })
        }
      />
      <br></br>
      {(errors.numberOfPages && (
        <span className="text-white font-bold">{errors.numberOfPages}</span>
      )) || <br></br>}
      <br></br>

      <button className="px-2 text-2xl text-white bg-gray-700 hover:bg-gray-600 rounded-full">
        Save
      </button>
    </form>
  );
}

export default BookEdit;
