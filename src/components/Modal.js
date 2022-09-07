import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ children }) => {
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
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Modal"
    >
      <div className="flex justify-end mb-5">
        <button onClick={closeModal}>
          <AiOutlineCloseCircle className="text-black text-2xl" />
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default Modal;
