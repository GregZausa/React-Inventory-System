import React from "react";

const DashboardCard = ({ title, icon: Icon, value, description, row }) => {
  return (
    <div className="relative backdrop-blur-lg space-y-4 bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
      {row === "1" && (
        <>
          <h3 className="text-lg font-semibold flex items-center justify-between gap-2">
            <span>{title}</span> {Icon && <Icon size={18} />}
          </h3>
          <div className="text-xl font-bold">{value}</div>
          <div className="text-sm text-gray-600 font-semibold">
            {description}
          </div>
        </>
      )}
      {row === "2" && (
        <>
          <h1 className="text-xl font-bold flex items-center">{title}</h1>
          <div className="mt-2 space-y-2 overflow-auto max-h-44 scrollbar-none">
            {value &&
              Object.entries(value).map(([category, count]) => (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <p className="text-sm font-semibold text-gray-700">
                    {category}
                  </p>
                  <p className=" p-1 px-3 text-sm font-semibold text-black bg-gray-300">
                    {count}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCard;
