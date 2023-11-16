import { useState, useEffect } from "react";
import BookCreate from "../components/BookCreate";
import axios from "axios";
import Modal from "../components/Modal";

const headers = {
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
  admin: localStorage.getItem("admin"),
};

function AddBooksPage() {
  const [showAuthModal, setShowAuthModal] = useState({
    show: false,
    message: "",
  });

  const [renderPage, setRenderPage] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const response = await axios.get("http://localhost:8000/api/token", {
        headers,
      });
      if (response.data.validToken) {
        setRenderPage(true);
      } else {
        setShowAuthModal({
          show: true,
          message: "Session Timed Out, Please Login Again",
        });
      }
    };
    validateToken();
  }, []);

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    window.location = "http://localhost:3000";
    localStorage.removeItem("token", "id", "admin");
  };

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
    <div className="">
      {renderPage ? <BookCreate /> : null}
      {showAuthModal.show && authModal}
    </div>
  );
}

export default AddBooksPage;
