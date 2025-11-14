import React from "react";
import ContentLayout from "../../layouts/ContentLayout";
import { Download } from "lucide-react";
import useDepreciation from "../../hooks/useDepreciation";
import DepreciationCard from "../../cards/DepreciationCard";

const DepreciationPage = () => {
  const { totalPurchase, totalDepreciated, totalDepreciation, visibleAssets } =
    useDepreciation();

  const exportToCSV = () => {
    if (!visibleAssets) return;

    const csvRows = [];

    csvRows.push(["Total Purchase Cost", totalPurchase.toFixed(2)]);
    csvRows.push(["Total Book Value", totalDepreciated.toFixed(2)]);
    csvRows.push(["Total Depreciation", totalDepreciation.toFixed(2)]);
    csvRows.push([]);

    const headers = [
      "Asset Name",
      "Category",
      "Purchase Cost",
      "Accumulated Depreciation",
      "Book Value",
      "Depreciation Rate (%)",
      "Status",
    ];
    csvRows.push(headers);

    visibleAssets.forEach((asset) => {
      const accumulatedDep = asset.purchaseCost - asset.depreciatedPrice;
      const depRate = (accumulatedDep / asset.purchaseCost) * 100;

      csvRows.push([
        asset.assetName,
        asset.category,
        asset.purchaseCost,
        accumulatedDep.toFixed(2),
        asset.depreciatedPrice,
        depRate.toFixed(2),
        asset.status,
      ]);
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvRows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "depreciation_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <ContentLayout>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl">Depreciation Report</h1>
          <button
            onClick={exportToCSV}
            className="flex gap-x-2 bg-green-600 text-white hover:bg-green-500/75 cursor-pointer border rounded-md p-2"
          >
            <Download size={20} />
            <span>Export to CSV</span>
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          Asset depreciation analysis and book values
        </span>

        <div className="grid grid-cols-3 gap-5">
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
            title={"Total Depreciation"}
            value={totalDepreciation}
            type={"card"}
          />
        </div>
        <div className="flex-1 pb-10 mt-6 max-h-[415px] overflow-auto scrollbar-none">
          <div className="grid gap-4">
            {visibleAssets.length > 0 ? (
              visibleAssets
                .map((asset) => (
                  <DepreciationCard
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

export default DepreciationPage;
