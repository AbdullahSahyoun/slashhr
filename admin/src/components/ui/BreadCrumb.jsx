import React from 'react';
import PropTypes from 'prop-types';

const BreadCrumb = ({ 
  items = [], 
  separator = '/', 
  className = '',
  onItemClick,
  ...props 
}) => {
  const handleItemClick = (item, index) => {
    if (onItemClick && !item.disabled) {
      onItemClick(item, index);
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} {...props}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <span className="text-gray-400 select-none">{separator}</span>
          )}
          <button
            type="button"
            onClick={() => handleItemClick(item, index)}
            disabled={item.disabled || index === items.length - 1}
            className={`
              ${item.disabled || index === items.length - 1 
                ? 'text-gray-900 cursor-default font-medium' :'text-blue-600 hover:text-blue-800 hover:underline cursor-pointer'
              }
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
            `}
          >
            {item.label || item}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
};

BreadCrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string,
        disabled: PropTypes.bool,
      }),
    ])
  ),
  separator: PropTypes.string,
  className: PropTypes.string,
  onItemClick: PropTypes.func,
};

export default BreadCrumb;