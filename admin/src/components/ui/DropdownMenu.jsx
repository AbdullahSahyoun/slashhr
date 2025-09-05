import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Root DropdownMenu wrapper
const DropdownMenu = ({ children }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

// Trigger button (what opens the menu)
const DropdownMenuTrigger = ({ children }) => {
  return <>{children}</>; // the click handling is managed in parent
};

// Dropdown content (animated popup)
const DropdownMenuContent = ({ open, onClose, align = "start", children }) => {
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className={`absolute z-20 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg p-1 ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Each item inside the dropdown
const DropdownMenuItem = ({ onClick, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`block w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${className}`}
  >
    {children}
  </button>
);

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem };
