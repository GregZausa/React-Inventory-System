import React from 'react'

const InventoryCard = ({title, type, value, asset}) => {
  if (type === "card") {
    return (
      <div className="relative backdrop-blur-lg space-y-4 bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
        <h3 className="text-lg font-semibold text-gray-500 pb-2">{title}</h3>
        <div className="text-xl font-bold absolute bottom-2">
          {value}
        </div>
      </div>
    );
  }
}

export default InventoryCard
