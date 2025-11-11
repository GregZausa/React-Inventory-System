import React, { useState } from "react";
import { Calendar } from "lucide-react";

const DateInput = ({
  value,
  onChange,
  label = "",
  placeholder = "Select date",
  required = false,
  disabled = false,
  min,
  max,
  className = "",
  error = "",
}) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max || today}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full px-4 py-2 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          } ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DateInput;