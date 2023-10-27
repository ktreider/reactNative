import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';

import FavoritesContextProvider from './store/context/favorites-context'; //context
import { Provider } from 'react-redux'; //redux
import { store } from './store/redux/store'; //redux

//create a 'stack' of screens
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator 
            screenOptions={{
                headerStyle: {backgroundColor: "#351401"},
                headerTintColor: 'white',
                sceneContainerStyle: {backgroundColor: "#3f2f25"}, //contentStyle prop for Drawer is sceneCo...
                
                drawerActiveBackgroundColor: '#e4baa1',
                drawerContentStyle: { backgroundColor: '#351401'},
                drawerInactiveTintColor: 'white',
                drawerActiveTintColor: '#351401',
            }}
        >
            <Drawer.Screen 
                name="Categories" 
                component={CategoriesScreen} 
                options={{
                    title: 'All Categories',
                    drawerIcon: ({color, size}) => {
                        return (<Ionicons name='list' color={color} size={size} />)
                    }
                }} 
            />
            <Drawer.Screen 
                name="Favorites" 
                component={FavoritesScreen} 
                options={{
                    drawerIcon: ({color, size}) => {
                        return (<Ionicons name='star' color={color} size={size} />)
                    }
                }}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='light' />

            {/*
            wrapped around all content to manage state app-wide
            <FavoritesContextProvider> //context specific
            //reduct specific below
            */}
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator 
                        screenOptions={{
                            headerStyle: {backgroundColor: "#351401"},
                            headerTintColor: 'white',
                            contentStyle: {backgroundColor: "#3f2f25"},
                        }}
                    >
                        <Stack.Screen 
                            name="MealsCategories" 
                            component={DrawerNavigator} //previously Categories Screen
                            options={{
                                title: 'All Categories', 
                                headerShown: false, ///get rid of stack - based header on this screen
                            }}
                        />
                        <Stack.Screen 
                            name="MealsOverview" 
                            component={MealsOverviewScreen} 
                            /* 
                            one way to dynamically set information
                                options={({route, navigation})=> {
                                const catId = route.params.categoryID;

                                return {
                                    title: catId,
                                };
                            }} */
                        />
                        <Stack.Screen 
                            name="MealDetails"
                            component={MealDetailsScreen} 
                            options={{
                                title: 'Details on this Meal',
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            {/* </FavoritesContextProvider> */}
            </Provider>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
});
