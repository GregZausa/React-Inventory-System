import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import Modal from "../components/Modal";
import AddAccountForm from "../components/forms/AddAccountForm";
import toast from "react-hot-toast";
import { useAccounts } from "../hooks/useAccounts";
import AccountsCard from "../cards/AccountsCard";
import TextInput from "../../components/input-box/TextInput";
import SelectBox from "../../components/select-box/SelectBox";

const Accounts = () => {
  const {
    accounts,
    addAccount,
    deleteAccount,
    editAccount,
    filterRoleOptions,
    filterDepartmentOptions,
  } = useAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState("");
  const [department, setDepartment] = useState("");
  const [editingAccount, setEditingAccount] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRoles, setFilterRoles] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "User", label: "User" },
  ];

  const departmentOptions = [
    { value: "I.T. Department", label: "I.T. Department" },
    { value: "Educ Department", label: "Educ Department" },
    { value: "Law Department", label: "Law Department" },
    { value: "Tourism Department", label: "Tourism Department" },
  ];
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      toast.error("Password don't match!");
      setConfirmPassword("");
      setPassword("");
    } else {
      if (editingAccount) {
        editAccount(editingAccount.id, {
          lastName,
          firstName,
          emailAddress,
          userName,
          password,
          roles,
          department,
        });
        toast.success("Account updated successfully!");
      } else {
        const newAccount = {
          id: crypto.randomUUID(),
          lastName,
          firstName,
          emailAddress,
          userName,
          roles: roles,
          department,
          password,
        };
        addAccount(newAccount);
        toast.success("Account added successfully!");
      }
      closeModal();
      setEditingAccount(null);
      setLastName("");
      setFirstName("");
      setEmailAddress("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
      setRoles("");
      setDepartment("");
    }
  };

  const handleDelete = (id) => {
    deleteAccount(id);
  };
  const handleEdit = (id) => {
    const accountToEdit = accounts.find((a) => a.id === id);
    setEditingAccount(accountToEdit);
    setIsModalOpen(true);
    setLastName(accountToEdit.lastName);
    setFirstName(accountToEdit.firstName);
    setEmailAddress(accountToEdit.emailAddress);
    setUserName(accountToEdit.userName);
    setPassword(accountToEdit.password);
    setRoles(accountToEdit.roles);
    setDepartment(accountToEdit.department);
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRoles =
      !filterRoles || filterRoles === "All Roles"
        ? true
        : account.roles === filterRoles;
    const matchesDepartment =
      !filterDepartment || filterDepartment === "All Department"
        ? true
        : account.department === filterDepartment;

    return matchesSearch && matchesRoles && matchesDepartment;
  });
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 px-6 pt-6">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Accounts
        </h1>
        <div className="flex justify-between text-center items-center mt-6 ">
          <h3 className="text-sm font-semibold text-gray-500">
            {" "}
            Manage user roles and access permissions
          </h3>
          <button
            className="flex gap-x-2 bg-blue-500/80 text-white hover:bg-blue-600 cursor-pointer border rounded-md p-2"
            onClick={() => {
              openModal();
              setRoles("");
              setDepartment("");
            }}
          >
            <UserPlus size={20} />
            <span>Add Accounts</span>
          </button>
        </div>
      </div>
      <div className="flex-shrink-0 px-6 mt-6">
        <div className="grid md:grid-cols-2 gap-2.5">
          <TextInput
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 mt-2.5 md:mt-0 gap-x-2">
            <SelectBox
              options={filterRoleOptions}
              value={filterRoles}
              onChange={setFilterRoles}
              placeholder="All Roles"
            />

            <SelectBox
              options={filterDepartmentOptions}
              value={filterDepartment}
              onChange={setFilterDepartment}
              placeholder="All Department"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 px-6 pb-10 mt-6 overflow-auto m-6 scrollbar-none">
        <div className="grid grid-cols-1 gap-4">
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <AccountsCard
                key={account.id}
                account={account}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            )).reverse()
          ) : (
            <p className="font-semibold text-xl text-gray-500 italic col-span-full text-center py-10">
              No assets added yet.
            </p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          setEditingAccount(null);
          setRoles("");
          setDepartment("");
        }}
        title={editingAccount ? "Edit Account" : "Add New Account"}
      >
        <AddAccountForm
          isEditing={!!editingAccount}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          lastName={lastName}
          setLastName={setLastName}
          firstName={firstName}
          setFirstName={setFirstName}
          emailAddress={emailAddress}
          setEmailAddress={setEmailAddress}
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          roles={roles}
          setRoles={setRoles}
          roleOptions={roleOptions}
          department={department}
          setDepartment={setDepartment}
          departmentOptions={departmentOptions}
        />
      </Modal>
    </div>
  );
};

export default Accounts;
