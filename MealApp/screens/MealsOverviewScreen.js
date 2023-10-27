import { MEALS, CATEGORIES } from '../data/dummy-data';

import { useLayoutEffect } from 'react';

import MealsList from '../componets/MealsList/MealsList';


const MealsOverviewScreen = ({ route, navigation }) => {
    const catId = route.params.categoryID;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    // executes before the component has finished execution
    // run simultaneously with rendering of component
    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;

        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation]);

    return <MealsList items={displayedMeals} />
    
}

export default MealsOverviewScreen;
