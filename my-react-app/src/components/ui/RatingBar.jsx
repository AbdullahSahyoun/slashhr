import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RatingBar = ({ 
  rating = 0, 
  maxRating = 5, 
  onChange, 
  readonly = false,
  size = 'medium',
  color = 'yellow',
  className = '',
  ...props 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const getSizeClasses = () => {
    const sizes = {
      small: 'w-4 h-4',
      medium: 'w-6 h-6',
      large: 'w-8 h-8',
    };
    
    return sizes[size] || sizes.medium;
  };

  const getColorClasses = (isFilled) => {
    const colors = {
      yellow: isFilled ? 'text-yellow-400' : 'text-gray-300',
      red: isFilled ? 'text-red-400' : 'text-gray-300',
      blue: isFilled ? 'text-blue-400' : 'text-gray-300',
      green: isFilled ? 'text-green-400' : 'text-gray-300',
    };
    
    return colors[color] || colors.yellow;
  };

  return (
    <div className={`flex items-center gap-1 ${className}`} {...props}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={readonly}
            className={`
              ${getSizeClasses()}
              ${getColorClasses(isFilled)}
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
            `}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-full h-full"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
      {!readonly && (
        <span className="ml-2 text-sm text-gray-600">
          {rating} / {maxRating}
        </span>
      )}
    </div>
  );
};

RatingBar.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['yellow', 'red', 'blue', 'green']),
  className: PropTypes.string,
};

export default RatingBar;