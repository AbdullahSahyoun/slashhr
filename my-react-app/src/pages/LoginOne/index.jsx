import React, { useState } from 'react';

const LoginOnePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = () => {
    console.log('Login clicked', { email, password, rememberMe });
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleMicrosoftLogin = () => {
    console.log('Microsoft login clicked');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleGetStarted = () => {
    console.log('Get started clicked');
  };

  return (
    <div className="w-full min-h-screen bg-[#ffffff] flex flex-row">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[428px] ml-0 lg:ml-[260px]">
          {/* Logo Section */}
          <div className="flex flex-row justify-start items-center mb-8">
            <img 
              src="/images/img_xmlid_2.png" 
              alt="SlasHR Logo" 
              className="w-[48px] h-[52px]"
            />
            <div className="flex flex-col ml-2 gap-[6px] justify-start items-center">
              <img 
                src="/images/img_xmlid_50.svg" 
                alt="SlasHR Text" 
                className="w-[96px] h-[20px]"
              />
              <img 
                src="/images/img_xmlid_8.svg" 
                alt="SlasHR Tagline" 
                className="w-[96px] h-[4px]"
              />
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-[20px] sm:text-[24px] lg:text-[32px] font-poppins font-bold leading-[30px] sm:leading-[36px] lg:leading-[48px] text-left text-[#000000] mt-8 mb-2">
            <span className="text-[#000000]">Welcome to </span>
            <span className="text-[#2b6171]">SlasHR !</span>
          </h1>

          <p className="text-[14px] sm:text-[16px] font-poppins font-medium leading-[21px] sm:leading-[24px] text-left text-[#000000] mb-[10px]">
            Enter your Credentials to access your account
          </p>

          {/* Form Section */}
          <div className="flex flex-col gap-[24px] w-full">
            {/* Email Field */}
            <div className="flex flex-col gap-[6px] w-full">
              <label className="text-[15px] font-poppins font-medium leading-[23px] text-left text-[#000000]">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-[10px] py-[10px] border border-[#e4e4e4] rounded-[10px] text-[12px] font-poppins font-medium leading-[18px] text-left text-[#e4e4e4] placeholder-[#e4e4e4] focus:outline-none focus:ring-2 focus:ring-[#2b6171] focus:border-transparent"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-[6px] w-full">
              <label className="text-[15px] font-poppins font-medium leading-[23px] text-left text-[#000000]">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-[12px] py-[12px] pr-[42px] border border-[#e4e4e4] rounded-[10px] text-[12px] font-poppins font-medium leading-[18px] text-left text-[#e4e4e4] placeholder-[#e4e4e4] focus:outline-none focus:ring-2 focus:ring-[#2b6171] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-[12px] top-1/2 transform -translate-y-1/2"
                >
                  <img 
                    src="/images/img_hide.png" 
                    alt="Toggle password visibility" 
                    className="w-[18px] h-[12px]"
                  />
                </button>
              </div>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[12px] font-poppins font-medium leading-[18px] text-left text-[#2b6171] self-end hover:underline"
              >
                Forgot password
              </button>
            </div>

            {/* Remember Me Switch */}
            <div className="flex flex-row gap-[4px] justify-center items-center w-full">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="w-4 h-4 text-[#2b6171] bg-gray-100 border-gray-300 rounded focus:ring-[#2b6171] focus:ring-2"
                />
              </div>
              <div className="flex flex-col justify-start items-start flex-1 ml-[45px]">
                <label htmlFor="rememberMe" className="text-[10px] font-poppins font-medium leading-[15px] text-center text-[#000000] cursor-pointer">
                  Log in without password
                </label>
                <p className="text-[8px] font-poppins font-medium leading-[12px] text-center text-[#626262]">
                  Send me a link to log in
                </p>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full px-[34px] py-[14px] bg-[#2b6171] rounded-[10px] text-[14px] font-inter font-semibold leading-[17px] text-center text-[#ffffff] hover:bg-[#1e4a57] transition-colors duration-200"
            >
              Log in
            </button>
          </div>

          {/* Social Login Section */}
          <div className="flex flex-col gap-[22px] justify-start items-center w-full mt-[30px]">
            <p className="text-[12px] font-inter font-semibold leading-[15px] text-center text-[#2b6171]">
              Or continue with
            </p>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex flex-row gap-[10px] justify-center items-center px-[34px] py-[10px] border border-[#2b6171] rounded-[10px] bg-[#ffffff] hover:bg-gray-50 transition-colors duration-200"
            >
              <img 
                src="/images/img_image_2.png" 
                alt="Google" 
                className="w-[26px] h-[26px]"
              />
              <span className="text-[14px] font-inter font-semibold leading-[17px] text-center text-[#000000]">
                Continue with Google
              </span>
            </button>

            {/* Microsoft Login Button */}
            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex flex-row gap-[10px] justify-center items-center px-[34px] py-[12px] border border-[#2b6171] rounded-[10px] bg-[#ffffff] hover:bg-gray-50 transition-colors duration-200"
            >
              <img 
                src="/images/img_group.svg" 
                alt="Microsoft" 
                className="w-[20px] h-[20px]"
              />
              <span className="text-[14px] font-inter font-semibold leading-[17px] text-center text-[#000000]">
                Continue with Microsoft
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-[16px] font-poppins font-medium leading-[24px] text-left text-[#000000] mt-8">
            <span className="text-[#000000]">You do not have an account? </span>
            <button
              onClick={handleGetStarted}
              className="text-[#2b6171] hover:underline"
            >
              Get started now
            </button>
          </p>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="hidden lg:flex w-[50%] relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/img_rectangle_4.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative w-full h-full flex justify-center items-center px-[72px]">
          <div className="w-full max-w-[684px] h-[662px] relative">
            {/* Logo Circle */}
            <div className="absolute bottom-[48px] right-0 w-[78px] h-[78px] bg-[#ffffff] rounded-[38px] flex justify-center items-center shadow-[0px_4px_13px_#888888ff]">
              <img 
                src="/images/img_thunderbolt_1.png" 
                alt="SlasHR Icon" 
                className="w-[42px] h-[42px]"
              />
            </div>

            {/* Text Card */}
            <div className="absolute top-0 left-[40px] w-[548px] h-[662px] bg-[#ffffff35] border border-[#ffffff84] rounded-[46px] px-[50px] py-[66px] shadow-[0px_4px_13px_#888888ff]">
              <h2 className="text-[32px] font-poppins font-bold leading-[46px] text-left text-[#ffffff] mb-[344px]">
                All-in-one HR<br />
                software to<br />
                streamline<br />
                your HR
              </h2>
            </div>

            {/* Woman with Laptop Image */}
            <img 
              src="/images/img_women_with_tab_1.png" 
              alt="Woman with laptop" 
              className="absolute top-[52px] left-[18px] w-[666px] h-[610px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOnePage;