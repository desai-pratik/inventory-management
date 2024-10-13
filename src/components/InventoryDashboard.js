import React, { useState } from "react";
import InventoryTableRow from "./InventoryTableRow";

const InventoryDashboard = ({ items, onEdit, onDelete }) => {
  const [filterQuery, setFilterQuery] = useState("");

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  const filteredItems = items.filter((item) => {
    const lowerCaseQuery = filterQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseQuery) ||
      item.category.toLowerCase().includes(lowerCaseQuery) ||
      item.supplier.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div className="overflow-x-auto p-4 bg-white  rounded shadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-3">
        <h2 className="text-xl md:text-2xl text-gray-700 mb-2 md:mb-0">Inventory Dashboard</h2>
        <input
          type="text"
          placeholder="Search items..."
          value={filterQuery}
          onChange={handleFilterChange}
          className="border focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2 w-full md:w-96"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs md:text-sm leading-normal">
            <tr>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left">Item Name</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left">Quantity</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left">Category</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left">Supplier</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left">Stock Level</th>
              <th className="px-2 md:px-6 py-2 md:py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs md:text-sm">
            {filteredItems.map((item, index) => (
              <InventoryTableRow key={index} item={item} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryDashboard;
