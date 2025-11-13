import React from "react";
import { useAssets } from "../hooks/useAssets";
import DashboardCard from "../cards/DashboardCard";
import { AlertTriangle, DollarSign, Package, TrendingDown } from "lucide-react";

const Home = () => {
  const { categoryCounts, conditionCounts, visibleAssets } = useAssets();

  const totalAssets = visibleAssets.length;

  const totalPurchase = visibleAssets.reduce(
    (sum, a) => sum + (Number(a.purchaseCost) || 0),
    0
  );
  const totalDepreciated = visibleAssets.reduce(
    (sum, a) => sum + (Number(a.depreciatedPrice) || 0),
    0
  );

  const avgDepreciation =
    totalPurchase > 0
      ? ((totalPurchase - totalDepreciated) / totalPurchase) * 100
      : 0;

  const criticalAssets = visibleAssets.filter(
    (a) => a.condition === "Disposal" || a.condition === "Critical"
  ).length;
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="flex-shrink-0 px-6 pt-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          {" "}
          Dashboard
        </h1>
        <div className="flex justify-between text-center items-center mt-6 pt-3">
          <h3 className="text-sm font-semibold text-gray-500">
            {" "}
            Overview of your Asset Inventory and Depreciation
          </h3>
        </div>
      </div>
      <div className="flex-shrink-0 px-6 mt-6 space-y-5">
        <div className="grid md:grid-cols-4 gap-6">
          <DashboardCard
            title={"Total Assets"}
            icon={Package}
            value={totalAssets}
            description={"Registered Items"}
            row={"1"}
          />
          <DashboardCard
            title={"Total Book Value"}
            icon={DollarSign}
            value={`₱ ${(totalDepreciated).toFixed(2)}`}
            description={"Current value of all Assets"}
            row={"1"}
          />
          <DashboardCard
            title={"Avg. Depreciation"}
            icon={TrendingDown}
            value={`${Number(avgDepreciation).toFixed(2)} %`}
            description={"Accross all Assets"}
            row={"1"}
          />
          <DashboardCard
            title={"Critical Assets"}
            icon={AlertTriangle}
            value={criticalAssets}
            description={"Need Attention"}
            row={"1"}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard
            title={"Assets by Category"}
            value={categoryCounts}
            row={"2"}
          />
          <DashboardCard
            title={"Assets by Condition"}
            value={conditionCounts}
            row={"2"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
