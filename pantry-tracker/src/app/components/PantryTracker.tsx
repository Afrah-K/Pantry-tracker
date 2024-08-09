'use client';
import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // Adjust the path if necessary
import { ref, set, onValue, remove, get } from "firebase/database";

interface PantryItem {
  name: string;
  amount: number;
}

interface PantryTrackerProps {
  id: string; // Accept id as a prop
}

const PantryTracker: React.FC<PantryTrackerProps> = ({ id }) => {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState<number | "">(""); // State for amount

  useEffect(() => {
    const itemsRef = ref(database, `users/${id}/pantryItems`);
    const unsubscribe = onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.values(data).map((item: any) => ({
          name: item.name,
          amount: item.amount,
        }));
        setItems(itemList);
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [id]);

  const addItem = async () => {
    if (newItem && newAmount) {
      const itemRef = ref(database, `users/${id}/pantryItems/${newItem}`);
      const itemData = {
        name: newItem,
        amount: Number(newAmount), // Ensure amount is a number
      };
      await set(itemRef, itemData); // Set the new item data
      setNewItem("");
      setNewAmount(""); // Reset the amount input
    }
  };

  const removeItem = async (item: string) => {
    const itemRef = ref(database, `users/${id}/pantryItems/${item}`);
    await remove(itemRef); // Remove the item from Firebase
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Pantry Tracker</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new pantry item"
        className="border p-2 mb-2"
      />
      <input
        type="number"
        value={newAmount}
        onChange={(e) => setNewAmount(e.target.value ? Number(e.target.value) : "")} // Convert to number or set to empty string
        placeholder="Amount"
        className="border p-2 mb-2"
      />
      <button onClick={addItem} className="px-4 py-2 bg-green-500 text-white rounded-md mb-4">
        Add Item
      </button>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Item</th>
            <th className="border border-gray-200 p-2">Amount</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border border-gray-200">
              <td className="border border-gray-200 p-2">{item.name}</td>
              <td className="border border-gray-200 p-2">{item.amount}</td>
              <td className="border border-gray-200 p-2">
                <button onClick={() => removeItem(item.name)} className="text-red-500">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PantryTracker;
