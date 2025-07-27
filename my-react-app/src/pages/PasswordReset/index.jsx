import React, { useState } from 'react';

const PasswordResetPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = () => {
    // Handle password reset logic here
    console.log('Password reset submitted');
  };

  return (
    <div className="w-full bg-global-1 flex flex-row justify-end items-center min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[42%] flex flex-col justify-start items-start px-4 sm:px-6 lg:px-0 lg:pl-[261px] py-8 lg:py-0">
        {/* Logo Section */}
        <div className="flex flex-row justify-start items-center mb-8 lg:mb-[32px]">
          <img 
            src="/images/img_xmlid_2.png" 
            alt="SlasHR Logo" 
            className="w-[24px] sm:w-[32px] lg:w-[48px] h-[26px] sm:h-[35px] lg:h-[52px]"
          />
          <div className="flex flex-col justify-start items-center ml-2 lg:ml-[8px]">
            <img 
              src="/images/img_xmlid_50.svg" 
              alt="SlasHR Text" 
              className="w-[48px] sm:w-[72px] lg:w-[96px] h-[10px] sm:h-[15px] lg:h-[20px]"
            />
            <img 
              src="/images/img_xmlid_8.svg" 
              alt="SlasHR Tagline" 
              className="w-[48px] sm:w-[72px] lg:w-[96px] h-[2px] sm:h-[3px] lg:h-[4px] mt-1 lg:mt-[6px]"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[428px]">
          {/* Header */}
          <div className="flex flex-col justify-start items-start mb-4 lg:mb-[8px]">
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-poppins font-bold leading-[36px] sm:leading-[42px] lg:leading-[48px] text-left text-global-1 mb-2">
              Reset password
            </h1>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-poppins font-medium leading-[21px] sm:leading-[22px] lg:leading-[24px] text-left text-global-1 w-full lg:w-[88%]">
              Your new password must be different from the passwords previously used.
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col justify-start items-center w-full mt-4 lg:mt-[16px]">
            {/* Password Field */}
            <div className="flex flex-col justify-start items-start w-full mb-2 lg:mb-0">
              <label className="text-[14px] lg:text-[15px] font-poppins font-medium leading-[21px] lg:leading-[23px] text-left text-global-1 mb-1 lg:mb-[6px]">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full pt-[12px] pr-[30px] pb-[12px] pl-[12px] border border-[#e4e4e4] rounded-[10px] text-[12px] font-poppins font-medium leading-[18px] text-left text-edittext-1 placeholder-edittext-1 focus:outline-none focus:ring-2 focus:ring-global-3 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[12px] top-1/2 transform -translate-y-1/2"
                >
                  <img 
                    src="/images/img_hide.png" 
                    alt="Toggle password visibility" 
                    className="w-[18px] h-[12px]"
                  />
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col justify-start items-start w-full mt-2 lg:mt-[8px]">
              <label className="text-[14px] lg:text-[15px] font-poppins font-medium leading-[21px] lg:leading-[23px] text-left text-global-1 mb-1 lg:mb-[4px]">
                Confirm password
              </label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-full pt-[12px] pr-[30px] pb-[12px] pl-[12px] border border-[#e4e4e4] rounded-[10px] text-[12px] font-poppins font-medium leading-[18px] text-left text-edittext-1 placeholder-edittext-1 focus:outline-none focus:ring-2 focus:ring-global-3 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-[12px] top-1/2 transform -translate-y-1/2"
                >
                  <img 
                    src="/images/img_hide.png" 
                    alt="Toggle password visibility" 
                    className="w-[18px] h-[12px]"
                  />
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetPassword}
              className="w-full pt-[14px] pr-[34px] pb-[14px] pl-[34px] mt-6 lg:mt-[26px] bg-global-3 rounded-[10px] text-[14px] font-inter font-bold leading-[17px] text-center capitalize text-global-5 hover:bg-opacity-90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-global-3 focus:ring-offset-2"
            >
              Reset password
            </button>

            {/* Progress Lines */}
            <div className="flex flex-row justify-start items-center w-full mt-4 lg:mt-[16px] gap-2">
              <div className="w-[37px] sm:w-[55px] lg:w-[74px] h-[4px] bg-global-3 rounded-[2px]"></div>
              <div className="w-[37px] sm:w-[55px] lg:w-[74px] h-[4px] bg-global-3 rounded-[2px]"></div>
              <div className="w-[37px] sm:w-[55px] lg:w-[74px] h-[4px] bg-global-3 rounded-[2px]"></div>
              <div className="w-[37px] sm:w-[55px] lg:w-[74px] h-[4px] bg-global-8 rounded-[2px]"></div>
              <div className="w-[37px] sm:w-[55px] lg:w-[74px] h-[4px] bg-global-8 rounded-[2px]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="hidden lg:flex w-[42%] relative justify-center items-center min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/img_rectangle_4.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center px-[72px] py-[208px]">
          <div className="flex flex-row justify-start items-center w-full">
            {/* Logo Circle */}
            <div className="flex flex-col justify-center items-center w-auto bg-global-1 rounded-[38px] p-[18px] mb-[48px] self-end">
              <img 
                src="/images/img_thunderbolt_1.png" 
                alt="Thunderbolt Logo" 
                className="w-[42px] h-[42px]"
              />
            </div>

            {/* Main Content Card */}
            <div className="flex flex-col justify-start items-start bg-global-2 border border-[#ffffff84] rounded-[46px] p-[66px_50px] ml-[-40px] shadow-[0px_4px_13px_#888888ff] w-[76%]">
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-poppins font-bold leading-[35px] sm:leading-[40px] lg:leading-[46px] text-left text-global-5 mb-[344px]">
                All-in-one HR<br />
                software to<br />
                streamline<br />
                your HR
              </h2>
            </div>
          </div>

          {/* Woman with Laptop Image */}
          <img 
            src="/images/img_women_with_tab_1.png" 
            alt="Woman with laptop" 
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;