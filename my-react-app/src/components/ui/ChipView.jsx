import React from 'react';
import PropTypes from 'prop-types';

const ChipView = ({ 
  items = [], 
  onItemClick, 
  onItemRemove,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props 
}) => {
  const handleItemClick = (item, index) => {
    if (onItemClick && !item.disabled) {
      onItemClick(item, index);
    }
  };

  const handleItemRemove = (item, index, e) => {
    e.stopPropagation();
    if (onItemRemove && !item.disabled) {
      onItemRemove(item, index);
    }
  };

  const getVariantClasses = (item) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
      primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      success: 'bg-green-100 text-green-800 hover:bg-green-200',
      warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      danger: 'bg-red-100 text-red-800 hover:bg-red-200',
    };
    
    return variants[item.variant || variant] || variants.default;
  };

  const getSizeClasses = () => {
    const sizes = {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-1.5 text-sm',
      large: 'px-4 py-2 text-base',
    };
    
    return sizes[size] || sizes.medium;
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} {...props}>
      {items.map((item, index) => {
        const chipItem = typeof item === 'string' ? { label: item } : item;
        const isClickable = onItemClick && !chipItem.disabled;
        const isRemovable = onItemRemove && !chipItem.disabled;
        
        return (
          <div
            key={index}
            onClick={() => handleItemClick(chipItem, index)}
            className={`
              inline-flex items-center rounded-full font-medium transition-colors duration-200
              ${getSizeClasses()}
              ${getVariantClasses(chipItem)}
              ${isClickable ? 'cursor-pointer' : ''}
              ${chipItem.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {chipItem.icon && (
              <span className="mr-1">
                {chipItem.icon}
              </span>
            )}
            <span>{chipItem.label}</span>
            {isRemovable && (
              <button
                type="button"
                onClick={(e) => handleItemRemove(chipItem, index, e)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black hover:bg-opacity-10 focus:outline-none focus:bg-black focus:bg-opacity-10"
              >
                <span className="sr-only">Remove</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

ChipView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
        disabled: PropTypes.bool,
        icon: PropTypes.node,
      }),
    ])
  ),
  onItemClick: PropTypes.func,
  onItemRemove: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default ChipView;