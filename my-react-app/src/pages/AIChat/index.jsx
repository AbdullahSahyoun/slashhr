import React, { useState } from 'react';

const AIChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello, I am your assistant SlasHR. Do you have a question? I am here to help you.',
      timestamp: '9:33'
    },
    {
      id: 2,
      type: 'user',
      text: 'Error in hospitals from disorder or the error of the noble with the noble Perseus.',
      timestamp: '9:33'
    },
    {
      id: 3,
      type: 'user',
      text: 'Error in hospitals from disorder or the error of the noble with the noble Perseus.Error in hospitals from disorder or the error of the noble with the noble Perseus.',
      timestamp: '9:33'
    }
  ]);

  const quickActions = [
    'Company',
    'Request a letter',
    'Attendance',
    'Documents',
    'Request a leave'
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        text: message,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: false 
        })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: action,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      })
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="w-full h-screen bg-[#ffffff] flex justify-end">
      <div className="w-full max-w-[670px] flex flex-col">
        {/* Header */}
        <div className="pt-[26px] pb-[26px]">
          <div className="px-[24px]">
            <div className="flex justify-between items-start mb-[24px]">
              <div className="flex items-center">
                <h1 className="text-[22px] font-inter font-bold leading-[27px] text-left text-[#2b6171] mr-[4px]">
                  Ask SlasHR Ai
                </h1>
                <button className="mt-[6px]">
                  <img 
                    src="/images/img_vector.svg" 
                    alt="close" 
                    className="w-[14px] h-[14px]"
                  />
                </button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#eeeeee]"></div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 px-[40px] overflow-y-auto">
          {/* Today Label */}
          <div className="text-center mb-[26px]">
            <p className="text-[15px] font-inter font-bold leading-[19px] text-[#626262]">
              Today
            </p>
          </div>

          {/* Messages */}
          <div className="space-y-[6px]">
            {messages.map((msg, index) => (
              <div key={msg.id} className="w-full">
                {msg.type === 'bot' ? (
                  <div className="flex items-center justify-start mb-[10px]">
                    <img 
                      src="/images/img_vector_blue_gray_700.svg" 
                      alt="bot avatar" 
                      className="w-[34px] h-[34px] self-end mr-[10px]"
                    />
                    <div className="bg-[#f0f0f0] rounded-[20px] rounded-br-[0px] px-[8px] py-[10px] max-w-[46%]">
                      <p className="text-[15px] font-inter font-normal leading-[24px] text-left text-[#000000]">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-end mb-[10px]">
                    <div className="bg-[#2b6171] rounded-[20px] rounded-br-[0px] px-[12px] py-[12px] max-w-[42%] mb-[10px]">
                      <p className="text-[15px] font-inter font-normal leading-[18px] text-left text-[#ffffff]">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                )}
                <div className={`text-[12px] font-inter font-normal leading-[15px] text-[#626262] ${msg.type === 'bot' ? 'ml-[48px]' : 'text-right mr-[10px]'}`}>
                  {msg.timestamp}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-[324px] mb-[24px]">
            <div className="flex flex-wrap gap-[8px] justify-center">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="bg-[#2b6171] rounded-[10px] px-[10px] py-[10px] hover:bg-[#1e4a57] transition-colors duration-200"
                >
                  <span className="text-[12px] font-inter font-semibold leading-[15px] text-[#ffffff]">
                    {action}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Separator Line */}
          <div className="w-full h-[1px] bg-[#ebebeb] mb-[38px]"></div>
        </div>

        {/* Message Input */}
        <div className="px-[34px] pb-[6px] mr-[42px] ml-[34px]">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-[15px] font-inter font-normal leading-[19px] text-[#626262] bg-transparent border-none outline-none placeholder-[#626262]"
            />
            <button 
              onClick={handleSendMessage}
              className="ml-[4px] hover:opacity-70 transition-opacity duration-200"
            >
              <img 
                src="/images/img_group_644.svg" 
                alt="send" 
                className="w-[12px] h-[14px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;