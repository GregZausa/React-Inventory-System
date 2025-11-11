import React from "react";
import TextInput from "../../../components/input-box/TextInput";
import CancelButton from "../../../components/buttons/CancelButton";
import SubmitButton from "../../../components/buttons/SubmitButton";
import SelectBox from "../../../components/select-box/SelectBox";

const AddAccountForm = ({
  isEditing,
  closeModal,
  handleSubmit,
  lastName,
  setLastName,
  firstName,
  setFirstName,
  emailAddress,
  setEmailAddress,
  userName,
  setUserName,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  roleOptions,
  roles,
  setRoles,
  department,
  setDepartment,
  departmentOptions,
}) => {
  return (
    <form className="space-y-4">
      <h3>
        {isEditing
          ? "Update the details of the user"
          : "Enter the details for the new user"}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          type="text"
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          required
        />
        <TextInput
          type="text"
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          type="text"
          label="Email Address"
          value={emailAddress}
          onChange={setEmailAddress}
          required
        />
        <TextInput
          type="text"
          label="Username"
          value={userName}
          onChange={setUserName}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          type="password"
          label="Password"
          value={password}
          onChange={setPassword}
          required
        />
        <TextInput
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <SelectBox
          label="Account Role"
          options={roleOptions}
          value={roles}
          onChange={setRoles}
          placeholder="Select an account role"
        />
        <SelectBox
          label="Department"
          options={departmentOptions}
          value={department}
          onChange={setDepartment}
          placeholder="Select a department"
        />
      </div>
      <div className="relative flex gap-4 justify-end">
        <CancelButton label="Cancel" onClick={closeModal} />
        <SubmitButton
          label={isEditing ? "Save" : "Create Account"}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default AddAccountForm;
