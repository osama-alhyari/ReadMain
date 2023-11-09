import { Link } from "react-router-dom";
import BookEdit from "./BookEdit";

function BookShow({ book, onDelete, onEditSave, showEdit, setShowEdit }) {
  const handleDelete = () => {
    onDelete(book.id, book.name, book.language, book.genre, book.numberOfPages);
  };

  const handleEditClick = () => {
    if (+showEdit === book.id) {
      setShowEdit("");
      return;
    }
    setShowEdit(book.id);
  };

  return (
    <div className="border-4 border-gray-600 rounded-lg bg-gray-700 px-2 text-white">
      {+showEdit === book.id ? (
        <BookEdit
          book={book}
          onEditButtonClick={handleEditClick}
          onEditSave={onEditSave}
        />
      ) : (
        <div className="relative top-3">
          <span className="font-bold">Book Name : </span> {book.name}
          <br></br>
          <span className="font-bold">Language : </span> {book.language}
          <br></br>
          <span className="font-bold">Genre : </span> {book.genre}
          <br></br>
          <span className="font-bold">Number of Pages :</span>{" "}
          {book.numberOfPages}
          <br></br>
        </div>
      )}

      <button
        className="px-4 float-right relative -left-1 bottom-4 bg-gray-800 hover:bg-gray-900 rounded-full"
        onClick={handleEditClick}
      >
        Edit Book
      </button>
      <button
        className="px-2 float-right relative left-24 bottom-12 bg-gray-800 hover:bg-gray-900 rounded-full"
        onClick={handleDelete}
      >
        Delete Book
      </button>
      <Link
        className="px-2 float-right relative inset-x-48 bottom-20 bg-gray-800 hover:bg-gray-900 rounded-full"
        to={`/book/${book.id}`}
      >
        View Book
      </Link>
    </div>
  );
}

export default BookShow;
