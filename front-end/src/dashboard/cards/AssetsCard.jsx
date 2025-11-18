import {
  Archive,
  Clock,
  CreditCard,
  Delete,
  Package,
  Pencil,
  Tag,
  CheckCircle,
  XCircle,
  Wrench,
  Trash2,
  AlertTriangle,
  ThumbsUp,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";

const AssetsCard = ({ asset, handleDelete, handleEdit, handleActivate }) => {
  const {
    id,
    assetName,
    category,
    purchaseCost,
    purchaseDate,
    condition,
    age,
    depreciatedPrice,
    status,
    userInCharge,
  } = asset;
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.roles === "Admin";

  const conditionConfig = {
    New: { color: "bg-green-100 text-green-700", icon: CheckCircle },
    Good: { color: "bg-blue-100 text-blue-700", icon: ThumbsUp },
    Critical: { color: "bg-orange-100 text-orange-700", icon: AlertTriangle },
    Disposal: { color: "bg-red-100 text-red-700", icon: Trash2 },
  };

  const currentCondition = conditionConfig[condition] || conditionConfig.New;
  const ConditionIcon = currentCondition.icon;

  const statusConfig = {
    Pending: { color: "bg-blue-100 text-blue-700", icon: Clock },
    Deployed: { color: "bg-green-100 text-green-700", icon: CheckCircle },
    Inactive: { color: "bg-gray-100 text-gray-700", icon: XCircle },
    //Might use later
    /*Maintenance: { color: "bg-orange-100 text-orange-700", icon: Wrench },
    Retired: { color: "bg-red-100 text-red-700", icon: Archive },*/
  };

  const currentStatus = statusConfig[status] || statusConfig.Pending;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="relative backdrop-blur-lg space-y-2 bg-white/10 border border-white/20 rounded-xl p-5 shadow-lg hover:shadow-2xl hover:scale-101 transition-all duration-300 ease-in-out text-black overflow-hidden">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Package size={18} /> {assetName}
        </h3>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <>
              <Pencil
                className="text-blue-400 hover:text-blue-300 cursor-pointer transition"
                onClick={() => handleEdit(id)}
                size={28}
              />
              <Delete
                className="text-red-400 hover:text-red-300 cursor-pointer transition"
                onClick={() => handleDelete(id)}
                size={28}
              />
            </>
          ) : (
            <button
              className="flex items-center gap-2 text-gray-700"
              onClick={() => handleActivate(id)}
            >
              {status === "Deployed" ? (
                <ToggleRight
                  size={28}
                  className="text-green-500 transition-all"
                />
              ) : (
                <ToggleLeft size={28} className="text-gry-400 transition-all" />
              )}
            </button>
          )}
        </div>
      </div>

      <div className="relative flex z-10 text-sm gap-2">
        <p className="p-1 rounded-md px-3 font-semibold bg-gray-300 flex items-center gap-2">
          <Tag size={14} /> {category}
        </p>
        <p
          className={`p-1 rounded-md px-3 font-semibold bg-gray-300 flex items-center gap-2 ${currentCondition.color}`}
        >
          <ConditionIcon size={14} />
          {condition}
        </p>
        <p
          className={`p-1 rounded-md px-3 font-semibold bg-gray-300 flex items-center gap-2 ${currentStatus.color}`}
        >
          <StatusIcon size={14} />
          {status}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="mx-3 relative grid grid-cols-5 z-10 text-sm gap-2 space-y-1">
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <CreditCard size={12} /> <span>Purchase Cost</span>
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <Archive size={12} />
            <span> Depreciated Value</span>
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            <Clock size={12} />
            <span>Age</span>
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            User-In-Charge
          </p>
          <p className="p-1 font-semibold text-gray-500 flex items-center gap-2">
            Purchase Date
          </p>
        </div>
        <div className="mx-3 relative grid grid-cols-5 z-10 text-sm gap-2 space-y-1">
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            ₱ {purchaseCost}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            ₱ {depreciatedPrice}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {age < 1 ? `${age} year` : `${age} years`}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {userInCharge
              ? `${userInCharge.fullName} - ${userInCharge.department}`
              : "Unasigned"}
          </p>
          <p className="p-1 font-semibold text-black flex items-center gap-2">
            {purchaseDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetsCard;
