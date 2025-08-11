// app/_types/navigation.d.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined; // 👈 Match the case exactly
  Login: undefined;
  PasswordReset: { email: string };
  Verification: { email: string };
  Dashboard: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = 
  NativeStackNavigationProp<RootStackParamList, T>;