import { CircleX } from "lucide-react";
import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
    if(!isOpen) return null;
  return (
    <div className="fixed inset-0 p-4 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-2xl p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-red-500 hover:text-red-600 text-xl cursor-pointer"
        >
          <CircleX/>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
