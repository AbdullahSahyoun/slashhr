import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'medium',
  color = 'blue',
  label = '',
  className = '',
  ...props 
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const getSizeClasses = () => {
    const sizes = {
      small: {
        switch: 'w-8 h-4',
        thumb: 'w-3 h-3',
        translate: 'translate-x-4'
      },
      medium: {
        switch: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5'
      },
      large: {
        switch: 'w-14 h-8',
        thumb: 'w-7 h-7',
        translate: 'translate-x-6'
      }
    };
    
    return sizes[size] || sizes.medium;
  };

  const getColorClasses = () => {
    const colors = {
      blue: checked ? 'bg-blue-600' : 'bg-gray-200',
      green: checked ? 'bg-green-600' : 'bg-gray-200',
      red: checked ? 'bg-red-600' : 'bg-gray-200',
      purple: checked ? 'bg-purple-600' : 'bg-gray-200',
    };
    
    return colors[color] || colors.blue;
  };

  const sizeClasses = getSizeClasses();
  const colorClasses = getColorClasses();

  return (
    <div className={`flex items-center ${className}`} {...props}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${sizeClasses.switch}
          ${colorClasses}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span
          className={`
            inline-block bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out
            ${sizeClasses.thumb}
            ${checked ? sizeClasses.translate : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <span className={`ml-3 text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
          {label}
        </span>
      )}
    </div>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['blue', 'green', 'red', 'purple']),
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Switch;