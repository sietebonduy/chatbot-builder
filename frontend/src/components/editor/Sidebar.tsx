import React, { useState, useEffect } from "react";

interface SidebarProps {
  selectedNode: any;
  onUpdateNode: (id: string, newData: any) => void;
  onDeleteNode: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedNode, onUpdateNode, onDeleteNode }) => {
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setLabel(selectedNode.data.label || "");
    }
  }, [selectedNode]);

  if (!selectedNode) return null;

  const handleUpdate = () => {
    onUpdateNode(selectedNode.id, { label });
  };

  return (
    <div className="w-64 p-4 bg-gray-800 text-white fixed right-0 top-0 h-full shadow-lg flex flex-col gap-4">
      <h2 className="text-lg font-bold">Редактировать узел</h2>

      <label className="block">Текст узла:</label>
      <input
        type="text"
        className="w-full p-2 text-black rounded-md"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <button onClick={handleUpdate} className="bg-blue-500 px-4 py-2 rounded-md">Сохранить</button>
      <button onClick={() => onDeleteNode(selectedNode.id)} className="bg-red-500 px-4 py-2 rounded-md">Удалить</button>
    </div>
  );
};

export default Sidebar;
