import {
  Home,
  LogOut,
  Menu,
  Package,
  X,
  UsersRound,
  FileClock,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

const Sidebar = () => {
  const { currentUser, logout } = useAuth();

  const isAdmin = currentUser?.roles === "Admin";
  const [isOpen, setIsOpen] = useState(false);

  const navClassName = ({ isActive }) =>
    `flex items-center space-x-2 py-4 px-3 rounded-md transition font-bold ${
      isActive ? "bg-blue-500" : "hover:bg-gray-700"
    }`;
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md text-white focus:outline-none hover:bg-gray-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col p-4 space-y-6 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      >
        <h1 className="text-2xl font-bold text-center mb-4 mt-2">
          Asset Manager
        </h1>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" className={navClassName}>
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/assets" className={navClassName}>
            <Package size={20} />
            <span>Assets</span>
          </NavLink>
          {isAdmin && (
            <NavLink to="/accounts" className={navClassName}>
              <UsersRound size={20} />
              <span>Accounts</span>
            </NavLink>
          )}

          <NavLink to="/reports/depreciation" className={navClassName}>
            <FileClock size={20} />
            <span>Reports</span>
          </NavLink>
          <button
            onClick={logout}
            className="font-bold mt-auto flex items-center space-x-2 px-3 py-4 rounded-md bg-red-500 hover:bg-red-600 transition cursor-pointer"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
