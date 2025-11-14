import React from "react";

const ContentLayout = ({ children }) => {
  return (
    <div className="flex-1 px-6 pb-10 mt-6 m-6">
      <div className="
        relative backdrop-blur-lg space-y-2 
        bg-white/10 border border-white/20 rounded-xl 
        p-5 shadow-lg hover:shadow-2xl hover:scale-101 
        transition-all duration-300 ease-in-out text-black 
      ">
        {children}
      </div>
    </div>
  );
};

export default ContentLayout;
