import React from 'react';

const Delete = ({ open, onClose, onConfirm, employeeName }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold text-red-600">Delete Employee</h2>
        <p className="mt-2">Are you sure you want to delete <b>{employeeName}</b>?</p>
        <div className="mt-4 flex justify-end gap-3">
          <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
