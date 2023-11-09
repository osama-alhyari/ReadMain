import { useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

function EmptyBookList() {
  const [showEmptyBooksModal, setShowEmptyBooksModal] = useState(true);

  const handleEmptyBooksModalClose = () => setShowEmptyBooksModal(false);

  const emptyBookActionBar = (
    <div>
      <Link
        className="w-32 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full text-center"
        to="../addbooks"
      >
        Add Books
      </Link>
      <button
        className="mx-2 w-32 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleEmptyBooksModalClose}
      >
        Back
      </button>
    </div>
  );

  const emptyBooksModal = (
    <Modal onClose={handleEmptyBooksModalClose} actionBar={emptyBookActionBar}>
      <p className="text-3xl">
        No books available. Please add books to the list to view them
      </p>
    </Modal>
  );

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
      {showEmptyBooksModal && emptyBooksModal}
    </div>
  );
}
export default EmptyBookList;
