// app/Verification/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { email } = useLocalSearchParams<{ email: string }>();import OtpView from '@/components/ui/OtpView';

export default function VerificationScreen() {
  // Get 'email' param from the URL/search params
const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();

  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!email || otpValue.length !== 6) {
      Alert.alert('Invalid', 'Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/auth/verify-login-code`,
        { email, code: otpValue }
      );

      const { token } = response.data;
      // TODO: securely store token, e.g. SecureStore

      Alert.alert('Success', 'Code verified successfully');
      // Navigate to PasswordReset screen with email param
      router.push({
        pathname: '/PasswordReset',
        params: { email },
      });
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/auth/request-login-code`,
        { email }
      );
      setTimeLeft(300);
      setOtpValue('');
      Alert.alert('Sent', 'New code sent to your email.');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to resend code');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
    

      {/* Title */}
      <Text style={styles.title}>Verification code</Text>
      <Text style={styles.subtitle}>We have sent you the code.</Text>

      {/* OTP Input */}
      <OtpView
        length={6}
        value={otpValue}
        onChange={setOtpValue}
        style={styles.otpContainer}
        inputStyle={styles.otpInput}
      />

      <Text style={styles.timer}>
        The code expires in:{' '}
        <Text style={styles.timerBold}>{formatTime(timeLeft)}</Text>
      </Text>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>

      {/* Resend */}
      <Text style={styles.resendText}>
        Didn’t receive a code?{' '}
        <Text style={styles.resendLink} onPress={handleResend}>
          Resend
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    width: 48,
    height: 52,
    marginRight: 8,
    resizeMode: 'contain',
  },
  logoTextCol: {
    alignItems: 'center',
  },
  logoText: {
    width: 96,
    height: 20,
    resizeMode: 'contain',
  },
  logoUnderline: {
    width: 96,
    height: 4,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
  otpInput: {
    width: 48,
    height: 56,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  timer: {
    fontSize: 12,
    color: '#626262',
    marginBottom: 10,
  },
  timerBold: {
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#2b6171',
    paddingVertical: 12,
    paddingHorizontal: 34,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resendText: {
    fontSize: 12,
    color: '#626262',
    marginTop: 20,
  },
  resendLink: {
    color: '#2b6171',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
