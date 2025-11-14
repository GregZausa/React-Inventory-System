import React from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Wrench,
  Archive,
} from "lucide-react";

const DepreciationCard = ({ title, value, type, asset }) => {
  if (type === "card") {
    return (
      <div className="relative backdrop-blur-lg space-y-4 bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />
        <h3 className="text-lg font-semibold text-gray-500 pb-2">{title}</h3>
        <div className="text-xl font-bold absolute bottom-2">
          ₱ {Number(value).toFixed(2)}
        </div>
      </div>
    );
  }

  if (type === "list") {
    const {
      assetName,
      category,
      purchaseCost,
      depreciatedPrice,
      status,
    } = asset;

    const accumulatedDep = purchaseCost - depreciatedPrice

    const depreciatedRate = (accumulatedDep / purchaseCost) * 100

    const statusConfig = {
      Pending: { color: "bg-blue-100 text-blue-700", icon: Clock },
      Deployed: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      Inactive: { color: "bg-gray-100 text-gray-700", icon: XCircle },
      Maintenance: { color: "bg-orange-100 text-orange-700", icon: Wrench },
      Retired: { color: "bg-red-100 text-red-700", icon: Archive },
    };

    const currentStatus = statusConfig[status] || statusConfig.Pending;

    return (
      <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 space-y-2.5 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 ease-in-out text-black overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />

        <div className="flex justify-between">
          {" "}
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Package size={18} /> {assetName}
          </h3>{" "}
          <p
            className={`p-1 rounded-md px-3 font-semibold bg-gray-300 flex items-center gap-2 ${currentStatus.color}`}
          >
            {status}
          </p>
        </div>
        <p className="text-sm font-semibold text-gray-500">{category}</p>

        <div className="grid grid-cols-4 gap-5">
          <p className="text-sm font-semibold text-gray-500">Purchase Cost</p>
          <p className="text-sm font-semibold text-gray-500">
            Accumulated Dep.
          </p>
          <p className="text-sm font-semibold text-gray-500">Book Value</p>
          <p className="text-sm font-semibold text-gray-500">Dep. Rate</p>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <p className="text-lg font-bold">₱ {purchaseCost}</p>
          <p className="text-lg font-bold">₱ {(Number(accumulatedDep).toFixed(2))}</p>
          <p className="text-lg font-bold">₱ {depreciatedPrice}</p>
          <p className="text-lg font-bold">{(Number(depreciatedRate.toFixed(2)))} %</p>
        </div>
      </div>
    );
  }

  return null;
};

export default DepreciationCard;
