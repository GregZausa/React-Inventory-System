import React from "react";

const ContentLayout = ({ children }) => {
  return (
    <div>
      <div className="flex-1 px-6 pb-10 mt-6 overflow-auto m-6 scrollbar-none">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative backdrop-blur-lg space-y-2 bg-white/10 border border-white/20 rounded-xl p-5 shadow-lg hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-in-out text-black overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentLayout;
