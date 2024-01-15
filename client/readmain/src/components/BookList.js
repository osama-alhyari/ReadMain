import BookShow from "./BookShow.js";
import EmptyBookList from "./EmptyBookList.js";

export default function BookList({ books }) {
  let renderedBooks = [];
  if (books.length !== 0) {
    renderedBooks = books.map((book) => {
      return <BookShow key={book.id} book={book} />;
    });
  }

  return (
    <div>
      {renderedBooks.length === 0 ? (
        <EmptyBookList />
      ) : (
        <div className="grid grid-cols-3 gap-2 bg-gray-800 mt-3 mx-1">
          {renderedBooks}
        </div>
      )}
    </div>
  );
}

