import React, { useEffect, useRef } from 'react';

export default function Delete({
  isOpen,
  onClose,
  onConfirm,
  employeeName = 'this employee',
  title = 'Delete Employee',
  busy = false,
}) {
  const dialogRef = useRef(null);
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the Cancel button on open
    const t = setTimeout(() => cancelBtnRef.current?.focus(), 0);

    // ESC to close
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg"
        onClick={stop}
      >
        <h2 id="delete-modal-title" className="text-lg font-bold text-red-600">
          {title}
        </h2>

        <p className="mt-3 text-sm text-gray-700">
          Are you sure you want to delete <b>{employeeName}</b>? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-2">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          >
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
