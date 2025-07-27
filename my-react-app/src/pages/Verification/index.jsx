import React, { useState, useEffect } from 'react';
import OtpView from '../../components/ui/OtpView';

const VerificationPage = () => {
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value) => {
    setOtpValue(value);
  };

  const handleSubmit = () => {
    console.log('OTP submitted:', otpValue);
  };

  const handleResend = () => {
    setTimeLeft(300);
    setOtpValue('');
    console.log('Resend code');
  };

  return (
    <div className="w-full bg-[#ffffff] flex flex-row justify-end items-center min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[42%] flex flex-col justify-start items-center gap-[16px] md:gap-[32px] px-4 sm:px-6 lg:px-0 py-8 lg:py-0">
        {/* Logo and Brand */}
        <div className="flex flex-row justify-start items-center gap-[8px] w-full max-w-[400px]">
          <img 
            src="/images/img_xmlid_2.png" 
            alt="SlasHR Logo" 
            className="w-[24px] h-[26px] sm:w-[48px] sm:h-[52px]"
          />
          <div className="flex flex-col justify-start items-center gap-[3px] sm:gap-[6px] flex-1">
            <img 
              src="/images/img_xmlid_50.svg" 
              alt="SlasHR" 
              className="w-[48px] h-[10px] sm:w-[96px] sm:h-[20px]"
            />
            <img 
              src="/images/img_xmlid_8.svg" 
              alt="Everyone has a talent" 
              className="w-[48px] h-[2px] sm:w-[96px] sm:h-[4px]"
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex flex-col justify-start items-start gap-[5px] sm:gap-[10px] w-full max-w-[400px]">
          {/* Title */}
          <h1 className="text-[20px] sm:text-[32px] font-poppins font-bold leading-[30px] sm:leading-[48px] text-left text-[#000000] w-auto">
            Verification code
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] sm:text-[16px] font-poppins font-medium leading-[20px] sm:leading-[24px] text-left text-[#000000] w-auto mt-[4px] sm:mt-[8px]">
            We have sent you the code.
          </p>

          {/* OTP Input */}
          <div className="mt-[9px] sm:mt-[18px] w-full">
            <OtpView
              length={6}
              value={otpValue}
              onChange={handleOtpChange}
              className="justify-center sm:justify-start"
              inputClassName="w-[40px] h-[40px] sm:w-[48px] sm:h-[56px] text-[16px] sm:text-[18px] border-[1px] border-[#e0e0e0] rounded-[8px] sm:rounded-[12px]"
            />
          </div>

          {/* Timer and Submit Button */}
          <div className="flex flex-col justify-start items-start gap-[5px] sm:gap-[10px] w-full mt-[7px] sm:mt-[14px]">
            {/* Timer */}
            <p className="text-[10px] sm:text-[12px] font-inter font-medium leading-[20px] sm:leading-[24px] text-left w-auto">
              <span className="text-[#626262]">The code expires in :</span>
              <span className="text-[#000000]"> </span>
              <span className="text-[#000000] font-bold">{formatTime(timeLeft)}</span>
            </p>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="bg-[#2b6171] text-[#ffffff] text-[12px] sm:text-[14px] font-inter font-semibold leading-[14px] sm:leading-[17px] text-center px-[17px] sm:px-[34px] py-[7px] sm:py-[14px] rounded-[10px] w-auto hover:bg-[#1e4a57] transition-colors duration-200"
            >
              Submit
            </button>
          </div>

          {/* Resend Link */}
          <div className="mt-[9px] sm:mt-[18px] w-auto">
            <p className="text-[10px] sm:text-[12px] font-inter font-medium leading-[16px] sm:leading-[20px] text-left text-[#626262]">
              <span>Did not receive a code?</span>
              <br />
              <button
                onClick={handleResend}
                className="text-[#2b6171] font-bold underline hover:text-[#1e4a57] transition-colors duration-200"
              >
                Resend.
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="hidden lg:flex w-[42%] relative justify-center items-center min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/images/img_rectangle_4.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-[36px] sm:px-[72px]">
          {/* Main Content Card */}
          <div className="flex flex-row justify-start items-center w-full max-w-[684px] relative">
            {/* Logo Circle */}
            <div className="absolute bottom-[48px] right-0 z-20 bg-[#ffffff] rounded-[38px] p-[18px] shadow-lg">
              <img 
                src="/images/img_thunderbolt_1.png" 
                alt="SlasHR Icon" 
                className="w-[42px] h-[42px]"
              />
            </div>

            {/* Content Card */}
            <div className="bg-[#ffffff35] border border-[#ffffff84] rounded-[46px] p-[33px] sm:p-[50px] pt-[33px] sm:pt-[66px] pb-[33px] sm:pb-[66px] ml-[-20px] shadow-[0px_4px_13px_#888888ff] w-full max-w-[548px]">
              <h2 className="text-[20px] sm:text-[32px] font-poppins font-bold leading-[30px] sm:leading-[46px] text-left text-[#ffffff] mb-[172px] sm:mb-[344px]">
                All-in-one HR<br />
                software to<br />
                streamline<br />
                your HR
              </h2>
            </div>
          </div>

          {/* Woman with Laptop Image */}
          <div className="absolute inset-0 flex justify-center items-center">
            <img 
              src="/images/img_women_with_tab_1.png" 
              alt="Woman with laptop" 
              className="w-[333px] h-[305px] sm:w-[666px] sm:h-[610px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;