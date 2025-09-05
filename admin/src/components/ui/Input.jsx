import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(
  (
    {
      type = "text",
      value,
      onChange,
      placeholder = "",
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = `
      block w-full rounded-md border border-gray-300 
      px-3 py-2 text-sm text-gray-900 
      placeholder-gray-400 shadow-sm
      focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
      disabled:cursor-not-allowed disabled:opacity-50
    `;

    return (
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClasses} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
