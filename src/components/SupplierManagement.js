import React, { useState } from "react";

const SupplierManagement = ({ suppliers, onAddSupplier }) => {
  const [supplier, setSupplier] = useState({ name: "", contact: "", itemsSupplied: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!supplier.name) newErrors.name = "Supplier name is required.";
    if (!supplier.contact) {
      newErrors.contact = "Contact is required.";
    } else if (!/\S+@\S+\.\S+/.test(supplier.contact)) {
      newErrors.contact = "Contact must be a valid email address.";
    }
    if (!supplier.itemsSupplied) newErrors.itemsSupplied = "Items supplied is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onAddSupplier(supplier);
      setSupplier({ name: "", contact: "", itemsSupplied: "" });
      setErrors({});
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow ">
      <h2 className="text-2xl mb-4 text-gray-800">Supplier Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Supplier Name</label>
          <input
            type="text"
            name="name"
            placeholder='Enter Supplier Name'
            value={supplier.name}
            onChange={handleChange}
            className={`appearance-none border rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="contact"
            value={supplier.contact}
            placeholder='Enter Email'
            onChange={handleChange}
            className={`appearance-none border rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.contact ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Items Supplied</label>
          <input
            type="text"
            name="itemsSupplied"
            placeholder="Enter Supplied Items"
            value={supplier.itemsSupplied}
            onChange={handleChange}
            className={`appearance-none border rounded w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.itemsSupplied ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.itemsSupplied && <p className="text-red-500 text-sm mt-1">{errors.itemsSupplied}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
          Add Supplier
        </button>
      </form>

      <h3 className="text-lg mb-2 text-gray-800">Existing Suppliers</h3>
      <ul className="border-t mt-4 pt-2">
        {suppliers.map((sup) => (
          <li key={sup.id} className="mb-2 py-2 border-b last:border-b-0">
            {sup.name} - {sup.contact} (Items: {sup.itemsSupplied})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierManagement;
