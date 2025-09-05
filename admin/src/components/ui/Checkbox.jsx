import React, { useEffect, useRef } from "react";

const Checkbox = ({
  checked = false,
  onChange,
  indeterminate = false,
  disabled = false,
  label,
  className = "",
  inputClassName = "",
  ...props
}) => {
  const ref = useRef(null);

  // Support indeterminate state
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate && !checked;
    }
  }, [indeterminate, checked]);

  return (
    <label className={`inline-flex items-center gap-2 select-none ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"} ${className}`}>
      <input
        ref={ref}
        type="checkbox"
        checked={!!checked}
        disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${inputClassName}`}
        {...props}
      />
      {label ? <span className="text-sm text-gray-800">{label}</span> : null}
    </label>
  );
};

export default Checkbox;
