import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailParam = queryParams.get('email');
    if (emailParam) setEmail(emailParam);
  }, [location]);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setError('Please enter all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/auth/reset-password`, {
        email,
        newPassword: password
      });

      setSuccess(res.data.message || 'Password reset successfully.');
      setTimeout(() => navigate('/'), 2500); // Redirect to login after success
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-global-1 flex flex-col lg:flex-row">
      {/* Left Section (Password Reset Form) */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-4 py-8 lg:px-0">
        <div className="w-full max-w-[428px] mx-auto">
          <h1 className="text-[32px] font-poppins font-bold text-global-1 mb-2">
            <span>Reset your </span>
            <span className="text-global-2">Password!</span>
          </h1>
          <p className="text-[16px] font-poppins font-medium text-global-1 mb-[10px]">
            Your new password must be different from previous ones.
          </p>

          {/* Password */}
          <label className="mb-1 block text-sm">Password</label>
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full border p-3 rounded-[10px] text-sm"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img src="/images/img_hide.png" alt="toggle" className="w-4 h-4" />
            </button>
          </div>

          {/* Confirm Password */}
          <label className="mb-1 block text-sm">Confirm Password</label>
          <div className="relative mb-4">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full border p-3 rounded-[10px] text-sm"
            />
            <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img src="/images/img_hide.png" alt="toggle" className="w-4 h-4" />
            </button>
          </div>

          {/* Error / Success */}
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

          {/* Submit Button */}
          <button
            disabled={loading}
            onClick={handleResetPassword}
            className={`w-full bg-global-3 text-white py-3 rounded-[10px] text-sm font-bold transition duration-200 ${loading && 'opacity-50'}`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </div>

      {/* Right Section (Image & Content) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src="/images/img_rectangle_4.png" alt="BG" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center px-[72px]">
          <div className="relative w-full max-w-[684px] h-[662px]">
            <div className="relative w-full h-full flex items-start justify-center">
              <div className="absolute bottom-[48px] left-0 w-[76px] h-[76px] bg-global-1 rounded-[38px] flex items-center justify-center z-10">
                <img src="/images/img_thunderbolt_1.png" className="w-[42px] h-[42px]" />
              </div>
              <div className="ml-[-40px] w-[548px] h-[662px] bg-global-2 border border-[#ffffff84] rounded-[46px] px-[50px] py-[66px] shadow-[0px_4px_13px_#888888ff] relative">
                <h2 className="text-[32px] font-poppins font-bold text-global-5 mb-[344px] text-center">
                  All-in-one HR<br />software to<br />streamline<br />your HR
                </h2>
              </div>
              <img src="/images/img_women_with_tab_1.png" alt="Visual" className="absolute top-[52px] left-[18px] w-[666px] h-[610px] object-contain z-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
