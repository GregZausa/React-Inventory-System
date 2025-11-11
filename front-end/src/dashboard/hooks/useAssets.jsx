import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";

export const useAssets = () => {
  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem("Assets");
    return saved ? JSON.parse(saved) : [];
  });

  const { currentUser } = useAuth();

  const visibleAssets =
    currentUser?.roles === "Admin"
      ? assets
      : currentUser
      ? assets.filter((a) => a.userInCharge.id === currentUser.id)
      : [];

  const checkConditions = useCallback((assetList) => {
    return assetList.map((asset) => {
      let condition = "New";
      const now = new Date();
      const purchaseDate = new Date(asset.purchaseDate);
      const lifespan = Number(asset.usefulLife) || 1;

      let monthsPassed =
        (now.getFullYear() - purchaseDate.getFullYear()) * 12 +
        (now.getMonth() - purchaseDate.getMonth());
      if (now.getDate() < purchaseDate.getDate()) monthsPassed -= 1;
      if (monthsPassed < 0) monthsPassed = 0;

      const purchaseCost = Number(asset.purchaseCost) || 0;
      const lifespanMonths = lifespan * 12;
      const monthlyDepreciation = purchaseCost / lifespanMonths;
      const depreciatedPrice = Math.max(
        purchaseCost - monthlyDepreciation * monthsPassed,
        0
      );

      const age = Number((monthsPassed / 12).toFixed(2));
      const yearsPassed = monthsPassed / 12;
      if (yearsPassed >= lifespan) {
        condition = "Disposal";
        asset.status = "Inactive";
      } else if (yearsPassed >= lifespan * 0.75) condition = "Critical";
      else if (yearsPassed >= lifespan * 0.25) condition = "Good";

      return {
        ...asset,
        condition,
        age,
        depreciatedPrice: Number(depreciatedPrice.toFixed(2)),
      };
    });
  }, []);
  const addAsset = useCallback(
    (newAsset) => {
      setAssets((prev) => {
        const updated = [...prev, newAsset];
        const checked = checkConditions(updated);
        localStorage.setItem("Assets", JSON.stringify(checked));
        return checked;
      });
    },
    [checkConditions]
  );

  const deleteAsset = useCallback(
    (id) => {
      setAssets((prev) => {
        const updated = prev.filter((asset) => asset.id !== id);
        const checked = checkConditions(updated);
        localStorage.setItem("Assets", JSON.stringify(checked));
        return checked;
      });
    },
    [checkConditions]
  );

  const editAsset = useCallback(
    (id, updatedData) => {
      setAssets((prev) => {
        const updated = prev.map((asset) =>
          asset.id === id ? { ...asset, ...updatedData } : asset
        );
        const checked = checkConditions(updated);
        localStorage.setItem("Assets", JSON.stringify(checked));
        return checked;
      });
    },
    [checkConditions]
  );

  const activateAsset = useCallback((id) => {
    setAssets((prev) => {
      const updated = prev.map((asset) => {
        if (asset.id === id) {
          if (asset.condition === "Disposal") return asset;
          return {
            ...asset,
            status: asset.status === "Deployed" ? "Inactive" : "Deployed",
          };
        }
        return asset;
      });
      localStorage.setItem("Assets", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const filterCategoryOptions = [
    { value: "All Categories", label: "All Categories" },
    ...[...new Set(visibleAssets.map((a) => a.category))].map((cat) => ({
      value: cat,
      label: cat,
    })),
  ];

  const filterConditionOptions = [
    { value: "All Conditions", label: "All Conditions" },
    ...[...new Set(visibleAssets.map((a) => a.condition))].map((cat) => ({
      value: cat,
      label: cat,
    })),
  ];

  const filterDepartmentOptions = [
    { value: "All Departments", label: "All Departments" },
    ...[...new Set(visibleAssets.map((a) => a.userInCharge.department))].map(
      (cat) => ({
        value: cat,
        label: cat,
      })
    ),
  ];

  const filterActiveOptions = [
    { value: "All", label: "All" },
    ...[...new Set(visibleAssets.map((a) => a.status))].map((stat) => ({
      value: stat,
      label: stat,
    })),
  ];

  const categoryCounts = visibleAssets.reduce((acc, asset) => {
    const cat = asset.category || "Uncategorized";
    if (!acc[cat]) acc[cat] = 0;
    acc[cat] += 1;
    return acc;
  }, {});

  const conditionCounts = visibleAssets.reduce((acc, asset) => {
    const con = asset.condition || "No condition";
    if (!acc[con]) acc[con] = 0;
    acc[con] += 1;
    return acc;
  }, {});

  useEffect(() => {
    const saved = localStorage.getItem("Assets");
    if (saved) setAssets(checkConditions(JSON.parse(saved)));
  }, [checkConditions]);
  return {
    assets,
    visibleAssets,
    addAsset,
    deleteAsset,
    editAsset,
    filterCategoryOptions,
    filterConditionOptions,
    filterDepartmentOptions,
    filterActiveOptions,
    categoryCounts,
    conditionCounts,
    activateAsset,
  };
};
