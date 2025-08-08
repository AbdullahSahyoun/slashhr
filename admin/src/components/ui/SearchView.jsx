import React from 'react';
import PropTypes from 'prop-types';

const SearchView = ({ 
  placeholder = 'Search...', 
  value = '', 
  onChange, 
  onSearch,
  disabled = false,
  className = '',
  leftImage = null,
  rightImage = null,
  ...props 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  const baseClasses = 'w-full flex items-center bg-white border border-gray-300 rounded-md transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent';
  
  const searchClasses = `
    ${baseClasses}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={searchClasses} {...props}>
      {leftImage && (
        <img 
          src={leftImage.src} 
          alt="search icon" 
          className="ml-3 flex-shrink-0"
          width={leftImage.width || 16}
          height={leftImage.height || 16}
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        className="flex-1 px-3 py-2 bg-transparent border-none outline-none text-sm placeholder-gray-500"
      />
      {rightImage && (
        <button
          type="button"
          onClick={() => onSearch && onSearch(value)}
          disabled={disabled}
          className="mr-3 flex-shrink-0 p-1 hover:bg-gray-100 rounded disabled:cursor-not-allowed"
        >
          <img 
            src={rightImage.src} 
            alt="search button" 
            width={rightImage.width || 16}
            height={rightImage.height || 16}
          />
        </button>
      )}
    </div>
  );
};

SearchView.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  leftImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  rightImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

export default SearchView;