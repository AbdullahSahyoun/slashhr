import React, { useState } from 'react';

const SocialPost = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'Zakaria Bensouda',
        avatar: '/images/img_ellipse_8_40x40.png',
        time: '2 min'
      },
      message: 'Happy Ramadan, Amina Alawi !',
      replies: [
        'View 2 more replies'
      ]
    },
    {
      id: 2,
      user: {
        name: 'Issac Olsen',
        avatar: '/images/img_ellipse_9.png',
        time: '30 min'
      },
      message: 'Happy Ramadan, Amina Alawi !'
    },
    {
      id: 3,
      user: {
        name: 'Carla Frye',
        avatar: '/images/img_ellipse_10_40x40.png',
        time: '1h'
      },
      message: 'Happy Ramadan, Amina Alawi !'
    },
    {
      id: 4,
      user: {
        name: 'Mollie Hooper',
        avatar: '/images/img_ellipse_11.png',
        time: '1h'
      },
      message: 'Happy Ramadan, Amina Alawi !'
    },
    {
      id: 5,
      user: {
        name: 'John Rodgers',
        avatar: '/images/img_ellipse_12.png',
        time: '18h'
      },
      message: 'Happy Ramadan, Amina Alawi !'
    },
    {
      id: 6,
      user: {
        name: 'John Rodgers',
        avatar: '/images/img_ellipse_12.png',
        time: '18h'
      },
      message: 'Happy Ramadan, Amina Alawi !'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const shoutOutUsers = [
    {
      name: 'Jaylynn Cote',
      avatar: '/images/img_ellipse_247.png'
    },
    {
      name: 'Jael Calhoun',
      avatar: '/images/img_ellipse_247_22x22.png'
    },
    {
      name: 'Rey Willis',
      avatar: '/images/img_ellipse_247_1.png'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-end items-start pt-[60px] pr-[60px]">
      {/* Close Button */}
      <div className="flex justify-end items-end w-auto mb-[100px]">
        <button 
          className="w-[32px] h-[32px] bg-white rounded-[5px] p-[8px] shadow-[0px_2px_4px_#00000014] hover:bg-gray-50 transition-colors duration-200"
          aria-label="Close"
        >
          <img 
            src="/images/img_vector.svg" 
            alt="close" 
            className="w-full h-full"
          />
        </button>
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-[1600px] flex justify-center items-center">
        <div className="w-full max-w-[1292px] bg-white rounded-[20px_0px_20px_0px] flex flex-row">
          {/* Ramadan Image */}
          <div className="w-[62%] flex-shrink-0">
            <img 
              src="/images/img_image.png" 
              alt="Ramadan Kareem" 
              className="w-full h-[796px] object-cover rounded-[20px_0px_20px_0px]"
            />
          </div>

          {/* Social Media Content */}
          <div className="w-[36%] flex flex-col justify-start items-center p-0">
            {/* Post Header */}
            <div className="w-full flex flex-col gap-[12px] justify-start items-center px-[38px] pt-[18px]">
              <div className="w-full flex flex-row justify-start items-start">
                <div className="flex flex-row justify-start items-start gap-[28px]">
                  {/* User Avatar */}
                  <img 
                    src="/images/img_ellipse_8.png" 
                    alt="Amina Alawi" 
                    className="w-[40px] h-[40px] rounded-[20px] flex-shrink-0"
                  />
                  
                  {/* User Info */}
                  <div className="flex flex-col gap-[2px] justify-start items-start flex-1">
                    <p className="text-[12px] font-poppins font-medium leading-[18px] text-left text-black">
                      <span className="font-semibold">Amina Alawi posted a </span>
                      <span className="font-semibold text-global-2">Shout-out.</span>
                    </p>
                    
                    <div className="flex flex-row justify-start items-center gap-[8px]">
                      <img 
                        src="/images/img_group_2542.svg" 
                        alt="expertise" 
                        className="w-[12px] h-[12px]"
                      />
                      <span className="text-[10px] font-inter font-medium leading-[13px] text-center text-black">
                        Expertise
                      </span>
                    </div>
                    
                    <div className="flex flex-row justify-start items-center gap-[8px]">
                      <span className="text-[10px] font-inter font-medium leading-[13px] text-left text-global-3">
                        6 days ago
                      </span>
                      <div className="flex flex-row justify-start items-center gap-[8px] px-[8px]">
                        <img 
                          src="/images/img_frame_gray_700_10x10.svg" 
                          alt="visibility" 
                          className="w-[10px] h-[10px]"
                        />
                        <span className="text-[10px] font-inter font-medium leading-[13px] text-left text-global-3">
                          Everyone
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* More Options */}
                <img 
                  src="/images/img_horizontal.svg" 
                  alt="more options" 
                  className="w-[20px] h-[5px] mt-[6px] cursor-pointer hover:opacity-70"
                />
              </div>
              
              {/* Divider */}
              <div className="w-full h-[1px] bg-global-6"></div>
            </div>

            {/* Comments Section */}
            <div className="w-full flex-1 overflow-y-auto px-[38px] py-[16px]">
              <div className="flex flex-col gap-[12px]">
                {comments.map((comment, index) => (
                  <div key={comment.id} className="flex flex-row gap-[22px] justify-start items-start">
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name} 
                      className="w-[40px] h-[40px] rounded-[20px] flex-shrink-0"
                    />
                    
                    <div className="flex flex-col gap-[2px] justify-start items-start flex-1">
                      <div className="flex flex-row justify-start items-center gap-[8px] w-full">
                        <span className="text-[15px] font-inter font-medium leading-[19px] text-left text-black">
                          {comment.user.name}
                        </span>
                        <span className="text-[12px] font-inter font-light leading-[15px] text-left text-global-3">
                          {comment.user.time}
                        </span>
                      </div>
                      
                      <p className="text-[15px] font-inter font-light leading-[19px] text-left text-black">
                        {comment.message}
                      </p>
                      
                      <button className="text-[12px] font-inter font-light leading-[15px] text-left text-global-3 hover:text-global-2 transition-colors duration-200">
                        Replay
                      </button>
                      
                      {comment.replies && (
                        <button className="text-[10px] font-inter font-light leading-[13px] text-left text-global-3 hover:text-global-2 transition-colors duration-200">
                          {comment.replies[0]}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shout-out Section */}
            <div className="w-[92%] flex flex-col gap-[10px] justify-start items-start px-[38px] py-[12px]">
              <p className="text-[15px] font-inter font-bold leading-[19px] text-left text-black">
                Shout-out to
              </p>
              
              <div className="flex flex-row gap-[16px] justify-start items-center w-full">
                {shoutOutUsers.map((user, index) => (
                  <button 
                    key={index}
                    className="flex flex-row gap-[8px] items-center bg-global-3 rounded-[5px] px-[8px] py-[6px] hover:bg-opacity-90 transition-all duration-200"
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-[22px] h-[22px] rounded-full"
                    />
                    <span className="text-[15px] font-inter font-normal leading-[19px] text-left text-white">
                      {user.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Engagement Section */}
            <div className="w-full flex flex-col gap-[16px] justify-start items-center px-[38px] py-[22px]">
              <div className="w-full h-[1px] bg-global-6"></div>
              
              <div className="w-full flex flex-row justify-center items-center gap-[18px]">
                <div className="flex flex-row justify-center items-start gap-[8px]">
                  <img 
                    src="/images/img_heart_2_1.png" 
                    alt="likes" 
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-[12px] font-inter font-medium leading-[15px] text-left text-black">
                    4,650 likes
                  </span>
                </div>
                
                <div className="flex flex-row justify-start items-center gap-[12px] px-[18px]">
                  <img 
                    src="/images/img_chat_bubble_1.png" 
                    alt="comments" 
                    className="w-[24px] h-[24px]"
                  />
                  <span className="text-[12px] font-inter font-medium leading-[15px] text-left text-black">
                    57 comments
                  </span>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-global-6"></div>
            </div>

            {/* Comment Input */}
            <div className="w-full flex flex-row justify-start items-center gap-[12px] px-[38px] pb-[24px]">
              <div className="flex flex-row justify-start items-center gap-[12px] flex-1">
                <img 
                  src="/images/img_group_645.svg" 
                  alt="comment icon" 
                  className="w-[18px] h-[18px]"
                />
                <input
                  type="text"
                  placeholder="Type your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 text-[12px] font-inter font-normal leading-[15px] text-left text-global-3 bg-transparent border-none outline-none placeholder-global-3"
                />
              </div>
              
              <button 
                className="w-[12px] h-[14px] hover:opacity-70 transition-opacity duration-200"
                onClick={() => {
                  if (newComment.trim()) {
                    // Handle comment submission
                    setNewComment('');
                  }
                }}
              >
                <img 
                  src="/images/img_group_644.svg" 
                  alt="send comment" 
                  className="w-full h-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialPost;