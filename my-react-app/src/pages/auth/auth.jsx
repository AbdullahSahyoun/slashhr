import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [shakePassword, setShakePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usePin, setUsePin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();

    try {
      const endpoint = usePin
        ? 'http://localhost:8000/checkmail'
        : 'http://localhost:8000/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1000 - elapsed);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();

      if (usePin) {
        setTimeout(() => {
          if (data.exists) {
            alert('Login link sent to your email!');
            setErrors({ email: '', password: '' });
            // يمكنك فتح نافذة OTP هنا لاحقًا
          } else {
            setErrors({ email: 'No account associated with this email.', password: '' });
          }
          setLoading(false);
        }, delay);
        return;
      }

      // Normal login
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify(data));
        setErrors({ email: '', password: '' });
        navigate('/dashboard');
        setLoading(false);
      }, delay);
    } catch (err) {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 1000 - elapsed);

      setTimeout(() => {
        if (err.message === 'Invalid email') {
          setErrors({ email: 'No account associated with this email.', password: '' });
        } else if (err.message === 'Invalid password') {
          setErrors({ email: '', password: 'The password you entered is incorrect.' });
          setShakePassword(true);
          setTimeout(() => setShakePassword(false), 500);
        } else {
          setErrors({ email: '', password: 'Login failed. Please try again.' });
        }
        setLoading(false);
      }, delay);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email }),
      });

      if (!response.ok) throw new Error('Failed to send reset instructions');

      setResetSent(true);
      setErrors({ email: 'Password reset instructions sent to your email' });
    } catch (err) {
      setErrors({ email: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container fade-in">
      <div className="left">
        {showForgotPassword ? (
          <div className="login-box fade-in">
            <div className="logo">
              <img src="/imgs/logo.svg" alt="SlasHR logo" />
            </div>
            <h1 className="txt-left">Forgot your password?</h1>
            <p className="txt-left">Enter your email to receive a Quick Temporary Password (QTP)</p>

            <form onSubmit={handleForgotPassword}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={resetSent}
              />
              {errors.email && (
                <p className={`input-error ${resetSent ? 'success' : ''}`}>
                  {errors.email}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={loading || resetSent}
              >
                {loading ? (
                  <div className="spinner-wrapper">
                    <span className="spinner"></span>
                  </div>
                ) : (
                  resetSent ? 'Sent ✓' : 'Send me QTP'
                )}
              </button>

              <p className="footer-text">
                Remember your password?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowForgotPassword(false);
                    setResetSent(false);
                    setErrors({ email: '', password: '' });
                  }}
                >
                  Back to login
                </a>
              </p>
            </form>
          </div>
        ) : (
          <div className="login-box">
            <div className="logo">
              <img src="/imgs/logo.svg" alt="SlasHR logo" />
            </div>
            <h1 className="txt-left">
              Welcome to <span>SlasHR!</span>
            </h1>
            <p className="txt-left">Enter your Credentials to access your account</p>

            <form className="mt-4" onSubmit={handleLogin}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="input-error">{errors.email}</p>}

              {!usePin && (
                <div className="fade-in">
                  <label htmlFor="password">Password</label>
                  <div className="password-toggle">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`password-input ${shakePassword ? 'shake' : ''}`}
                      required
                    />
                    <i
                      className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                  {errors.password && <p className="input-error">{errors.password}</p>}
                </div>
              )}

              <a
                href="#"
                className="forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  setShowForgotPassword(true);
                }}
              >
                Forgot password
              </a>

              <div className="login-toggle">
                <input
                  type="checkbox"
                  id="toggle-login"
                  className="toggle-checkbox"
                  checked={usePin}
                  onChange={(e) => setUsePin(e.target.checked)}
                />
                <div className="toggle-text">
                  <label htmlFor="toggle-login" className="toggle-title">
                    <span className="txt-hint">Log in without password</span>
                  </label>
                  <p className="toggle-subtitle">
                    <span className="txt-hint">Send me a link to log in</span>
                  </p>
                </div>
              </div>

              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <div className="spinner-wrapper">
                    <span className="spinner"></span>
                  </div>
                ) : (
                  'Log in'
                )}
              </button>

              <div className="divider txt-colro-primary">Or continue with</div>

              <div className="social-login">
                <button type="button">
                  <i className="fab fa-google"></i> Continue with Google
                </button>
                <button type="button">
                  <i className="fab fa-microsoft"></i> Continue with Microsoft
                </button>
              </div>

              <p className="footer-text">
                You do not have an account? <a href="#">Get started now</a>
              </p>
            </form>
          </div>
        )}
      </div>

      <div className="right">
        <div className="promo-box">
          <div className="promo-content">
            <h2>All-in-one HR<br />software to<br />streamline your HR</h2>
            <img src="/imgs/ladylogin.png" alt="HR Person" className="main-image" />
            <img src="/imgs/logo.svg" alt="S Logo" className="logo-overlay" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
