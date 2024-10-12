import { useEffect, useState } from "react";
import "./App.css";
import InventoryDashboard from "./components/InventoryDashboard";
import InventoryForm from "./components/InventoryForm";
import SupplierManagement from "./components/SupplierManagement";
import InventoryChart from "./components/PieChart";

function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("inventoryItems");
    return savedItems
      ? JSON.parse(savedItems)
      : [
          { id: 1, name: "Laptop", quantity: 25, category: "Electronics", supplier: "ABC Corp" },
          { id: 2, name: "Chair", quantity: 12, category: "Furniture", supplier: "XYZ Suppliers" },
          { id: 3, name: "Monitor", quantity: 7, category: "Electronics", supplier: "TechGear" },
        ];
  });

  const [suppliers, setSuppliers] = useState(() => {
    const savedSuppliers = localStorage.getItem("supplierInfo");
    return savedSuppliers
      ? JSON.parse(savedSuppliers)
      : [
          { id: 1, name: "ABC Corp", contact: "abc@corp.com", itemsSupplied: "Laptops, Monitors" },
          { id: 2, name: "XYZ Suppliers", contact: "xyz@supplier.com", itemsSupplied: "Chairs, Tables" },
        ];
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("inventoryItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("supplierInfo", JSON.stringify(suppliers));
  }, [suppliers]);

  const handleAddOrUpdateItem = (item) => {
    if (editItem) {
      setItems(items.map((i) => (i.id === item.id ? item : i)));
      setEditItem(null);
    } else {
      const newItem = { ...item, id: items.length + 1 };
      setItems([...items, newItem]);
    }
  };
  const handleEditItem = (item) => {
    setEditItem(item);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddSupplier = (supplier) => {
    const newSupplier = { ...supplier, id: suppliers.length + 1 };
    setSuppliers([...suppliers, newSupplier]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-1">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl mb-6 text-center">Inventory Management System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <InventoryForm onSubmit={handleAddOrUpdateItem} editItem={editItem} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <InventoryChart items={items} />
          </div>
        </div>

        <div className="mb-6">
          <InventoryDashboard items={items} onEdit={handleEditItem} onDelete={handleDeleteItem} />
        </div>

        <div className="mb-6">
          <SupplierManagement suppliers={suppliers} onAddSupplier={handleAddSupplier} />
        </div>
      </div>
    </div>
  );
}

export default App;
