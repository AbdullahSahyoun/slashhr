import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  leftImage = null,
  rightImage = null,
  ...props 
}) => {
  const getVariantClasses = () => {
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    };
    
    return variants[variant] || variants.primary;
  };

  const getSizeClasses = () => {
    const sizes = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg',
    };
    
    return sizes[size] || sizes.medium;
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const buttonClasses = `
    ${baseClasses}
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {leftImage && (
        <img 
          src={leftImage.src} 
          alt="left icon" 
          className="mr-2"
          width={leftImage.width || 16}
          height={leftImage.height || 16}
        />
      )}
      {children}
      {rightImage && (
        <img 
          src={rightImage.src} 
          alt="right icon" 
          className="ml-2"
          width={rightImage.width || 16}
          height={rightImage.height || 16}
        />
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
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

export default Button;