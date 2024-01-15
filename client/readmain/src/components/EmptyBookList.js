import { Link } from "react-router-dom";

function EmptyBookList() {
  return (
    <div className="absolute left-1/4 top-1/2 right-1/4 w-1/2 h-1/3 text-center text-white text-4xl">
      No books available
      <Link
        className="mx-2 border rounded px-2 hover:bg-blue-900"
        to="../addbooks"
      >
        Add Books
      </Link>
      to the list to view them.
    </div>
  );
}
export default EmptyBookList;
