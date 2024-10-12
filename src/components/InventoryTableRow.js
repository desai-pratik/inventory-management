import React from "react";

const InventoryTableRow = ({ item, onEdit, onDelete }) => {
  return (
    <tr className={`border hover:bg-gray-200 transition duration-150`}>
      <td className="px-6 py-4">{item.name}</td>
      <td className="px-6 py-4">{item.quantity}</td>
      <td className="px-6 py-4">{item.category}</td>
      <td className="px-6 py-4">{item.supplier}</td>
      <td className=" px-6 py-4">
        <strong className={`p-1 px-3 ${item.quantity < 10 ? "bg-red-500 text-white" : "bg-green-500 text-white"} rounded-lg`}>
          {item.quantity < 10 ? "Low Stock" : "Sufficient Stock"}
        </strong>
      </td>
      <td className="px-6 py-4">
        <button onClick={() => onEdit(item)} className="bg-yellow-400 text-white py-1 px-3 rounded mr-2">
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white py-1 px-3 rounded">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default InventoryTableRow;
