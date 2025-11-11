import React from "react";

const SubmitButton = ({ label, onClick, disabled, className }) => {
  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`border rounded-md w-full p-2 cursor-pointer transition text-white ${
          disabled
            ? "bg-gray-400 cursor-not-allowed "
            : "bg-blue-700 hover:bg-blue-800"
        }`}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
