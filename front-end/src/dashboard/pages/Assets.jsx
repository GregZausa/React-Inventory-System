import { PackagePlus } from "lucide-react";
import React, { useState } from "react";
import Modal from "../components/Modal";
import AddAssetForm from "../components/forms/AddAssetForm";
import toast from "react-hot-toast";
import { useAssets } from "../hooks/useAssets";
import AssetsCard from "../cards/AssetsCard";
import TextInput from "../../components/input-box/TextInput";
import SelectBox from "../../components/select-box/SelectBox";
import { useAccounts } from "../hooks/useAccounts";
import { useAuth } from "../../auth/context/AuthContext";

const Assets = () => {
  const { accounts } = useAccounts();
  const { currentUser } = useAuth();
  const {
    addAsset,
    deleteAsset,
    editAsset,
    filterCategoryOptions,
    filterConditionOptions,
    filterDepartmentOptions,
    filterActiveOptions,
    visibleAssets,
    activateAsset,
  } = useAssets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [category, setCategory] = useState("");
  const [userInCharge, setUserInCharge] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseCost, setPurchaseCost] = useState("");
  const [description, setDescription] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [usefulLife, setUsefulLife] = useState("");
  const [editingAsset, setEditingAsset] = useState(null);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = currentUser?.roles === "Admin";

  const categoryOptions = [
    { value: "Computer", label: "Computer" },
    { value: "PSU", label: "PSU" },
    { value: "Motherboard", label: "Motherboard" },
    { value: "UPS", label: "UPS" },
    { value: "AVR", label: "AVR" },
    { value: "Mouse", label: "Mouse" },
    { value: "Keyboard", label: "Keyboard" },
    { value: "Webcam", label: "Webcam" },
    { value: "Headset", label: "Headset" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
    setCategory("");
  };
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
    setEditingAsset(null);
  };

  const resetForm = () => {
    setAssetName("");
    setCategory("");
    setUserInCharge("");
    setPurchaseDate("");
    setPurchaseCost("");
    setSupplierName("");
    setUsefulLife("");
    setDescription("");
  };

  const handleSubmit = () => {
    const selectedUser = regularUser.find((u) => u.id === userInCharge);
    if (editingAsset) {
      editAsset(editingAsset.id, {
        assetName,
        category,
        userInCharge: selectedUser
          ? {
              id: selectedUser.id,
              fullName: `${selectedUser.firstName} ${selectedUser.lastName}`,
              role: selectedUser.roles,
              emailAddress: selectedUser.emailAddress,
              department: selectedUser.department,
            }
          : null,
        purchaseDate,
        purchaseCost,
        description,
        supplierName,
        usefulLife,
      });
      toast.success("Asset updated successfully!");
    } else {
      const newAsset = {
        assetName,
        category,
        userInCharge: selectedUser
          ? {
              id: selectedUser.id,
              fullName: `${selectedUser.firstName} ${selectedUser.lastName}`,
              role: selectedUser.roles,
              emailAddress: selectedUser.emailAddress,
              department: selectedUser.department,
            }
          : null,
        purchaseDate,
        purchaseCost,
        description,
        supplierName,
        usefulLife,
        condition: "New",
        status: "On-Stock",
        age: 0,
        depreciatedPrice: 0,
        id: crypto.randomUUID(),
      };
      addAsset(newAsset);
      toast.success("Asset added successfully!");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    deleteAsset(id);
    toast.success("Asset deleted successfully!");
  };

  const handleActivate = (id) => {
    activateAsset(id);
  }

  const handleEdit = (id) => {
    const assetToEdit = visibleAssets.find((a) => a.id === id);
    setEditingAsset(assetToEdit);
    setIsModalOpen(true);
    setAssetName(assetToEdit.assetName);
    setCategory(assetToEdit.category);
    setUserInCharge(assetToEdit.userInCharge.id);
    setPurchaseDate(assetToEdit.purchaseDate);
    setPurchaseCost(assetToEdit.purchaseCost);
    setSupplierName(assetToEdit.supplierName);
    setUsefulLife(assetToEdit.usefulLife);
    setDescription(assetToEdit.description);
  };

  const filteredAssets = visibleAssets.filter((asset) => {
    const matchesSearch = asset.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filterCategory || filterCategory === "All Categories"
        ? true
        : asset.category === filterCategory;

    const matchesCondition =
      !filterCondition || filterCondition === "All Conditions"
        ? true
        : asset.condition === filterCondition;

    const matchesDepartment =
      !filterDepartment || filterDepartment === "All Departments"
        ? true
        : asset.userInCharge.department === filterDepartment;

    const matchesActive = !filterActive || filterActive === "All"
    ? true
    :asset.status === filterActive;

    return (
      matchesSearch && matchesCategory && matchesCondition && matchesDepartment && matchesActive
    );
  });

  const regularUser = accounts.filter((user) => user.roles !== "Admin");

  const userOptions = regularUser.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName} - ${user.department}`,
    data: {
      fullName: `${user.firstName} ${user.lastName} `,
      role: user.roles,
      emailAddress: user.emailAddress,
      department: user.department,
    },
  }));

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 px-6 pt-6">
        <h1 className="text-3xl font-bold text-center md:text-left"> Assets</h1>
        <div className="flex justify-between text-center items-center mt-6">
          <h3 className="text-sm font-semibold text-gray-500">
            {" "}
            Manage your Inventory and Equipment
          </h3>
          {isAdmin && (
            <button
              className="flex gap-x-2 bg-blue-500/80 text-white hover:bg-blue-600 cursor-pointer border rounded-md p-2"
              onClick={openModal}
            >
              <PackagePlus size={20} />
              <span>Add Assets</span>
            </button>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 px-6 mt-6">
        <div className="grid md:grid-cols-2 gap-2.5">
          <TextInput
            placeholder="Search assets..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 mt-2.5 md:mt-0 gap-x-2.5">
            <SelectBox
              options={filterCategoryOptions}
              value={filterCategory}
              onChange={setFilterCategory}
              placeholder="All Categories"
            />
            <SelectBox
              options={filterConditionOptions}
              value={filterCondition}
              onChange={setFilterCondition}
              placeholder="All Conditions"
            />
            <SelectBox
              options={filterDepartmentOptions}
              value={filterDepartment}
              onChange={setFilterDepartment}
              placeholder="All Department"
            />
            <SelectBox
              options={filterActiveOptions}
              value={filterActive}
              onChange={setFilterActive}
              placeholder="All"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 px-6 pb-10 mt-6 overflow-auto m-6 scrollbar-none">
        <div className="grid gap-4">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <AssetsCard
                key={asset.id}
                asset={asset}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleActivate={handleActivate}
              />
            )).reverse()
          ) : (
            <p className="font-semibold text-xl text-gray-500 italic col-span-full text-center py-10">
              {searchTerm || filterCategory || filterCondition
                ? "No assets match your filter"
                : "No assets added yet."}
            </p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingAsset ? "Edit Asset" : "Add New Asset"}
      >
        <AddAssetForm
          assetName={assetName}
          setAssetName={setAssetName}
          category={category}
          setCategory={setCategory}
          userOptions={userOptions}
          userInCharge={userInCharge}
          setUserInCharge={setUserInCharge}
          categoryOptions={categoryOptions}
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
          purchaseCost={purchaseCost}
          setPurchaseCost={setPurchaseCost}
          description={description}
          setDescription={setDescription}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          supplierName={supplierName}
          setSupplierName={setSupplierName}
          usefulLife={usefulLife}
          setUsefulLife={setUsefulLife}
          isEditing={!!editingAsset}
        />
      </Modal>
    </div>
  );
};

export default Assets;
