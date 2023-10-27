import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from './screens/WelcomeScreen';
import UserScreen from './screens/UserScreen';

//const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
    return (

    /* TO CREATE DRAW NAVIGATION

         <NavigationContainer>
            <Drawer.Navigator screenOptions={{
                headerStyle: {backgroundColor: '#ccc'},
                headerTintColor: '#2e3447',
                drawerActiveBackgroundColor: '#f0e1ff',
                drawerActiveTintColor: '#3c0ab6',
                //drawerStyle: {backgroundColor: '#ccc'},
            }}> 
                <Drawer.Screen name="Welcome" component={WelcomeScreen} options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    drawerLabel: 'Welcome Screen',
                }}/>
                <Drawer.Screen name="User" component={UserScreen} options={{
                    drawerIcon: ({color, size}) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                    drawerLabel: 'User',
                }}/>
            </Drawer.Navigator>
        </NavigationContainer> 
    */
        
        <NavigationContainer>
            <BottomTab.Navigator screenOptions={{
                headerStyle: {backgroundColor: '#ccc'},
                headerTintColor: '#2e3447',
                tabBarActiveTintColor: '#3c0ab6',
                
            }}> 
                <BottomTab.Screen name="Welcome" component={WelcomeScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    tabBarLabel: 'Welcome',
                }}/>
                <BottomTab.Screen name="User" component={UserScreen} options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                    tabBarLabel: 'User',
                }}/>
            </BottomTab.Navigator>
        </NavigationContainer>

    );
}
