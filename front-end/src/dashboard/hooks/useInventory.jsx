import React from "react";
import { useAssets } from "./useAssets";

export const useInventory = () => {
  const { visibleAssets } = useAssets();

  const totalAssets = visibleAssets.length;

  const totalActiveAssets = visibleAssets.filter(
    (a) => a.status === "Deployed"
  ).length;

  const totalOnStockAssets = visibleAssets.filter(
    (a) => a.status === "On-Stock"
  ).length;

  const totalInactiveAssets = visibleAssets.filter(
    (a) => a.status === "Inactive"
  ).length;

  const totalCriticalAssets = visibleAssets.filter(
    (a) => a.condition === "Critical" || a.condition === "Disposal"
  ).length;

  const totalPurchase = visibleAssets.reduce(
    (sum, a) => sum + (Number(a.purchaseCost) || 0),
    0
  );
  return {
    totalAssets,
    totalActiveAssets,
    totalPurchase,
    totalOnStockAssets,
    totalInactiveAssets,
    totalCriticalAssets,
    visibleAssets,
  };
};

export default useInventory;
