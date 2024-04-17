import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomePage'
import LoginScreen from './screens/LoginPage'
import RegisterScreen from './screens/RegisterPage'
import ProiecteScreen from './screens/Proiecte'
import OrganizationsScreen from './screens/Organizations'
import ProfileScreen from './screens/Profile'
import AdaugaProiectScreen from './screens/AdaugaProiect'

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
            <Stack.Screen name='Proiecte' component={ProiecteScreen}/>
            <Stack.Screen name='Organizations' component={OrganizationsScreen}/>
            <Stack.Screen name='Profile' component={ProfileScreen}/>
            <Stack.Screen name='AdaugaProiect' component={AdaugaProiectScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
}
export default App;

//mai jos incep deja sa fac partea de navigare printre ferestre
