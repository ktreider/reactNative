import { StyleSheet, View, Text } from 'react-native';

import Colors from '../../constants/Colors';

const GuessLogItem = ({ roundNumber, guess }) => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.itemText}>{roundNumber}</Text>
            <Text style={styles.itemText}>Computer's Guess: {guess}</Text>
        </View>
    );
}

export default GuessLogItem;

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colors.primary800,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.secondary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        
        elevation: 4, //android shadow
        
        //ios shadow
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: .25,
        shadowRadius: 3,
    },
    itemText: {
        fontFamily: 'open-sans-regular',
    },

})