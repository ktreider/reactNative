import { createContext, useState } from 'react';

//adding values to createContext() for better auto-completion
export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {},
});


//functional component that can later wrap around app and 
//other components that can interact with Context
function FavoritesContextProvider({children}) {
    //logic to manage the Context (implementations of the functions and logic of array)
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavorite(id) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    };

    function removeFavorite(id) {
        setFavoriteMealIds((currentFavIds) =>
        currentFavIds.filter((mealId) => mealId !== id)
      ); //filter out meal id that was received as a param to remove
    };

    //to pass everyting to the context.provider
    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
    }

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
export default FavoritesContextProvider;