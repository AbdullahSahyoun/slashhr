import React from 'react';
import PropTypes from 'prop-types';

const EditText = ({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  error = false,
  errorMessage = '',
  label = '',
  required = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'w-full px-3 py-2 border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  
  const stateClasses = error 
    ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-400'
    : disabled 
    ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed' :'border-gray-300 bg-white text-gray-900 placeholder-gray-500 hover:border-gray-400';

  const inputClasses = `${baseClasses} ${stateClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

EditText.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default EditText;