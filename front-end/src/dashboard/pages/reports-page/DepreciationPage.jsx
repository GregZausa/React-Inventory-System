import React from "react";
import ContentLayout from "../../layouts/ContentLayout";

const DepreciationPage = () => {
  return (
    <div>
      <ContentLayout>
          <h1 className="font-bold text-2xl">Depreciation Report</h1>
          <span className="text-sm font-semibold text-gray-500">Asset depreciation analysis and book values</span>
      </ContentLayout>
    </div>
  );
};

export default DepreciationPage;
