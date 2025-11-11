import React, { useCallback, useState, useEffect } from "react";

export const useAccounts = () => {
  const [accounts, setAccount] = useState(() => {
    const saved = localStorage.getItem("Accounts");
    return saved ? JSON.parse(saved) : [];
  });
  const addAccount = useCallback((newAccount) => {
    setAccount((prev) => {
      const updated = [...prev, newAccount];
      localStorage.setItem("Accounts", JSON.stringify(updated));
      return updated;
    });
  }, []);
  const deleteAccount = useCallback((id) => {
    setAccount((prev) => {
      const updated = prev.filter((account) => account.id !== id);
      localStorage.setItem("Accounts", JSON.stringify(updated));

      const currentUser = JSON.parse(localStorage.getItem("CurrentUser"));
      if (currentUser?.id === id) {
        localStorage.removeItem("CurrentUser");
      }
      return updated;
    });
  }, []);
  const editAccount = useCallback((id, updatedData) => {
    setAccount((prev) => {
      const updated = prev.map((account) =>
        account.id === id ? { ...account, ...updatedData } : account
      );
      localStorage.setItem("Accounts", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const filterRoleOptions = [
    { value: "All Roles", label: "All Roles" },
    ...[...new Set(accounts.map((a) => a.roles))].map((role) => ({
      value: role,
      label: role,
    })),
  ];

  const filterDepartmentOptions = [
    { value: "All Department", label: "All Department" },
    ...[...new Set(accounts.map((a) => a.department))].map((dept) => ({
      value: dept,
      label: dept,
    })),
  ];
  useEffect(() => {
    const saved = localStorage.getItem("Accounts");
    if (saved) setAccount(JSON.parse(saved));
  }, []);
  return {
    accounts,
    addAccount,
    deleteAccount,
    editAccount,
    filterRoleOptions,
    filterDepartmentOptions,
  };
};
