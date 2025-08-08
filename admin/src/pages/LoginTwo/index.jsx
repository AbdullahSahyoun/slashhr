import React, { useState } from 'react';

const LoginTwo = () => {
  const [email, setEmail] = useState('');
  const [logInWithoutPassword, setLogInWithoutPassword] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSwitchToggle = () => {
    setLogInWithoutPassword(!logInWithoutPassword);
  };

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleMicrosoftLogin = () => {
    console.log('Microsoft login clicked');
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#ffffff]">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-[42%] flex flex-col justify-start items-start px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="w-full max-w-[428px] mx-auto lg:mx-0 lg:ml-[261px]">
          {/* Logo Section */}
          <div className="flex flex-row justify-start items-center mb-8 lg:mb-[32px]">
            <img 
              src="/images/img_xmlid_2.png" 
              alt="SlasHR Logo" 
              className="w-[24px] h-[26px] sm:w-[36px] sm:h-[39px] lg:w-[48px] lg:h-[52px]"
            />
            <div className="flex flex-col justify-start items-center ml-2 sm:ml-4 lg:ml-[8px]">
              <img 
                src="/images/img_xmlid_50.svg" 
                alt="SlasHR Text" 
                className="w-[48px] h-[10px] sm:w-[72px] sm:h-[15px] lg:w-[96px] lg:h-[20px]"
              />
              <img 
                src="/images/img_xmlid_8.svg" 
                alt="SlasHR Tagline" 
                className="w-[48px] h-[2px] sm:w-[72px] sm:h-[3px] lg:w-[96px] lg:h-[4px] mt-1 sm:mt-2 lg:mt-[6px]"
              />
            </div>
          </div>

          {/* Welcome Text */}
          <h1 className="text-[20px] sm:text-[26px] lg:text-[32px] font-poppins font-bold leading-[30px] sm:leading-[39px] lg:leading-[48px] text-left text-[#000000] mb-2 lg:mb-[8px]">
            <span className="text-[#000000]">Welcome to </span>
            <span className="text-[#2b6171]">SlasHR !</span>
          </h1>

          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-poppins font-medium leading-[21px] sm:leading-[22px] lg:leading-[24px] text-left text-[#000000] mb-4 lg:mb-[10px]">
            Enter your Credentials to access your account
          </p>

          {/* Form Section */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[32px] w-full">
            {/* Email Input Section */}
            <div className="flex flex-col gap-1 sm:gap-2 lg:gap-[6px] w-full">
              <label className="text-[13px] sm:text-[14px] lg:text-[15px] font-poppins font-medium leading-[19px] sm:leading-[21px] lg:leading-[23px] text-left text-[#000000]">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-[8px] sm:px-[9px] lg:px-[10px] py-[8px] sm:py-[9px] lg:py-[10px] border border-[#e4e4e4] rounded-[10px] text-[10px] sm:text-[11px] lg:text-[12px] font-poppins font-medium leading-[15px] sm:leading-[16px] lg:leading-[18px] text-left text-[#e4e4e4] focus:outline-none focus:ring-2 focus:ring-[#2b6171] focus:border-transparent"
              />
            </div>

            {/* Switch Section */}
            <div className="flex flex-row gap-1 sm:gap-2 lg:gap-[4px] justify-center items-center w-full">
              <button
                onClick={handleSwitchToggle}
                className={`relative inline-flex h-[20px] w-[36px] sm:h-[22px] sm:w-[40px] lg:h-[24px] lg:w-[44px] items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2b6171] focus:ring-offset-2 ${
                  logInWithoutPassword ? 'bg-[#2b6171]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] lg:h-[20px] lg:w-[20px] transform rounded-full bg-white transition-transform duration-200 ${
                    logInWithoutPassword ? 'translate-x-[18px] sm:translate-x-[20px] lg:translate-x-[22px]' : 'translate-x-[2px]'
                  }`}
                />
              </button>
              <div className="flex flex-col justify-start items-start">
                <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-poppins font-medium leading-[12px] sm:leading-[13px] lg:leading-[15px] text-center text-[#000000]">
                  Log in without password
                </span>
                <span className="text-[6px] sm:text-[7px] lg:text-[8px] font-poppins font-medium leading-[9px] sm:leading-[10px] lg:leading-[12px] text-center text-[#626262]">
                  Send me a link to log in
                </span>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full px-[17px] sm:px-[25px] lg:px-[34px] py-[11px] sm:py-[12px] lg:py-[14px] bg-[#2b6171] rounded-[10px] text-[12px] sm:text-[13px] lg:text-[14px] font-inter font-semibold leading-[14px] sm:leading-[15px] lg:leading-[17px] text-center text-[#ffffff] hover:bg-[#1e4a57] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2b6171] focus:ring-offset-2"
            >
              Log in
            </button>
          </div>

          {/* Social Login Section */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-[22px] w-full mt-6 sm:mt-7 lg:mt-[32px]">
            <p className="text-[10px] sm:text-[11px] lg:text-[12px] font-inter font-semibold leading-[12px] sm:leading-[13px] lg:leading-[15px] text-center text-[#2b6171]">
              Or continue with
            </p>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex flex-row gap-[8px] sm:gap-[9px] lg:gap-[10px] justify-center items-center px-[17px] sm:px-[25px] lg:px-[34px] py-[8px] sm:py-[9px] lg:py-[10px] border border-[#2b6171] rounded-[10px] bg-[#ffffff] hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2b6171] focus:ring-offset-2"
            >
              <img 
                src="/images/img_image_2.png" 
                alt="Google" 
                className="w-[20px] h-[20px] sm:w-[23px] sm:h-[23px] lg:w-[26px] lg:h-[26px]"
              />
              <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-inter font-semibold leading-[14px] sm:leading-[15px] lg:leading-[17px] text-center text-[#000000]">
                Continue with Google
              </span>
            </button>

            {/* Microsoft Login Button */}
            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex flex-row gap-[8px] sm:gap-[9px] lg:gap-[10px] justify-center items-center px-[17px] sm:px-[25px] lg:px-[34px] py-[10px] sm:py-[11px] lg:py-[12px] border border-[#2b6171] rounded-[10px] bg-[#ffffff] hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2b6171] focus:ring-offset-2"
            >
              <img 
                src="/images/img_group.svg" 
                alt="Microsoft" 
                className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] lg:w-[20px] lg:h-[20px]"
              />
              <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-inter font-semibold leading-[14px] sm:leading-[15px] lg:leading-[17px] text-center text-[#000000]">
                Continue with Microsoft
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-poppins font-medium leading-[21px] sm:leading-[22px] lg:leading-[24px] text-left text-[#000000] mt-6 sm:mt-7 lg:mt-[32px] text-center lg:text-left">
            <span className="text-[#000000]">You do not have an account? </span>
            <span className="text-[#2b6171] cursor-pointer hover:underline">Get started now</span>
          </p>
        </div>
      </div>

      {/* Right Section - Hero Image */}
      <div className="w-full lg:w-[42%] relative bg-cover bg-center min-h-[300px] lg:min-h-screen">
        {/* Background Image */}
        <img 
          src="/images/img_rectangle_4.png" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-[72px] py-8 lg:py-[208px]">
          <div className="w-full max-w-[684px] flex flex-col justify-start items-start">
            {/* Main Content Card */}
            <div className="flex flex-row justify-start items-center w-full">
              {/* Logo Circle */}
              <div className="flex flex-col justify-center items-center w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] lg:w-[78px] lg:h-[78px] bg-[#ffffff] rounded-[30px] sm:rounded-[35px] lg:rounded-[38px] mb-8 sm:mb-10 lg:mb-[48px] self-end p-[14px] sm:p-[16px] lg:p-[18px]">
                <img 
                  src="/images/img_thunderbolt_1.png" 
                  alt="Thunderbolt" 
                  className="w-[32px] h-[32px] sm:w-[38px] sm:h-[38px] lg:w-[42px] lg:h-[42px]"
                />
              </div>

              {/* Text Card */}
              <div className="flex flex-col justify-start items-start w-full max-w-[548px] bg-[#ffffff35] border border-[#ffffff84] rounded-[36px] sm:rounded-[41px] lg:rounded-[46px] px-[30px] sm:px-[40px] lg:px-[50px] py-[40px] sm:py-[53px] lg:py-[66px] ml-[-20px] sm:ml-[-30px] lg:ml-[-40px] shadow-[0px_4px_13px_#888888ff]">
                <h2 className="text-[20px] sm:text-[26px] lg:text-[32px] font-poppins font-bold leading-[30px] sm:leading-[38px] lg:leading-[46px] text-left text-[#ffffff] mb-[200px] sm:mb-[272px] lg:mb-[344px]">
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
              className="absolute top-[130px] sm:top-[160px] lg:top-[260px] left-[20px] sm:left-[40px] lg:left-[181px] w-[300px] sm:w-[500px] lg:w-[666px] h-[250px] sm:h-[400px] lg:h-[610px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTwo;