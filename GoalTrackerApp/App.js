import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Button } from 'react-native';
import { StatusBar } from "expo-status-bar";
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    //state for modal button
    const [modalIsVisible, setModalIsVisible] = useState(false);
    //list of goals state
    const [courseGoals, setCourseGoals] = useState([]);

    //function to update the modal state to open  
    function startAddGoalHandler () {
        setModalIsVisible(true);
    }

    //function to update modal state to close
    //called when user presses add goal button or cancel button
    function endAddGoalHandler() {
        setModalIsVisible(false);
    }


    //access the user input state, and perform the following:
    function addGoalHandler(enteredGoalText) {
        // ... spread exisitng goals in array, and add new goal
        // do this with a function to pass in existing state (in this case call it 'currentCourseGoals')
        // incase the update is deferred for any reason
        setCourseGoals(currentCourseGoals => [
            ...currentCourseGoals, 
            //set enteredGoalText to an object for flatlist so you can also generate keys/ids to access for lists/FlatLists
            {text: enteredGoalText, id: Math.random().toString()},
        ]); //take existing goals and append a new one

        //when add goal button is pressed, make sure to close modal by calling the functin
        //or you could just "setModalIsVisible(false)" directly
        endAddGoalHandler();
    };

    //a function to delete goals. handled here since the state of the course goals list is handled here
    //takes id of to-be-deleted item from bind on the pressable component in GoalItem.js and removes
    function deleteGoalHandler (id) {
        //update courseGoals state, new state based on old state, but remove 
        //so send an updating function
        setCourseGoals(currentCourseGoals => {
            //filter items out- function to determine True to keep or False to remove
            //if the goal id matches the param id, then remove! otherwise keep
            return (
                currentCourseGoals.filter((goal) => goal.id !== id)
            );
        });
    }

    return (
        <>
            <StatusBar style='light'/>
            <SafeAreaView style={styles.mainContainer}>  
                {/* SafeAreaView maintains paddings around ios (v11+) device notches/bars */}
                <View style={styles.appContainer}>
                    {/**to control modal visibility */}
                    <Button title='Add New Goal' color="#a065ec" onPress={startAddGoalHandler} /> 
                    {/** one way to display goal input conditionally but checking whether modal is T or F is
                     * by: {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />}
                     * or use modal props to set visibility and send prop with modalIsVisible value
                    */}
                    <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler}/>

                    <View style={styles.goalsContainer}>
                        {/**display list items in a bunch of jsx elements by mapping
                         * send a function to the map method, to get the individual goal for every
                         * item in the array, and return the jsx ele that should be rendered.
                         * {courseGoals.map((goal) => ( 
                            <View style={styles.goalItem} key={goal}>
                                <Text style={styles.goalText}>
                                    {goal}
                                </Text>
                            </View> ))}
                        * need: unique key to output list to idenify individual list item to update list efficiently
                        * 
                        * OR use FLATLIST - a self closing component that takes in the data and 
                        * how it should be rendered
                        * here, itemData is an object, so you must grab the text field specifically
                        * 
                        */}
                        <FlatList 
                        data={courseGoals} 
                        renderItem={(itemData) => {
                            //grab custom component from goalitem.js, also pass the deleteGoalHandler
                            return (
                                <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>
                            );
                        }}
                        keyExtractor={(item, index) => {
                            //use keyExtractor prop to flatlist to use ids instead of keys
                            //auto receive item and index params, and get a unique key
                            return item.id;
                        }}
                        
                        />                            

                    </View>

                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, //set flex to grow so it will take up height of phone, defaults to only the space it needs
    },
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
        flex: 1, //also grow the container here
    },
    goalsContainer: {
        flex: 5, //take 5/6ths of space
    },
});
