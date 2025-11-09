import React from "react";

const TabItem = ({ icon: Icon, name, count, isActive = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 rounded-md transition-colors duration-200 ${
        isActive
          ? "border-accent-primary text-primary"
          : "border-transparent text-secondary cursor-pointer hover:bg-secondary"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{name}</span>
      {count && (
        <span
          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
            isActive
              ? "bg-accent-primary text-white"
              : "bg-tertiary text-secondary"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};

export default TabItem;
