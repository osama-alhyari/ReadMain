import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import BookEdit from "../components/BookEdit";

function BookPage() {
  const [book, setBook] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [tags, setTags] = useState([]);
  const [renderPage, setRenderPage] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState({
    show: false,
    message: "",
  });

  const path = window.location.pathname.split("/");
  const id = +path[2];

  const headers = {
    token: localStorage.getItem("token"),
    id: localStorage.getItem("id"),
    admin: localStorage.getItem("admin"),
  };

  const getBook = useCallback(async () => {
    const response = await axios.get(`http://localhost:8000/api/books/${id}`, {
      headers,
    });
    if (response.data.book) {
      setBook(response.data.book);
      setRenderPage(true);
    }
    if (response.data.invalidToken) {
      setRenderPage(false);
      setShowAuthModal({
        show: true,
        message: "Session Timed Out, Please Login Again",
      });
    }
  }, []);

  const getTags = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:8000/api/booktags/tags/${id}`,
      {
        headers,
      }
    );
    if (response.data.tagList) {
      setTags(response.data.tagList);
      setRenderPage(true);
    }
    if (response.data.invalidToken) {
      setRenderPage(false);
      setShowAuthModal({
        show: true,
        message: "Session Timed Out, Please Login Again",
      });
    }
  }, []);

  useEffect(() => {
    getTags();
  }, [getTags]);

  useEffect(() => {
    getBook();
  }, [getBook]);

  if (tags.length === 0) setTags(["No Tags"]);

  const mappedTags = tags.map((tag) => {
    return <h1 className="text-3xl m-2 my-6">{tag}</h1>;
  });

  const deleteBook = async () => {
    await axios.delete(`http://localhost:8000/api/books/${id}`, {
      headers,
    });
    setShowDeleteModal(false);
    toast.warn(`The book ${book.name} has been deleted`, {
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
    const response = await axios.get(`http://localhost:8000/api/books/${id}`, {
      headers,
    });
    setBook(response.data.book);
  };

  const handleEditClick = () => {
    if (showEdit) {
      setShowEdit(false);
      return;
    }
    setShowEdit(true);
  };

  const handleDeleteButtonClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    window.location = "http://localhost:3000";
    localStorage.removeItem("token", "id", "admin");
  };

  let content = (
    <div className="inline-block w-2/3 h-2/3 text-center">
      <p className="text-6xl m-2">{book.name}</p>
      <p className="text-4xl m-2 my-12">Language : {book.language}</p>
      <p className="text-4xl m-2 my-12">Genre : {book.genre}</p>
      <p className="text-4xl m-2 my-12">
        Number of Pages : {book.numberOfPages}
      </p>
    </div>
  );

  if (showEdit) {
    content = (
      <div className="inline-block w-2/3 h-2/3 text-center">
        <BookEdit book={book} onEdit={editBook} onEditSave={handleEditClick} />
      </div>
    );
  }

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

  const deleteModal = (
    <Modal onClose={handleDeleteModalClose} actionBar={deleteActionBar}>
      <p className="text-3xl">Are you sure you want to delete this book?</p>
      <p className="text-3xl">Book ID : {id} </p>
      <p className="text-2xl">Book Name : {book.name} </p>
      <p className="text-xl">Book Language : {book.language} </p>
      <p className="text-xl">Genre : {book.genre} </p>
      <p className="text-xl">Number of Pages : {book.numberOfPages} </p>
    </Modal>
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

  const authModal = (
    <Modal onClose={handleAuthModalClose} actionBar={authActionBar}>
      <p className={"text-3xl"}>{showAuthModal.message}</p>
    </Modal>
  );

  return (
    <div>
      {renderPage ? (
        <div className=" h-screen border-4 bg-gray-900 text-white whitespace-nowrap">
          {content}
          <div className="inline-block  float-right w-1/3 h-2/3 text-center">
            <p className="text-6xl m-2">Tags</p>
            {mappedTags}
          </div>
          <div className=" w-full h-1/3">
            <button
              className="float-left bg-gray-700 hover:bg-gray-600 text-3xl py-2 px-6 my-24 ml-96 rounded-full"
              onClick={handleEditClick}
            >
              Edit Book
            </button>
            <button
              className="float-right bg-gray-700 hover:bg-gray-600 text-3xl p-2 my-24 mr-96 rounded-full"
              onClick={handleDeleteButtonClick}
            >
              Delete Book
            </button>
          </div>
        </div>
      ) : null}

      {showDeleteModal && deleteModal}
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
export default BookPage;
