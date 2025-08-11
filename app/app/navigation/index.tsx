import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../SplashScreen';
import Login from '../Login';
import { RootStackParamList } from '../_types/navigation.d'; // ADD THIS IMPORT

const Stack = createNativeStackNavigator<RootStackParamList>(); // Now recognizes the type

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SplashScreen" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}