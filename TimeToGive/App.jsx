import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomePage'
import LoginScreen from './screens/LoginPage'
import RegisterScreen from './screens/RegisterPage'

function App(){
const Stack=createNativeStackNavigator();
    return (
    <NavigationContainer>
        <Stack.Navigator
        initialRouteName='Home'
        >
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}
export default App;

//mai jos incep deja sa fac partea de navigare printre ferestre
