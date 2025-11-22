import { Package } from "lucide-react";
import React from "react";

const LifecycleCard = ({ title, type, value, asset }) => {
  if (type === "card") {
    return (
      <div className="relative backdrop-blur-lg space-y-4 bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
        <h3 className="text-lg font-semibold text-gray-500 pb-2">{title}</h3>
        <div className="text-xl font-bold absolute bottom-2">{value}</div>
      </div>
    );
  }
  if (type === "list") {
    const {
      assetName,
      age,
      usefulLife,
      category,
      purchaseCost,
      depreciatedPrice,
      condition,
      purchaseDate,
    } = asset;

    const remainingUsefulLife = Math.max(0, usefulLife - age);
    return (
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 space-y-2.5 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
        <div className="flex justify-between">
          {" "}
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Package size={18} /> {assetName}
          </h3>
        </div>
      </div>
    );
  }
};

export default LifecycleCard;
