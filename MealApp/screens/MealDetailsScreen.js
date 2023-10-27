import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { useLayoutEffect, useContext } from 'react';

import { MEALS } from '../data/dummy-data';

import Details from '../componets/Details';
import Subtitle from '../componets/MealDetail/Subtitle';
import List from '../componets/MealDetail/List';
import IconButton from '../componets/IconButton';

//import { FavoritesContext } from '../store/context/favorites-context';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';


const MealDetailsScreen = ({ route, navigation }) => {
    //useContext hook to gather the data from the FavoritesContext obj exported
    //const favoriteMealsCtx = useContext(FavoritesContext);

    //hook to get data from redux stores
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    //hook to dispatch add and remove functions
    const dispatch = useDispatch();

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    //find whteher meal id is a part of the mealsId array and thus is a favorite
    //Context
    //const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    //redux
    const mealIsFavorite = favoriteMealIds.includes(mealId);



    function changeFavoriteStatusHandler() {
        //change favorite status of meal
        //need the value object from Context API or redux
        if (mealIsFavorite) {
            //favoriteMealsCtx.removeFavorite(mealId); //CONTEXT switch from fav to non-fav
            dispatch(removeFavorite({id: mealId})); //redux dispatch to start an action. send id as action payload
        } else {
            //favoriteMealsCtx.addFavorite(mealId); // CONTEXT
            dispatch(addFavorite({id: mealId})); //redux
        }
      }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton
                        icon={mealIsFavorite ? 'star' : 'star-outline'}
                        color="white"
                        onPress={changeFavoriteStatusHandler}
                    />
                );
            }
        })
    }, [navigation, changeFavoriteStatusHandler]);


    return (
        <ScrollView style={styles.rootContainer}>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>

            <Details 
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}    
            />

            <View style={styles.listOuter}>
                <View style={styles.listContainer}>
                    <Subtitle title='Ingredients'/>
                    <List data={selectedMeal.ingredients} />
                    
                    <Subtitle title='Steps' />
                    <List data={selectedMeal.steps} />
                </View>
            </View>

        </ScrollView>
    );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        height: 350,
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listOuter: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
        maxWidth: '80%',
    },

});