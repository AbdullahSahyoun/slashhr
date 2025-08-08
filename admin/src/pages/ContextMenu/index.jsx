import React, { useState } from 'react';

const ContextMenu = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleShare = () => {
    console.log('Share clicked');
    setIsVisible(false);
  };

  const handleEdit = () => {
    console.log('Edit clicked');
    setIsVisible(false);
  };

  const handleDelete = () => {
    console.log('Delete clicked');
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Context menu closed</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center relative">
      {/* Context Menu */}
      <div className="absolute top-[458px] left-1/2 transform -translate-x-1/2 w-full max-w-[26%] min-w-[280px] sm:min-w-[320px] md:min-w-[360px]">
        <div className="bg-[#ffffff] rounded-[20px] pt-[18px] pr-[16px] pb-[18px] pl-[16px] shadow-lg">
          <div className="flex flex-col gap-[12px] justify-start items-center w-full">
            {/* Share Option */}
            <div className="flex flex-row gap-[8px] justify-center items-center w-auto">
              <img 
                src="/images/img_frame_black_900.svg" 
                alt="share icon" 
                className="w-[20px] h-[20px]"
              />
              <button
                onClick={handleShare}
                className="text-[15px] font-inter font-bold leading-[19px] text-left text-[#000000] hover:text-gray-700 transition-colors duration-200"
              >
                Share
              </button>
            </div>

            {/* Separator and Edit Section */}
            <div className="flex flex-col gap-[14px] justify-start items-center w-full">
              {/* Top Separator Line */}
              <div className="w-[466px] h-[1px] bg-[#eeeeee]"></div>

              {/* Edit Option */}
              <div className="flex flex-row gap-[8px] justify-center items-center w-auto">
                <img 
                  src="/images/img_frame_black_900_20x20.svg" 
                  alt="edit icon" 
                  className="w-[20px] h-[20px]"
                />
                <button
                  onClick={handleEdit}
                  className="text-[15px] font-inter font-bold leading-[19px] text-left text-[#000000] hover:text-gray-700 transition-colors duration-200"
                >
                  Edit
                </button>
              </div>

              {/* Bottom Separator Line */}
              <div className="w-[466px] h-[1px] bg-[#eeeeee]"></div>
            </div>

            {/* Delete Option */}
            <div className="flex flex-row gap-[18px] justify-center items-center w-auto">
              <img 
                src="/images/img_vector_red_700.svg" 
                alt="delete icon" 
                className="w-[16px] h-[20px]"
              />
              <button
                onClick={handleDelete}
                className="text-[15px] font-inter font-bold leading-[19px] text-left text-[#dd2e31] hover:text-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background overlay for demonstration */}
      <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default ContextMenu;