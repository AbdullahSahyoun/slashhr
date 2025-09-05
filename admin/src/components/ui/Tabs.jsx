import React, { useState } from "react";

export const Tabs = ({ defaultValue, children, onValueChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              activeValue: value,
              onChange: handleChange,
            })
          : child
      )}
    </div>
  );
};

export const TabsList = ({ children, className = "" }) => (
  <div className={`flex gap-2 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const TabsTrigger = ({
  value,
  activeValue,
  onChange,
  children,
  className = "",
}) => {
  const isActive = activeValue === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`px-4 py-2 text-sm font-medium rounded-t-md transition ${
        isActive
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, activeValue, children, className = "" }) =>
  activeValue === value ? (
    <div className={`p-4 ${className}`}>{children}</div>
  ) : null;
