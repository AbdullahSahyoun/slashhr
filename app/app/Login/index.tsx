import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_types/navigation.d';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const Login: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginWithoutPassword, setLoginWithoutPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const API_URL = process.env.EXPO_PUBLIC_API_URL || `http://${process.env.EXPO_PUBLIC_IP || 'localhost'}:3000`;

  const handleLogin = async () => {
    // Reset previous errors
    setEmailError('');
    setPasswordError('');
    setError('');

    // Email validation
    if (!email.trim()) {
      setEmailError('Please enter your email');
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Password validation (only when password is required)
    if (!loginWithoutPassword) {
      if (!password.trim()) {
        setPasswordError('Please enter your password');
        return;
      }
    }

    setLoading(true);
    try {
      const endpoint = loginWithoutPassword 
        ? `${API_URL}/auth/request-login-code` 
        : `${API_URL}/auth/login`;
      
      const body = loginWithoutPassword 
        ? { email } 
        : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle specific errors
        if (data.error === 'User not found') {
          setEmailError('This email is not linked to any company');
        } else if (data.error === 'Invalid password') {
          setPasswordError('The password you entered is incorrect.');
        } else {
          setError(data.error || 'An unexpected error occurred');
        }
      } else {
        // Handle successful responses
        if (loginWithoutPassword) {
          navigation.navigate('Verification', { email });
        } else {
          navigation.navigate('Dashboard');
        }
      }
    } catch (e) {
      setError('Network error, please try again');
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleLoginWithoutPassword = () => {
    setLoginWithoutPassword(!loginWithoutPassword);
    setEmailError('');
    setPasswordError('');
    setError('');
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/img_xmlid_2.png')}
          style={styles.logoImage}
        />
        <Text style={styles.titlelogo}>SlasHR</Text>
      </View>

      <Text style={styles.title}>Log in</Text>
      <Text style={styles.subtitle}>
        Welcome to <Text style={styles.highlight}>SlasHR !</Text>
      </Text>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          style={[
            styles.input, 
            emailError ? styles.inputError : null
          ]}
          placeholder="Email address"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError('');
          }}
          editable={!loading}
        />
        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : null}
      </View>

      {/* Password Input */}
      {!loginWithoutPassword && (
        <View style={styles.inputGroup}>
          <View style={[
            styles.passwordContainer,
            passwordError ? styles.inputError : null
          ]}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Enter your Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              style={styles.showPasswordButton}
            >
              <Image
                source={
                  showPassword
                    ? require('../../assets/images/img_show.png')
                    : require('../../assets/images/img_hide.png')
                }
                style={styles.showPasswordIcon}
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
      )}

      {/* Passwordless Login Toggle */}
      <View style={styles.switchContainer}>
        <TouchableOpacity 
          onPress={toggleLoginWithoutPassword} 
          style={styles.switchBox}
        >
          <View
            style={[
              styles.switchCircle, 
              loginWithoutPassword && styles.switchCircleActive
            ]}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.switchText}>
            Log in without password  
          </Text>
          <TouchableOpacity onPress={toggleLoginWithoutPassword}>
            <Text style={styles.switchToggleText}>
              Send me a OTP to log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>
            {loginWithoutPassword ? 'Send code to email' : 'Log in'}
          </Text>
        )}
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity
        onPress={() => {
          if (email && isValidEmail(email)) {
            navigation.navigate('PasswordReset', { email });
          } else {
            Alert.alert('Please enter a valid email address.');
          }
        }}
      >
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with</Text>

      {/* Social Login Buttons */}
      <TouchableOpacity
        style={[styles.socialButton, { backgroundColor: '#fff', borderColor: '#ccc' }]}
        onPress={() => Alert.alert('Google Login pressed')}
      >
        <Image
          source={require('../../assets/images/google.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.socialButton, { backgroundColor: '#fff', borderColor: '#ccc' }]}
        onPress={() => Alert.alert('Microsoft Login pressed')}
      >
        <Image
          source={require('../../assets/images/microsoft.png')}
          style={styles.socialIconMicrosoft}
        />
        <Text style={styles.socialButtonText}>Continue with Microsoft</Text>
      </TouchableOpacity>

      {/* General Error Message */}
      {error ? (
        <Text style={[styles.errorText, { marginTop: 16 }]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f1f1f1ff', 
    paddingHorizontal: 20, 
    paddingTop: 60 
  },
  logoContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 24 
  },
  logoImage: { 
    width: 48, 
    height: 52, 
    resizeMode: 'contain' 
  },
  titlelogo: { 
    fontSize: 32, 
    fontWeight: '400', 
    color: '#0a5a68ff', 
    marginBottom: 8, 
    fontFamily: 'Poppins-Regular' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '700', 
    color: '#1b1b1bff', 
    marginBottom: 8, 
    fontFamily: 'Poppins-Regular' 
  },
  highlight: { 
    color: '#14473fff' 
  },
  subtitle: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#2b2b2cff', 
    marginBottom: 20, 
    fontFamily: 'Poppins-Regular' 
  },
  inputGroup: { 
    marginBottom: 16 
  },
  input: { 
    backgroundColor: '#e5e7eb', 
    borderRadius: 10, 
    paddingVertical: 12, 
    height: 50, 
    paddingHorizontal: 14, 
    fontSize: 14, 
    color: '#000',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  showPasswordButton: { 
    padding: 4 
  },
  showPasswordIcon: { 
    width: 18, 
    height: 18, 
    resizeMode: 'contain' 
  },
  forgotPassword: { 
    marginTop: 1, 
    marginBottom: 16, 
    color: '#000000ff', 
    fontSize: 12, 
    textAlign: 'center', 
    textDecorationLine: 'underline' 
  },
  switchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 26 
  },
  switchBox: { 
    width: 32, 
    height: 18, 
    borderRadius: 9, 
    borderWidth: 1, 
    borderColor: '#94a3b8', 
    justifyContent: 'center', 
    padding: 2 
  },
  switchCircle: { 
    width: 14, 
    height: 14, 
    borderRadius: 7, 
    backgroundColor: '#94a3b8'
  },
  switchCircleActive: { 
    backgroundColor: '#0284c7', 
    alignSelf: 'flex-end' 
  },
  switchText: { 
    fontSize: 10, 
    color: '#343435ff' 
  },
  switchToggleText: { 
    fontSize: 8, 
    color: '#7c93b6', 
    textDecorationLine: 'underline', 
    marginTop: 2 
  },
  button: { 
    backgroundColor: '#096b7cff', 
    paddingVertical: 14, 
    borderRadius: 10, 
    height: 50, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  buttonText: { 
    color: '#f8fafc', 
    fontWeight: '600', 
    fontSize: 14 
  },
  orText: { 
    fontSize: 12, 
    fontWeight: '600', 
    color: '#096b7cff', 
    textAlign: 'center', 
    marginBottom: 30, 
    marginTop: 16 
  },
  socialButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderRadius: 10, 
    paddingVertical: 20, 
    paddingHorizontal: 20,
    marginTop:40, 
    marginBottom: 1 
  },
  socialIcon: { 
    width: 26, 
    height: 26, 
    marginRight: 12, 
    resizeMode: 'contain' 
  },
  socialIconMicrosoft: { 
    width: 20, 
    height: 30, 
    marginRight: 12, 
    resizeMode: 'contain' 
  },
  socialButtonText: { 
    color: '#0f172a', 
    fontWeight: '600', 
    fontSize: 14 
  },
  errorText: { 
    color: '#ef4444', 
    fontSize: 12, 
    marginTop: 4,
    paddingHorizontal: 4,
  },
});

export default Login;