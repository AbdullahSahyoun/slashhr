import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import Switch from '../../components/ui/Switch';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleRememberMeChange = (checked) => setRememberMe(checked);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      console.log('Login successful:', user);

      setError('');
      navigate('/employee/professional/contracts');
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'An unexpected error occurred';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = () => console.log('Google login');
  const handleMicrosoftLogin = () => console.log('Microsoft login');

  return (
    <div className="w-full min-h-screen bg-global-1 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 flex justify-center items-center px-4 py-8 lg:px-0">
        <div className="w-full max-w-[428px] mx-auto">
          <div className="flex items-center justify-start mb-8 lg:mb-[32px]">
            <img src="/images/img_xmlid_2.png" alt="SlasHR Logo" className="w-[48px] h-[52px]" />
            <div className="ml-2 flex flex-col gap-[6px]">
              <img src="/images/img_xmlid_50.svg" alt="SlasHR Text" className="w-[96px] h-[20px]" />
              <img src="/images/img_xmlid_8.svg" alt="SlasHR Tagline" className="w-[96px] h-[4px]" />
            </div>
          </div>

          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-poppins font-bold leading-[36px] sm:leading-[42px] lg:leading-[48px] text-left text-global-1 mb-2">
            <span className="text-global-1">Welcome to </span>
            <span className="text-global-2">SlasHR !</span>
          </h1>

          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-poppins font-medium leading-[21px] sm:leading-[22px] lg:leading-[24px] text-left text-global-1 mb-[10px]">
            Enter your Credentials to access your account
          </p>

          <div className="w-full">
            <div className="mb-6">
              <label className="block text-[15px] font-poppins font-medium leading-[23px] text-left text-global-1 mb-[6px]">
                Email address
              </label>
              <EditText
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="w-full border border-edittext-1 rounded-[10px] px-4 py-3 text-[12px] font-poppins font-medium leading-[18px] text-edittext-1 placeholder:text-edittext-1"
              />
              {error === 'User not found' && (
                <p className="text-[11px] font-poppins font-medium leading-[17px] text-left text-global-4 mt-[6px]">
                  No account associated with this email.
                </p>
              )}
            </div>

            <div className="mb-6 relative">
              <label className="block text-[15px] font-poppins font-medium leading-[23px] text-left text-global-1 mb-[6px]">
                Password
              </label>
              <div className="relative">
                <EditText
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full border border-edittext-1 rounded-[10px] px-4 pr-[50px] py-3 text-[12px] font-poppins font-medium leading-[18px] text-edittext-1 placeholder:text-edittext-1"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src={showPassword ? '/images/img_show.png' : '/images/img_hide.png'}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    className="w-[18px] h-[18px]"
                  />
                </button>
              </div>
              {error === 'Invalid password' && (
                <p className="text-[12px] font-inter font-medium leading-[15px] text-left text-global-4 mt-1">
                  The password you entered is incorrect.
                </p>
              )}
              <div className="flex justify-end mt-1">
                <button className="text-[12px] font-poppins font-medium leading-[18px] text-left text-global-2">
                  Forgot password
                </button>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-[26px]">
              <Switch
                checked={rememberMe}
                onChange={handleRememberMeChange}
                size="small"
                className="mt-1"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-poppins font-medium leading-[15px] text-center text-global-1">
                  Log in without password
                </span>
                <span className="text-[8px] font-poppins font-medium leading-[12px] text-center text-global-3">
                  Send me a link to log in
                </span>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              variant="primary"
              className="w-full bg-button-1 text-global-5 rounded-[10px] py-[14px] px-[34px] text-[14px] font-inter font-semibold leading-[17px] text-center mb-[30px]"
            >
              Log in
            </Button>

            <div className="flex flex-col items-center gap-[22px]">
              <p className="text-[12px] font-inter font-semibold leading-[15px] text-center text-global-2">
                Or continue with
              </p>
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full border border-global-2 bg-global-1 text-global-1 rounded-[10px] py-[10px] px-[34px] pl-[70px] text-[14px] font-inter font-semibold leading-[17px] text-center relative"
              >
                <img src="/images/img_image_2.png" alt="Google" className="w-[26px] h-[26px] absolute left-[34px] top-1/2 transform -translate-y-1/2" />
                Continue with Google
              </Button>
              <Button
                onClick={handleMicrosoftLogin}
                variant="outline"
                className="w-full border border-global-2 bg-global-1 text-global-1 rounded-[10px] py-[12px] px-[34px] pl-[64px] text-[14px] font-inter font-semibold leading-[17px] text-center relative"
              >
                <img src="/images/img_group.svg" alt="Microsoft" className="w-[20px] h-[20px] absolute left-[34px] top-1/2 transform -translate-y-1/2" />
                Continue with Microsoft
              </Button>
            </div>

            <p className="text-[14px] sm:text-[16px] font-poppins font-medium leading-[21px] sm:leading-[24px] text-left text-global-1 mt-[32px] text-center">
              <span className="text-global-1">You do not have an account? </span>
              <button className="text-global-2">Get started now</button>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="relative w-full h-full">
          <img src="/images/img_rectangle_4.png" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center px-[72px]">
            <div className="relative w-full max-w-[684px] h-[662px]">
              <div className="relative w-full h-full flex items-start">
                <div className="absolute bottom-[48px] left-0 w-[76px] h-[76px] bg-global-1 rounded-[38px] flex items-center justify-center z-10">
                  <img src="/images/img_thunderbolt_1.png" alt="SlasHR Icon" className="w-[42px] h-[42px]" />
                </div>
                <div className="ml-[-40px] w-[548px] h-[662px] bg-global-2 border border-[#ffffff84] rounded-[46px] px-[50px] py-[66px] shadow-[0px_4px_13px_#888888ff] relative">
                  <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-poppins font-bold leading-[34px] sm:leading-[40px] lg:leading-[46px] text-left text-global-5 mb-[344px]">
                    All-in-one HR<br />software to<br />streamline<br />your HR
                  </h2>
                </div>
                <img src="/images/img_women_with_tab_1.png" alt="Professional woman with laptop" className="absolute top-[52px] left-[18px] w-[666px] h-[610px] object-contain z-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
