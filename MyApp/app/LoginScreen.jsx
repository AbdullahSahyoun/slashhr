import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

 const handleLogin = async () => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
      { email, password }
    );

    const { token, user } = response.data;
    console.log('Login success:', user);

    setError('');
    navigation.navigate('Home'); // عدّل الوجهة حسب الحاجة
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || 'Unexpected error occurred';

    console.error('Login error:', errorMessage);
    setError(errorMessage);

    // 🔔 Alert message for user
    Alert.alert(
      'Login Failed',
      errorMessage.includes('Network') ? 'Cannot connect to server. Check your internet or server status.' : errorMessage,
      [{ text: 'OK' }]
    );
  }
};


  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/img_xmlid_2.png')} style={styles.logo} />
      <Text style={styles.heading}>
        Welcome to <Text style={styles.highlight}>SlasHR!</Text>
      </Text>
      <Text style={styles.subText}>Enter your credentials to log in</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {error === 'User not found' && (
        <Text style={styles.error}>No account associated with this email.</Text>
      )}

      <View style={styles.passwordWrapper}>
        <TextInput
          style={[styles.input, { paddingRight: 40 }]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconWrapper}
        >
          <Image
            source={
              showPassword
                ? require('../assets/images/img_show.png')
                : require('../assets/images/img_hide.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {error === 'Invalid password' && (
        <Text style={styles.error}>The password you entered is incorrect.</Text>
      )}

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8fc',
    padding: 20,
    justifyContent: 'center'
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  highlight: {
    color: '#3b82f6'
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center'
  },
  iconWrapper: {
    position: 'absolute',
    right: 12,
    top: 14
  },
  icon: {
    width: 20,
    height: 20
  },
  button: {
    backgroundColor: '#3bdaf6ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  forgot: {
    marginTop: 14,
    textAlign: 'center',
    color: '#3b82f6'
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8
  }
});
