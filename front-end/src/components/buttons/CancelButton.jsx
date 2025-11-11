import React from "react";

const CancelButton = ({ label, onClick, disabled, className }) => {
  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`border border-gray-300 rounded-md w-full p-2 cursor-pointer transition ${
          disabled
            ? "bg-gray-400 cursor-not-allowed "
            : "bg-white hover:bg-gray-300"
        }`}
      >
        {label}
      </button>
    </div>
  );
};

export default CancelButton;
