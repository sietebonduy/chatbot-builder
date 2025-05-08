import React from "react";

type ListItemProps = {
  item: Record<string, any>;
  fields: string[];
  onClick: () => void;
};

const ListItem = ({ item, fields, onClick }: ListItemProps) => {
  return (
    <div
      className="border rounded-xl p-4 shadow hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      {fields.map((field) => (
        <div key={field}>
          <strong>{field}:</strong> {String(item[field] ?? "—")}
        </div>
      ))}
    </div>
  );
};

export default ListItem;
