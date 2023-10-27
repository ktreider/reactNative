//Goal input - store data input related jsx and functionality
import { StyleSheet, View, TextInput, Button, Modal, Image } from 'react-native';
import { useState } from 'react';


const GoalInput = (props) => {
    //user input state, inital set as empty string
    const [enteredGoalText, setEnteredGoalText] = useState('');

    //receive the user input from TextInput,
    //call it enteredText, and perform the following:
    function goalInputHandler(enteredText) {
        //update the state to have the new user input
        setEnteredGoalText(enteredText);
    };

    //add a new function to pass the entered goal state to the app.js for the addGoalHandler there
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText(''); //clear text after entering
    }

    return (
        //using modal props to display visible or not
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/images/goal.png')} />

                <TextInput style={styles.textInput} placeholder='Your course goal!' onChangeText={goalInputHandler} value={enteredGoalText}/>
                
                <View style={styles.buttonContainer}>
                    {/**wrap the button in a View to style a little. if more styling is needed,
                     * create own button with <Pressable>
                     */}
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler} color="#b180f0"/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.onCancel} color="#f31282"/>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b',
    }, 
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        borderRadius: 6, 
        width: '100%',
        padding: 16,
        color: '#120438',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        width: '30%',
        marginHorizontal: 8,
        marginTop: 16,
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    }

});