import React from "react";
import ContentLayout from "../../layouts/ContentLayout";
import { CardSim, Download } from "lucide-react";
import InventoryCard from "../../cards/InventoryCard";
import useInventory from "../../hooks/useInventory";

const InventoryPage = () => {
  const {
    totalAssets,
    totalActiveAssets,
    totalPurchase,
    totalCriticalAssets,
    totalInactiveAssets,
    totalOnStockAssets,
    visibleAssets,
  } = useInventory();
  return (
    <div>
      <ContentLayout>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Inventory Report</h1>
          <button className="flex gap-x-2 bg-green-600 text-white hover:bg-green-500/75 cursor-pointer border rounded-md p-2">
            <Download size={20} />
            <span>Export to CSV</span>
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          Asset depreciation analysis and book values
        </span>
        <div className="grid grid-cols-3 gap-5">
          <InventoryCard
            title={"Total Number of Assets"}
            value={totalAssets}
            type={"card"}
          />
          <InventoryCard
            title={"Total Number of Deployed Assets"}
            value={totalActiveAssets}
            type={"card"}
          />
          <InventoryCard
            title={"Total Purchase Cost"}
            value={`₱ ${Number(totalPurchase).toFixed(2)}`}
            type={"card"}
          />
          <InventoryCard
            title={"Total On-Stock Assets"}
            value={totalOnStockAssets}
            type={"card"}
          />
          <InventoryCard
            title={"Total Inactive Assets"}
            value={totalInactiveAssets}
            type={"card"}
          />
          <InventoryCard
            title={"Total Critical Assets"}
            value={totalCriticalAssets}
            type={"card"}
          />
        </div>
        <div className="flex-1 pb-10 mt-6 max-h-[415px] overflow-auto scrollbar-none">
          <div className="grid gap-4">
            {visibleAssets.length > 0 ? (
              visibleAssets
                .map((asset) => (
                  <InventoryCard
                    key={asset.id}
                    asset={asset}
                    type={"list"}
                  />
                ))
                .reverse()
            ) : (
              <p className="font-semibold text-xl text-gray-500 italic col-span-full text-center py-10">
                No current added asset
              </p>
            )}
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};

export default InventoryPage;
