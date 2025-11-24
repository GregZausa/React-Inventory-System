import React from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Archive,
  Wrench,
  Package,
  ThumbsUp,
  AlertTriangle,
  Trash2,
} from "lucide-react";

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
      status,
    } = asset;

    const statusConfig = {
      Pending: { color: "bg-blue-100 text-blue-700", icon: Clock },
      Deployed: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      Inactive: { color: "bg-gray-100 text-gray-700", icon: XCircle },
      Maintenance: { color: "bg-orange-100 text-orange-700", icon: Wrench },
      Retired: { color: "bg-red-100 text-red-700", icon: Archive },
    };

    const currentStatus = statusConfig[status] || statusConfig.Pending;

    const conditionConfig = {
      New: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      Good: { color: "bg-blue-100 text-blue-700", icon: ThumbsUp },
      Critical: { color: "bg-orange-100 text-orange-700", icon: AlertTriangle },
      Disposal: { color: "bg-red-100 text-red-700", icon: Trash2 },
    };

    const currentCondition = conditionConfig[condition] || conditionConfig.New;

    const remainingUsefulLife = Math.max(0, usefulLife - age);
    return (
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 space-y-2.5 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
        <div className="flex justify-between">
          {" "}
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Package size={18} /> {assetName}
          </h3>{" "}
          <div className="flex justify-between gap-2.5">
            <p
              className={`p-1 rounded-md px-3 font-semibold bg-gray-300 flex items-center gap-2 ${currentStatus.color}`}
            >
              {status}
            </p>
            <p
              className={`p-1 rounded-md px-3 font-semibold bg-gray-300 flex items-center gap-2 ${currentCondition.color}`}
            >
              {condition}
            </p>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-500">{category}</p>
        <div className="grid grid-cols-3 gap-5">
          <p className="text-sm font-semibold text-gray-500">Purchase Cost</p>
          <p className="text-sm font-semibold text-gray-500">Purchase Date</p>
          <p className="text-sm font-semibold text-gray-500">
            Depreciated Price
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <p className="text-lg font-bold">
            {" "}
            ₱{Number(purchaseCost).toFixed(2)}
          </p>
          <p className="text-lg font-bold">{purchaseDate}</p>
          <p className="text-lg font-bold">{depreciatedPrice}</p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <p className="text-sm font-semibold text-gray-500">Asset Age</p>
          <p className="text-sm font-semibold text-gray-500">Useful Life</p>
          <p className="text-sm font-semibold text-gray-500">
            Remaining Useful Life
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <p className="text-lg font-bold">
            {age < 1 ? `${age} year old` : `${age} years old`}
          </p>
          <p className="text-lg font-bold">
            {usefulLife < 1 ? `${usefulLife} year` : `${usefulLife} years`}
          </p>
          <p className="text-lg font-bold">
            {remainingUsefulLife < 1
              ? `${remainingUsefulLife} year`
              : `${remainingUsefulLife} years`}
          </p>
        </div>
      </div>
    );
  }
};

export default LifecycleCard;
