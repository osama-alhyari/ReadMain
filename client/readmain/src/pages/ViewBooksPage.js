import axios from "axios";
import BookList from "../components/BookList";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  admin: localStorage.getItem("admin"),
};

function ViewBooksPage() {
  const [books, setBooks] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState({
    id: "",
    name: "",
    language: "",
    genre: "",
    numberOfPages: "",
    show: false,
  });
  const [showAuthModal, setShowAuthModal] = useState({
    show: false,
    message: "",
  });

  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get("http://localhost:8000/api/books", {
        headers,
      });
      if (response.data.books) {
        setBooks(response.data.books);
        setRenderPage(true);
      }
      if (response.data.invalidToken) {
        setRenderPage(false);
        setShowAuthModal({
          show: true,
          message: "Session Timed Out, Please Login Again",
        });
      }
    };
    fetchBooks();
  }, []);

  const deleteBook = async () => {
    await axios.delete(
      `http://localhost:8000/api/books/${showDeleteModal.id}`,
      {
        headers,
      }
    );
    const newBooks = books.filter(
      (oldBooks) => oldBooks.id !== showDeleteModal.id
    );
    setBooks(newBooks);
    setShowDeleteModal({ ...showDeleteModal, show: false });
    toast.warn(`The book ${showDeleteModal.name} has been deleted`, {
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

  const editBook = async (id, bookObject) => {
    await axios.patch(`http://localhost:8000/api/books/${id}`, {
      headers,
      bookObject,
    });
    const response = await axios.get("http://localhost:8000/api/books", {
      headers,
    });
    setBooks(response.data.books);
  };

  const handleDeleteButtonClick = (
    id,
    name,
    language,
    genre,
    numberOfPages
  ) => {
    setShowDeleteModal({
      id,
      name,
      language,
      genre,
      numberOfPages,
      show: true,
    });
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal({ ...showDeleteModal, show: false });
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    window.location = "http://localhost:3000";
    localStorage.removeItem("token", "id", "admin");
  };

  const deleteActionBar = (
    <div>
      <button
        className="w-32 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={deleteBook}
      >
        Delete Book
      </button>
      <button
        className="mx-2 w-32 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleDeleteModalClose}
      >
        Back
      </button>
    </div>
  );

  const authActionBar = (
    <div>
      <button
        className="mx-2 w-32 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleAuthModalClose}
      >
        Back
      </button>
    </div>
  );

  const deleteModal = (
    <Modal onClose={handleDeleteModalClose} actionBar={deleteActionBar}>
      <p className="text-3xl">Are you sure you want to delete this book?</p>
      <p className="text-3xl">Book ID : {showDeleteModal.id} </p>
      <p className="text-2xl">Book Name : {showDeleteModal.name} </p>
      <p className="text-xl">Book Language : {showDeleteModal.language} </p>
      <p className="text-xl">Genre : {showDeleteModal.genre} </p>
      <p className="text-xl">
        Number of Pages : {showDeleteModal.numberOfPages}{" "}
      </p>
    </Modal>
  );

  const authModal = (
    <Modal onClose={handleAuthModalClose} actionBar={authActionBar}>
      <p className={"text-3xl"}>{showAuthModal.message}</p>
    </Modal>
  );

  return (
    <div className="bg-gray-900">
      {renderPage ? (
        <BookList
          books={books}
          onDelete={handleDeleteButtonClick}
          onEditSave={editBook}
        />
      ) : null}

      {showDeleteModal.show && deleteModal}
      {showAuthModal.show && authModal}
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

export default ViewBooksPage;
