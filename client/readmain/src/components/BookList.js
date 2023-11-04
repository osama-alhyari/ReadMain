import BookShow from "./BookShow.js";
import { useState } from "react";

function BookList({ books, onEditSave, onDelete }) {
  const [showEdit, setShowEdit] = useState("");

  let renderedBooks = books
    .filter((book) => +book.isAvailable === 1)
    .map((book) => {
      return (
        <BookShow
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEditSave={onEditSave}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
        />
      );
    });

  if (renderedBooks.length === 0) {
    renderedBooks = (
      <div className="text-white">no books please add a book</div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-2 bg-gray-900 h-screen">
      {renderedBooks}
    </div>
  );
}

export default BookList;
