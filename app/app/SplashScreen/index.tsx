import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_types/navigation';
import { useNavigation } from '@react-navigation/native';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('Login');
  }, 20000);
  return () => clearTimeout(timer);
}, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to My App</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B6171',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
