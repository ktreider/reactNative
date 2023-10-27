import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MealsList from '../componets/MealsList/MealsList';
//import { FavoritesContext } from '../store/context/favorites-context';
import { useSelector } from 'react-redux';
import { MEALS } from '../data/dummy-data'

const FavoritesScreen = () => {
    //const favoritesMealsCtx = useContext(FavoritesContext); //context
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids); //redux

    //compare raw data and if the id is included in the favorites Context, 
    //grab that info and save to filtered array
    //const favoriteMeals = MEALS.filter(meal => favoritesMealsCtx.ids.includes(meal.id));
    //or with redux:
    const favoriteMeals = MEALS.filter(meal => favoriteMealIds.includes(meal.id));


    if (favoriteMeals.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>There are no saved meals.</Text>
            </View>
        );
    }
    return (
        <MealsList items={favoriteMeals}/>
    );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        width: '50%',
        textAlign: 'center',
        marginBottom: 50,
    }

});