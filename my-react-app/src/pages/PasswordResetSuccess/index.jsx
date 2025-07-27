import React, { useState } from 'react';

const PasswordResetSuccess = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex items-end justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto mb-6 sm:mb-12 md:mb-16 lg:mb-24">
        <div className="bg-global-3 rounded-[6px] p-4 sm:p-5 lg:p-[20px] flex items-start justify-center gap-4 sm:gap-5 lg:gap-[20px]">
          {/* Success Icon */}
          <img 
            src="/images/img_icons.svg" 
            alt="success icon" 
            className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px] flex-shrink-0 mt-0.5"
          />
          
          {/* Content Container */}
          <div className="flex-1 flex items-start justify-between gap-4 sm:gap-5 lg:gap-[20px]">
            {/* Success Message */}
            <p className="text-global-5 font-inter text-[12px] sm:text-[13px] lg:text-[14px] font-normal leading-[18px] sm:leading-[19px] lg:leading-[20px] text-left flex-1">
              Successfully reset your password. Save it and use it to log in!
            </p>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-10 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="Close notification"
            >
              <img 
                src="/images/img_close.svg" 
                alt="close" 
                className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;