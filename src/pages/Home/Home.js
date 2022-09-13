import React, { useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import CreatePost from "../../components/CreatePost";
import Modal from "react-modal";
import { AiOutlineCloseCircle } from "react-icons/ai";
import useUserAuth from "../../context/UserAuthContext";

const Home = () => {
  const { authUser } = useUserAuth();

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  

  return (
    <div
      className="bg-gradient-to-r from-rose-50 to-teal-50 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 flex-col min-h-[calc(100vh-65px)] justify-center items-center"
    >
      <h1 className="text-center text-black dark:text-white text-3xl font-bold mb-3">
        Hello! {authUser?.displayName}
      </h1>
      {/* Create Post Modal Button */}
      <div className="flex justify-center">
        <button className="btn-primary btn text-white" onClick={openModal}>
          Create Post
        </button>
        
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-gradient-to-r from-slate-50 to-gray-100  shadow-md dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-800 top-[50%] left-[50%] right-auto bottom-auto translate-x-[-50%] translate-y-[-50%] fixed p-5 rounded-md border-none outline-none"
        ariaHideApp={false}
        contentLabel="Create Post Modal"
      >
        <div className="flex justify-end mb-5">
          <button onClick={closeModal}>
            <AiOutlineCloseCircle className="text-black text-2xl dark:text-white" />{" "}
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
