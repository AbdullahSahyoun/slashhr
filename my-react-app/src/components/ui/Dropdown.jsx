import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  label = '',
  className = '',
  rightImage = null,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    if (onChange) {
      onChange(option);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => 
    (typeof opt === 'string' ? opt : opt.value) === value
  );

  const displayValue = selectedOption 
    ? (typeof selectedOption === 'string' ? selectedOption : selectedOption.label)
    : placeholder;

  const baseClasses = 'relative w-full px-3 py-2 border rounded-md bg-white cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  
  const stateClasses = error 
    ? 'border-red-500 text-red-900'
    : disabled 
    ? 'border-gray-300 text-gray-500 cursor-not-allowed bg-gray-100' :'border-gray-300 text-gray-900 hover:border-gray-400';

  const dropdownClasses = `${baseClasses} ${stateClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <div className="w-full" ref={dropdownRef} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`${dropdownClasses} flex items-center justify-between`}
        >
          <span className={!selectedOption ? 'text-gray-500' : ''}>
            {displayValue}
          </span>
          {rightImage ? (
            <img 
              src={rightImage.src} 
              alt="dropdown arrow" 
              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              width={rightImage.width || 16}
              height={rightImage.height || 16}
            />
          ) : (
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.length === 0 ? (
              <div className="px-3 py-2 text-gray-500">No options available</div>
            ) : (
              options.map((option, index) => {
                const optionValue = typeof option === 'string' ? option : option.value;
                const optionLabel = typeof option === 'string' ? option : option.label;
                const isSelected = optionValue === value;
                
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full px-3 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100
                      ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-900'}
                    `}
                  >
                    {optionLabel}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      }),
    ])
  ),
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  rightImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

export default Dropdown;