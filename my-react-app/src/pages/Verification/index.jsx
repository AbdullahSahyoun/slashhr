import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import OtpView from '../../components/ui/OtpView';
import axios from 'axios';

const VerificationPage = () => {
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');

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

  const handleOtpChange = (value) => setOtpValue(value);

  const handleSubmit = async () => {
    if (!email || otpValue.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/auth/verify-login-code`,
        { email, code: otpValue }
      );

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      navigate('/employee/professional/contracts');
    } catch (error) {
      alert(error.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/auth/request-login-code`, {
        email
      });
      setTimeLeft(300);
      setOtpValue('');
      alert('New code sent to your email.');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to resend code');
    }
  };

  return (
    <div className="w-full bg-[#ffffff] flex flex-row justify-end items-center min-h-screen">
      {/* Left Section - Form */}
      <div className="w-full lg:w-[42%] flex flex-col justify-start items-center gap-[16px] md:gap-[32px] px-4 sm:px-6 lg:px-0 py-8 lg:py-0">
        {/* Logo */}
        <div className="flex flex-row justify-start items-center gap-[8px] w-full max-w-[400px]">
          <img src="/images/img_xmlid_2.png" alt="SlasHR Logo" className="w-[24px] h-[26px] sm:w-[48px] sm:h-[52px]" />
          <div className="flex flex-col justify-start items-center gap-[3px] sm:gap-[6px] flex-1">
            <img src="/images/img_xmlid_50.svg" alt="SlasHR" className="w-[48px] h-[10px] sm:w-[96px] sm:h-[20px]" />
            <img src="/images/img_xmlid_8.svg" alt="Tagline" className="w-[48px] h-[2px] sm:w-[96px] sm:h-[4px]" />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex flex-col justify-start items-start gap-[10px] w-full max-w-[400px]">
          <h1 className="text-[20px] sm:text-[32px] font-poppins font-bold text-[#000000]">Verification code</h1>
          <p className="text-[14px] sm:text-[16px] font-poppins font-medium text-[#000000]">We have sent you the code.</p>

          <div className="mt-[18px] w-full">
            <OtpView
              length={6}
              value={otpValue}
              onChange={handleOtpChange}
              className="justify-center sm:justify-start"
              inputClassName="w-[40px] h-[40px] sm:w-[48px] sm:h-[56px] text-[16px] sm:text-[18px] border border-[#e0e0e0] rounded-[12px]"
            />
          </div>

          <p className="text-[12px] font-medium text-[#626262] mt-2">
            The code expires in: <span className="text-black font-bold">{formatTime(timeLeft)}</span>
          </p>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#2b6171] text-white text-[14px] font-semibold py-[12px] px-[34px] rounded-[10px] hover:bg-[#1e4a57] transition duration-200 mt-2"
          >
            {loading ? 'Verifying...' : 'Submit'}
          </button>

          <p className="text-[12px] text-[#626262] mt-4">
            Didn’t receive a code?{' '}
            <button onClick={handleResend} className="text-[#2b6171] font-bold underline hover:text-[#1e4a57]">
              Resend
            </button>
          </p>
        </div>
      </div>

      {/* Right Image Panel */}
      <div className="hidden lg:flex w-[42%] relative justify-center items-center min-h-screen">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/img_rectangle_4.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-[72px]">
          <div className="flex flex-row justify-start items-center w-full max-w-[684px] relative">
            <div className="absolute bottom-[48px] right-0 z-20 bg-white rounded-[38px] p-[18px] shadow-lg">
              <img src="/images/img_thunderbolt_1.png" alt="Icon" className="w-[42px] h-[42px]" />
            </div>
            <div className="bg-[#ffffff35] border border-[#ffffff84] rounded-[46px] p-[50px] shadow-[0px_4px_13px_#888888ff] w-full max-w-[548px]">
              <h2 className="text-[32px] font-bold text-white mb-[344px] leading-[46px]">
                All-in-one HR<br />
                software to<br />
                streamline<br />
                your HR
              </h2>
            </div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <img src="/images/img_women_with_tab_1.png" alt="Visual" className="w-[666px] h-[610px] object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
