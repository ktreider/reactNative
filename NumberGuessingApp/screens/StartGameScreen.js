import { StyleSheet, TextInput, View, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState } from 'react';

import Colors from '../constants/Colors';

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

const StartGameScreen = (props) => {
    //gather user input state
    const [enteredNumber, setEnteredNumber] = useState('');     

    //hook to grab height and width dynamically
    const {width, height} = useWindowDimensions();

    //update num state when user types into text input field
    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText); //update state to entered text from user input field
    };

    function resetInputHandler() {
        setEnteredNumber('');
    }

    //if current state is valid, then proceed to next screen
    //if invalid, show alert
    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber); //convert string to int 

        //if is not a number or less than 0 or greater than 99
        if ( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            //show alert
            //an object that holds a method to call to show an alert, aka .alert()
            //args: title, message, & buttons
            Alert.alert(
                'Invalid Number!', 
                'Number has to be between 1 and 99',
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}] 
                ); 
            return; //cancel execution
        }

        //otherwise pass the confirmed chosen number to the StartGameScreen calling in App.js
        props.onConfirmNumber(chosenNumber);
    };

    //set adjustable margin top based on dynamic height
    const marginTopDistance = height < 380 ? 40 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.rootContainer, {marginTop: marginTopDistance}]}>
                    <Title>Guess A Number Game</Title>
                    <Card>
                        <InstructionText>Enter a number for the computer to guess</InstructionText>
                        <TextInput 
                            style={styles.textInput} 
                            maxLength={2} 
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={enteredNumber} //state binded to this TextInput so any state changes are reflected (ex reset)
                            onChangeText={numberInputHandler} //executes on every keystroke
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.individualButtonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.individualButtonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default StartGameScreen;


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        height: 50,
        fontSize: 32,
        borderBottomColor: Colors.secondary500,
        borderBottomWidth: 2,
        color: Colors.secondary500,
        marginVertical: 8,
        fontWeight: 'bold',
        width: 50,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    individualButtonContainer: {
        flex: 1,
    }

});