import React, { useState } from 'react';

const LikesModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const likesData = [
    {
      id: 1,
      name: "Sara bensdiq",
      role: "Manager",
      avatar: "/images/img_ellipse_8_42x42.png"
    },
    {
      id: 2,
      name: "Noe Buckner",
      role: "Designer",
      avatar: "/images/img_ellipse_8_1.png"
    },
    {
      id: 3,
      name: "Martha Luna",
      role: "Developer",
      avatar: "/images/img_ellipse_8_2.png"
    },
    {
      id: 4,
      name: "Tomas Moreno",
      role: "Developer",
      avatar: "/images/img_ellipse_8_3.png"
    },
    {
      id: 5,
      name: "Jadon French",
      role: "Developer",
      avatar: "/images/img_ellipse_8_4.png"
    },
    {
      id: 6,
      name: "Sawyer Gamble",
      role: "Manager",
      avatar: "/images/img_ellipse_8_5.png"
    }
  ];

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-[400px] mx-auto">
        <div className="bg-white rounded-[20px] p-6 sm:p-8 md:p-9 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold font-inter text-[#2b6171] capitalize">
              Likes
            </h2>
            <button
              onClick={handleClose}
              className="w-[12px] h-[12px] flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Close modal"
            >
              <img 
                src="/images/img_vector.svg" 
                alt="close" 
                className="w-full h-full"
              />
            </button>
          </div>

          {/* Likes List */}
          <div className="flex flex-col gap-[16px] sm:gap-[18px]">
            {likesData.map((user) => (
              <div 
                key={user.id}
                className="flex items-center gap-[10px] sm:gap-[12px] hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={user.avatar}
                    alt={`${user.name} avatar`}
                    className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[42px] md:h-[42px] rounded-[18px] sm:rounded-[20px] object-cover"
                  />
                </div>

                {/* User Info */}
                <div className="flex flex-col justify-start items-start flex-1 min-w-0">
                  <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold font-inter text-[#333333] leading-[17px] sm:leading-[18px] md:leading-[19px] truncate w-full">
                    {user.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] font-light font-inter text-[#626262] leading-[17px] sm:leading-[18px] md:leading-[19px] truncate w-full">
                    {user.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikesModal;