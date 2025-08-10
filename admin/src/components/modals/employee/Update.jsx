import React from 'react';

const Update = ({ open, onClose, employee }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-lg font-bold">Update Employee</h2>
        <p>Editing: {employee?.name}</p>
        <button onClick={onClose} className="mt-4 bg-gray-200 px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

export default Update;
