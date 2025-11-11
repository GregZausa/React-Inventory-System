import CancelButton from "../../../components/buttons/CancelButton";
import SubmitButton from "../../../components/buttons/SubmitButton";
import DateInput from "../../../components/input-box/DateInput";
import TextArea from "../../../components/input-box/TextArea";
import TextInput from "../../../components/input-box/TextInput";
import SelectBox from "../../../components/select-box/SelectBox";

const AddAssetForm = ({
  assetName,
  setAssetName,
  category,
  setCategory,
  userOptions,
  userInCharge,
  setUserInCharge,
  purchaseDate,
  setPurchaseDate,
  purchaseCost,
  setPurchaseCost,
  supplierName,
  setSupplierName,
  usefulLife,
  setUsefulLife,
  categoryOptions,
  description,
  setDescription,
  closeModal,
  handleSubmit,
  isEditing,
}) => {
  return (
    <form className="space-y-4">
      <h3>
        {isEditing
          ? "Update the details of the asset"
          : "Enter the details for the new asset"}
      </h3>
      <TextInput
        type="text"
        label="Asset Name"
        value={assetName}
        onChange={setAssetName}
        className="w-full"
        required
      />
      <div className="grid grid-cols-2 gap-2">
        <SelectBox
          label="Select Category"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          placeholder="Select Category"
          required
        />
        <SelectBox
          label="User-in-charge"
          options={userOptions}
          value={userInCharge}
          onChange={setUserInCharge}
          placeholder="Select user-in-charge"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <DateInput
          label="Purchase Date"
          value={purchaseDate}
          onChange={setPurchaseDate}
          placeholder="Select purchase date"
          required
        />
        <TextInput
          type="number"
          label="Puchase Cost (₱)"
          value={purchaseCost}
          onChange={setPurchaseCost}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TextInput
          type="text"
          label="Supplier"
          value={supplierName}
          onChange={setSupplierName}
          placeholder="ABC Technology Inc."
          required
        />
        <TextInput
          type="number"
          label="Useful Life(Years)"
          value={usefulLife}
          onChange={setUsefulLife}
          required
        />
      </div>
      <TextArea
        type="text"
        label="Description (Optional)"
        value={description}
        onChange={setDescription}
        className="w-full"
        placeholder="Additional notes about this asset..."
      />
      <div className="relative flex gap-4 justify-end">
        <CancelButton label="Cancel" onClick={closeModal} />
        <SubmitButton
          label={isEditing ? "Save" : "Create Asset"}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
};

export default AddAssetForm;
