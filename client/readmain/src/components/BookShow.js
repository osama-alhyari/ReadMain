import { Link } from "react-router-dom";

function BookShow({ book }) {
  return (
    <div className="border-4 border-gray-600 rounded-lg bg-gray-700 px-4 py-3 text-white max-h-[175px] relative">
      <div className="mb-4">
        <span className="font-bold">Book Name:</span> {book.name}
      </div>
      <div className="mb-4">
        <span className="font-bold">Language:</span> {book.language}
      </div>
      <div className="mb-4">
        <span className="font-bold">Number of Pages:</span> {book.numberOfPages}
      </div>
      <div className="mb-4">
        <span className="font-bold">Author :</span> {book.authorName}
      </div>
      <Link
        className="absolute bottom-12 right-4 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-full inline-block"
        to={`/author/${book.authorID}`}
      >
        View Author
      </Link>
      <Link
        className="absolute bottom-4 right-4 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-full inline-block"
        to={`/book/${book.id}`}
      >
        View Book
      </Link>
    </div>
  );
}

export default BookShow;
