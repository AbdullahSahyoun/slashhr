import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Switch = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  size = 'medium',
  className = '',
  ...props 
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (!disabled) {
      const newValue = !isChecked;
      setIsChecked(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const sizes = {
    small: 'w-8 h-4',
    medium: 'w-10 h-5',
    large: 'w-12 h-6'
  };

  const thumbSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4', 
    large: 'w-5 h-5'
  };

  const switchClasses = `
    relative inline-flex items-center cursor-pointer rounded-full transition-colors duration-200
    ${sizes[size]}
    ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const thumbClasses = `
    absolute bg-white rounded-full shadow-md transform transition-transform duration-200
    ${thumbSizes[size]}
    ${isChecked ? 'translate-x-5' : 'translate-x-0.5'}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={handleToggle}
      disabled={disabled}
      className={switchClasses}
      {...props}
    >
      <span className={thumbClasses} />
    </button>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Switch;