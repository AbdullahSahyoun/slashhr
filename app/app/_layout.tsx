import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Dashboard from './Dashboard';
import PasswordReset from './PasswordReset';
import Verification from './Verification';
import { RootStackParamList } from './_types/navigation'; // Fixed import path

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}