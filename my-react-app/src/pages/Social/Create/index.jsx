import React, { useState } from 'react';


const CreatePost = () => {
  const [postText, setPostText] = useState('');
  const [selectedChips, setSelectedChips] = useState([]);

  const chipItems = [
    {
      label: 'Gallery',
      leftImage: { src: '/images/img_group_white_a700_18x18.svg', width: 18, height: 18 }
    },
    {
      label: 'Gif',
      leftImage: { src: '/images/img_group_1004.svg', width: 18, height: 18 }
    },
    {
      label: 'Attachment',
      leftImage: { src: '/images/img_group_1005.svg', width: 18, height: 18 }
    },
    {
      label: 'Shout-out',
      leftImage: { src: '/images/img_group_1005_white_a700.svg', width: 18, height: 18 }
    },
    {
      label: 'Poll',
      leftImage: { src: '/images/img_group_1006.svg', width: 18, height: 18 }
    },
    {
      label: 'Value',
      leftImage: { src: '/images/img_group_1006_white_a700.svg', width: 18, height: 18 }
    }
  ];

  const handleChipClick = (chip, index) => {
    console.log('Chip clicked:', chip.label);
  };

  const handlePost = () => {
    console.log('Post created:', postText);
  };

  const handleClose = () => {
    console.log('Close modal');
  };

  return (
    <div className="flex justify-center items-start w-full">
      <div className="w-full max-w-[32%] sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[32%] mt-[26px]">
        <div className="bg-[#ffffff] rounded-[20px] flex flex-col justify-start items-center w-full">
          {/* Header */}
          <div className="flex justify-between items-center w-full mt-[22px] mx-[26px] pr-[30px] pl-[26px]">
            <h1 className="text-[22px] font-inter font-bold leading-[27px] text-left text-[#2b6171]">
              Create post
            </h1>
            <button 
              onClick={handleClose}
              className="w-[12px] h-[12px] hover:opacity-70 transition-opacity duration-200"
            >
              <img 
                src="/images/img_vector.svg" 
                alt="close" 
                className="w-full h-full"
              />
            </button>
          </div>

          {/* User Info */}
          <div className="flex justify-start items-center gap-[10px] w-full mt-[28px] mx-[26px] pr-[26px] pl-[26px]">
            <img 
              src="/images/img_ellipse_237.png" 
              alt="profile" 
              className="w-[50px] h-[50px] rounded-[24px]"
            />
            <div className="flex flex-col justify-start items-start gap-[4px] flex-1">
              <p className="text-[15px] font-inter font-medium leading-[19px] text-left text-[#000000]">
                Manal BATTACHE
              </p>
              <div className="flex justify-center items-center gap-[4px] bg-[#2b6171] rounded-[5px] px-[8px] py-[4px]">
                <img 
                  src="/images/img_frame_white_a700_10x10.svg" 
                  alt="visibility" 
                  className="w-[10px] h-[10px]"
                />
                <span className="text-[10px] font-inter font-medium leading-[13px] text-center text-[#ffffff]">
                  Everyone
                </span>
                <img 
                  src="/images/img_vector_white_a700.svg" 
                  alt="dropdown" 
                  className="w-[6px] h-[3px]"
                />
              </div>
            </div>
          </div>

          {/* Post Input */}
          <div className="w-full mt-[42px] px-[26px]">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full text-[20px] font-inter font-normal leading-[25px] text-left text-[#626262] bg-transparent border-none outline-none resize-none min-h-[100px] placeholder-[#626262]"
            />
          </div>

          {/* Chip Options */}
          <div className="w-full mt-[134px] px-[26px]">
            <div className="flex flex-wrap gap-[10px]">
              {chipItems.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleChipClick(chip, index)}
                  className="flex items-center gap-[8px] bg-[#2b6171] rounded-[5px] px-[14px] py-[6px] hover:bg-[#1e4a57] transition-colors duration-200"
                >
                  {chip.leftImage && (
                    <img 
                      src={chip.leftImage.src} 
                      alt={chip.label.toLowerCase()} 
                      className="w-[18px] h-[18px]"
                    />
                  )}
                  <span className="text-[15px] font-inter font-normal leading-[19px] text-left text-[#ffffff]">
                    {chip.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Post Button */}
          <button
            onClick={handlePost}
            className="w-full bg-[#2b6171] rounded-b-[20px] py-[22px] px-[34px] mt-[26px] hover:bg-[#1e4a57] transition-colors duration-200"
          >
            <span className="text-[17px] font-inter font-bold leading-[21px] text-center capitalize text-[#ffffff]">
              Post
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;