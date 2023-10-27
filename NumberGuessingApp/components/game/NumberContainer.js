import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const NumberContainer = ({children}) => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.secondary500,
        padding: deviceWidth < 380 ? 12 : 24, //is device width less than 450, then use 12, otherwise use 24
        borderRadius: 8,
        margin: deviceWidth < 380 ? 12 : 24, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        color: Colors.secondary500,
        fontSize: deviceWidth < 380 ? 28 : 36,
        fontFamily: 'open-sans-bold',
    }
})