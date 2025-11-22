import React from "react";
import ContentLayout from "../../layouts/ContentLayout";
import { Download } from "lucide-react";
import useLifecycle from "../../hooks/useLifecycle";
import LifecycleCard from "../../cards/LifecycleCard";

const LifecyclePage = () => {
  const { visibleAssets } = useLifecycle();
  return (
    <div>
      <ContentLayout>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Lifecycle Report</h1>
          <button className="flex gap-x-2 bg-green-600 text-white hover:bg-green-500/75 cursor-pointer border rounded-md p-2">
            <Download size={20} />
            <span>Export to CSV</span>
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          Analyze asset depreciation, valuation changes, and lifecycle status.
        </span>
        <div className="grid grid-cols-3 gap-5"></div>
        <div className="flex-1 pb-10 mt-6 max-h-[415px] overflow-auto scrollbar-none">
          <div className="grid gap-4">
            {visibleAssets.length > 0 ? (
              visibleAssets
                .map((asset) => (
                  <LifecycleCard key={asset.id} asset={asset} type={"list"} />
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

export default LifecyclePage;
