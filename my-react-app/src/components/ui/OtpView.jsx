import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const OtpView = ({ 
  length = 6, 
  value = '', 
  onChange, 
  onComplete,
  disabled = false,
  className = '',
  inputClassName = '',
  ...props 
}) => {
  const [otp, setOtp] = useState(value.split('').slice(0, length));
  const inputRefs = useRef([]);

  useEffect(() => {
    setOtp(value.split('').slice(0, length));
  }, [value, length]);

  const handleChange = (index, newValue) => {
    if (disabled) return;

    // Only allow single digit
    const digit = newValue.slice(-1);
    if (digit && !/^\d$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    if (onChange) {
      onChange(otpString);
    }

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (onComplete && newOtp.every(digit => digit !== '') && newOtp.length === length) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (index, e) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        handleChange(index, '');
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);
    
    const newOtp = Array(length).fill('');
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    
    setOtp(newOtp);
    
    const otpString = newOtp.join('');
    if (onChange) {
      onChange(otpString);
    }

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
    inputRefs.current[focusIndex]?.focus();

    if (onComplete && newOtp.every(digit => digit !== '')) {
      onComplete(otpString);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`} {...props}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${inputClassName}
          `}
        />
      ))}
    </div>
  );
};

OtpView.propTypes = {
  length: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onComplete: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

export default OtpView;