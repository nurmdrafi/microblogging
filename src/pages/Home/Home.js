import React, { useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import CreatePost from "../../components/CreatePost";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useUserAuth } from "../../context/UserAuthContext";

const Home = () => {
  const { userAuth } = useUserAuth();
  console.log(userAuth);
  // Modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="bg-gradient-to-r from-rose-50 to-teal-50 flex-col min-h-[calc(100vh-65px)] justify-center items-center">
      {/* Create Post Modal Button */}
      <div className="flex justify-center">
        <button className="btn-primary btn text-white" onClick={openModal}>
          Create Post
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Create Post Modal"
      >
        <div className="flex justify-end mb-5">
          <button onClick={closeModal}>
            <AiOutlineCloseCircle className="text-black text-2xl" />{" "}
          </button>
        </div>
        <CreatePost closeModal={closeModal} />
      </Modal>
      <div>
        <ArticleList />
      </div>
    </div>
  );
};

export default Home;
