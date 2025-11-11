import React from "react";
import {
  Package,
  Pencil,
  Delete,
  Mail,
  KeyRound,
  User,
  Building,
} from "lucide-react";

const AccountsCard = ({ account, handleEdit, handleDelete }) => {
  const {
    id,
    lastName,
    firstName,
    emailAddress,
    userName,
    password,
    roles,
    department,
  } = account;
  return (
    <div className="relative backdrop-blur-lg space-y-2 bg-white/10 border border-white/20 rounded-xl p-5 shadow-lg hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-in-out text-black overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Package size={18} /> {`${firstName} ${lastName}`}
        </h3>

        <div className="flex items-center gap-3">
          <Pencil
            className="text-blue-400 hover:text-blue-300 cursor-pointer transition"
            onClick={() => handleEdit(id)}
            size={20}
          />
          <Delete
            className="text-red-400 hover:text-red-300 cursor-pointer transition"
            onClick={() => handleDelete(id)}
            size={20}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-3 relative grid grid-cols-5 z-10 text-sm gap-2 space-y-1">
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <Mail size={12} /> <span>Email Address</span>
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <User size={12} />
            <span> Username</span>
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <KeyRound size={12} />
            <span>Password</span>
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <User size={12} />
            <span>Role</span>
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <Building size={12} />
            <span>Department</span>
          </p>
        </div>
        <div className="mx-3 relative grid grid-cols-5 z-10 text-sm gap-2 space-y-1">
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {emailAddress}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {userName}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {"•".repeat(password.length)}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {roles === "Admin" ? "Admin" : "User"}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {department}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountsCard;
