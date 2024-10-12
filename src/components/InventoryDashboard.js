import React, { useState } from "react";
import InventoryTableRow from "./InventoryTableRow";

const InventoryDashboard = ({ items, onEdit, onDelete }) => {
  const [filterQuery, setFilterQuery] = useState("");
  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(filterQuery.toLowerCase()));

  return (
    <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
      <h2 className="text-2xl text-gray-700">Inventory Dashboard</h2>
      <input type="text" placeholder="Search items..." value={filterQuery} onChange={handleFilterChange} className="border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 w-96" />
      </div>

      <table className="table-auto w-full bg-white rounded-lg">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr>
            <th className="px-6 py-3 text-left">Item Name</th>
            <th className="px-6 py-3 text-left">Quantity</th>
            <th className="px-6 py-3 text-left">Category</th>
            <th className="px-6 py-3 text-left">Supplier</th>
            <th className="px-6 py-3 text-left">Stock Level</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {filteredItems.map((item, index) => (
            <InventoryTableRow key={index} item={item} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDashboard;
