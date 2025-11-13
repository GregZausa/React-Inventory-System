import React from "react";
import ContentLayout from "../../layouts/ContentLayout";
import { Download } from "lucide-react";
import useDepreciation from "../../hooks/useDepreciation";
import DepreciationCard from "../../cards/DepreciationCard";

const DepreciationPage = () => {
  const { totalPurchase, totalDepreciated, totalDepreciation } =
    useDepreciation();

  return (
    <div>
      <ContentLayout>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Depreciation Report</h1>
          <button className="flex gap-x-2 bg-green-600 text-white hover:bg-green-500/75 cursor-pointer border rounded-md p-2">
            <Download size={20} />
            <span>Export to CSV</span>
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          Asset depreciation analysis and book values
        </span>

        <div className="grid grid-cols-3">
          <DepreciationCard
            title={"Total Purchase Cost"}
            value={totalPurchase}
            type={"card"}
          />
          <DepreciationCard
            title={"Total Book Value"}
            value={totalDepreciated}
            type={"card"}
          />
          <DepreciationCard
            title={"Total Purchase Cost"}
            value={totalDepreciation}
            type={"card"}
          />
        </div>
      </ContentLayout>
    </div>
  );
};

export default DepreciationPage;
