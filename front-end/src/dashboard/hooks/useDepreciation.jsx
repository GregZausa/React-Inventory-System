import React from "react";
import { useAssets } from "./useAssets";

export const useDepreciation = () => {
  const { visibleAssets } = useAssets();
  const totalPurchase = visibleAssets.reduce(
    (sum, a) => sum + (Number(a.purchaseCost) || 0),
    0
  );

  const totalDepreciated = visibleAssets.reduce(
    (sum, a) => sum + (Number(a.depreciatedPrice) || 0),
    0
  );
  const totalDepreciation = totalPurchase - totalDepreciated;
  return { totalPurchase, totalDepreciated, totalDepreciation, visibleAssets };
};

export default useDepreciation;
