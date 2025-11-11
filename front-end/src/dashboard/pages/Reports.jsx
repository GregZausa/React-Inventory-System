import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { TrendingDown, Package, FileChartColumn } from "lucide-react";

const Reports = () => {
  const navClassName = ({ isActive }) =>
    `flex items-center space-x-2 py-4 px-3 rounded-md transition font-bold ${
      isActive ? "bg-gray-200 scale-103" : "hover:shadow-2xl transition-all duration-300 ease-in-out "
    }`;
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 px-6 pt-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          {" "}
          Reports
        </h1>
        <div className="flex justify-between text-center items-center mt-6 pt-3">
          <h3 className="text-sm font-semibold text-gray-500">
            {" "}
            Generate and Export Asset Reports
          </h3>
        </div>
        <div className="flex-shrink-0 text-center mt-6">
          <div className="grid md:grid-cols-3 gap-2.5 border backdrop-blur-xl bg-white/10 p-2 border-white/5 rounded-xl shadow-lg text-black overflow-hidden">
            <NavLink to="depreciation" className={navClassName}>
              <TrendingDown size={20} />
              <span>Depreciation</span>
            </NavLink>
            <NavLink to="inventory" className={navClassName}>
              <Package size={20} />
              <span>Inventory</span>
            </NavLink>
            <NavLink to="lifecycle" className={navClassName}>
              <FileChartColumn size={20} />
              <span>Lifecycle</span>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Reports;
