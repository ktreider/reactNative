import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';

import Title from '../components/ui/Title';
import Colors from '../constants/Colors';

const GameOverScreen = ({roundsNumber, userNumber, onStartNewGame}) => {

    const { width, height } = useWindowDimensions();

    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    }
    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imgContainer, imageStyle]}>
                    <Image style={styles.img} source={require('../assets/images/success.png')}/>
                </View>
                <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    );
}

export default GameOverScreen;

//const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgContainer: {
        overflow: 'hidden',
        // borderRadius: deviceWidth < 380 ? 75 : 150, //half of width/height
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        borderWidth: 3,
        borderColor: Colors.primary800,
        margin: 36,
    },
    img: {
        width: '100%',
        height: '100%',
    },
    summaryText: {
        fontFamily: 'open-sans-regular',
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        fontWeight: 'bold',
        color: Colors.primary500,
        fontSize: 24,
    },
});