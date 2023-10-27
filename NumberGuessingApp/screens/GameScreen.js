import { StyleSheet, View, Alert, Text, FlatList, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Title from "../components/ui/Title";
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import NumberContainer from '../components/game/NumberContainer';
import GuessLogItem from '../components/game/GuessLogItem';


//utility function to generate rand num
function generateRandomeBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomeBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100; 

const GameScreen = (props) => {
    //generate a random number, and exclude the number the user inputs on the start screen
    //hardcode min and max for this initial guess - only used once, then minB and maxB come into play
    const initialGuess = generateRandomeBetween(1, 100, props.userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        //check whether game is over - compare currentGuess and userNumber
        //and call the onGameOver prop to end the game and switch the screen on App.js
        if(currentGuess === props.userNumber) {
            props.onGameOver(guessRounds.length); //padding number of rounds
        }
    }, [currentGuess, props.userNumber, props.onGameOver ] ); //dependencies to control when to use this effect

    //reset min and max on starting a new game
    //setting empty array of dependencies to useEffect will ensure this function
    //will only be executed the first time the component is evaluated.
    //will not run if just updated, but will run upon resetting the UI
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    //take in whether the direction needs to be less than or greater than 
    function nextGuessHandler(direction) {
        // Avoid misleading the computer's guesses: ex.
        // if direction is lower and the currentGuess made is smaller 
        // than what the user chose as the winning number,
        // then alert that you cannot go in that direction
        if (
            ( direction == 'lower' && currentGuess < props.userNumber) || 
            ( direction == 'greater' && currentGuess > props.userNumber)) {
                Alert.alert("Don't lie!", 'You know that is wrong...', [
                    { text: 'Sorry!', style: 'cancel'},
                ]);
                return;
        }


        if (direction == 'lower') {
            maxBoundary = currentGuess - 1; //the current guess was too high, guess lower by setting upper bound
        } else {
            minBoundary = currentGuess + 1; //current guess too low, guess higher by setting lower bound
        }

        const newRndNumber = generateRandomeBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);

        //update new number into the current state array (here its called prevGuessRounds)
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds]);
    }

    const guessRoundsListLength = guessRounds.length;

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionTextAdditional}>Higher or Lower?</InstructionText>
                <View style={styles.higherLowerButtons}>
                    <View style={styles.indiviButton}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24}/></PrimaryButton>
                    </View>
                    <View style={styles.indiviButton}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24}/></PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    );

    if ( width > 500 ) {
        content = (
            <>
                <View style={styles.wideButtonsContainer}>
                    <View style={styles.indiviButton}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}><Ionicons name="md-remove" size={24}/></PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.indiviButton}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}><Ionicons name="md-add" size={24}/></PrimaryButton>
                    </View>                        
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Title>Computer's Guess:</Title>
            {content}
            <View style={styles.listContainer}>
                {/*guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)*/}
                <FlatList 
                    data={guessRounds} 
                    renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength -itemData.index} guess={itemData.item}></GuessLogItem>}
                    keyExtractor={(item) => {
                        //use keyExtractor prop to flatlist to use ids instead of keys
                        //auto receive item and index params, and get a unique key
                        return item;
                    }}
                />     
            </View>
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    higherLowerButtons: {
        flexDirection: 'row',
        paddingTop: 8,
    },
    indiviButton: {
        flex: 1,
    },
    instructionTextAdditional: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    wideButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});