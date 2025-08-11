import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

type RouteParams = {
  email?: string;
};

export default function PasswordResetScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // Extract email from route params (sent from previous screen)
  const { email: emailParam } = route.params as RouteParams;

  const [email, setEmail] = useState(emailParam || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

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
      const res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/auth/auth/reset-password`,
        {
          email,
          newPassword: password,
        }
      );

      setSuccess(res.data.message || 'Password reset successfully.');

      setTimeout(() => {
        // Navigate back to login or home screen
        navigation.navigate('Login' as never);
      }, 2500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>
        Reset your <Text style={styles.titleHighlight}>Password!</Text>
      </Text>
      <Text style={styles.subtitle}>
        Your new password must be different from previous ones.
      </Text>

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholder="New Password"
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.toggleButton}
          activeOpacity={0.7}
        >
          <Image
            source={require('@/assets/images/img_hide.png')}
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          style={styles.input}
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.toggleButton}
          activeOpacity={0.7}
        >
          <Image
            source={require('@/assets/images/img_hide.png')}
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Error and Success Messages */}
      {!!error && <Text style={styles.error}>{error}</Text>}
      {!!success && <Text style={styles.success}>{success}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        disabled={loading}
        onPress={handleResetPassword}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      {/* Optional: Add image or right section here if needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fefefe',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A202C', // example dark color
    marginBottom: 8,
  },
  titleHighlight: {
    color: '#2b6171', // matching your web highlight color
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1A202C',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A202C',
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  toggleIcon: {
    width: 24,
    height: 24,
    tintColor: '#718096',
  },
  error: {
    color: '#E53E3E',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  success: {
    color: '#38A169',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2b6171',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
