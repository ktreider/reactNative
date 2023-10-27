import { StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useState, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

import Colors from './constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function App() {
    //state to keep track of whether or not we have a valid number 
    const [userNumber, setUserNumber] = useState(); //set to null
    //state to determind if game is over
    const [gameIsOver, setGameIsOver] = useState(true); // set to true, because game 'is over' before it even starts
    //state to keep track of number of 'rounds'
    const [guessRounds, setGuessRounds] = useState(0);

    //import and load file fonts
    //use returned array where first element isa boolean value that indicated whether fonts have been loaded
    const [fontsLoaded] = useFonts({ 
        'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });

    //use fontsLoaded to show splash screeen til the fonts load
    //use useCallback effect from 'react'
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    function pickedNumberHandler(pickedNumber) {
        //get picked number and set the user number to that number
        setUserNumber(pickedNumber);
        //now we can render the start game screen if there is no number yet,
        //or go on to play the game screen

        setGameIsOver(false);; //game started, not over
    }


    function gameOverHandler(numberOfRounds) {
        setGameIsOver(true);
        setGuessRounds(numberOfRounds); //getting num rounds from game screen
    }

    //when the new game button is pressed, start a new game
    function startNewGameHandler() {
        //reset states (setGameIsOver above)
        setUserNumber(null); //will set back to StartGameScreen
        setGuessRounds(0);
    }

    
    //helper variable
    //use prop on StartGameScreen to gather that picked number
    let screen = <StartGameScreen onConfirmNumber={pickedNumberHandler} />;

    //if userNum is truthy (not null or 0)
    //and send prop onGameOver to handle the comparison logic to end the game
    if (userNumber) {
        screen = <GameScreen userNumber = {userNumber} onGameOver={gameOverHandler}/>
    }
    //if gameIsOver & if a userNumber was chosen (to prevent this from running at beginning of game)
    if(gameIsOver && userNumber) {
        screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds}  onStartNewGame={startNewGameHandler}/>
    }

    return (
        <>
            <StatusBar style="light"/>
            <LinearGradient colors={[Colors.primary700, Colors.secondary500]} style={styles.rootScreen} onLayout={onLayoutRootView}>
                <ImageBackground 
                    source={require('./assets/images/background.png')} 
                    resizeMode="cover"
                    imageStyle={styles.backgroundImage}
                    style={styles.rootScreen}
                >
                    {/** decide which screen to show */}
                    <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>

                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: .15,
    }
});
