import React, { useEffect, useState } from 'react';

const InventoryForm = ({ onSubmit, editItem  }) => {
  const [item, setItem] = useState({ name: '', quantity: '', category: '', supplier: '' });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (editItem) {
      setItem(editItem); 
      setErrors({});
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!item.name) newErrors.name = "Item name is required.";
    if (!item.quantity) newErrors.quantity = "Quantity is required.";
    else if (item.quantity <= 0) newErrors.quantity = "Quantity must be greater than zero.";
    if (!item.category) newErrors.category = "Category is required.";
    if (!item.supplier) newErrors.supplier = "Supplier is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(item);
      setItem({ name: "", quantity: "", category: "", supplier: "" });
      setErrors({}); 
    }
  };



  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 py-2 rounded">
      <h2 className='text-2xl mb-4'>{editItem ? "Update Inventory" : "Add Inventory"}</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Item Name</label>
        <input
          type="text"
          name="name"
          value={item.name}
          placeholder='Enter Inventory Name'
          onChange={handleChange}
          className={`appearance-none border rounded w-full py-2 px-3 ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder='Enter Quantity'
          value={item.quantity}
          onChange={handleChange}
          className={`appearance-none border rounded w-full py-2 px-3 ${errors.quantity ? 'border-red-500' : ''}`}
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          placeholder='Enter Category'
          value={item.category}
          onChange={handleChange}
          className={`appearance-none border rounded w-full py-2 px-3 ${errors.category ? 'border-red-500' : ''}`}
        />
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700">Supplier</label>
        <input
          type="text"
          name="supplier"
          placeholder='Enter Supplier'
          value={item.supplier}
          onChange={handleChange}
          className={`appearance-none border rounded w-full py-2 px-3 ${errors.supplier ? 'border-red-500' : ''}`}
        />
        {errors.supplier && <p className="text-red-500 text-sm">{errors.supplier}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        {editItem ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

export default InventoryForm;