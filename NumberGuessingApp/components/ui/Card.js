import { StyleSheet, View, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const Card = ({children}) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        //flex: 1,
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        borderRadius: 8,
        backgroundColor: Colors.primary800,
        alignItems: 'center',
        justifyContent: 'center',
        
        //create box shadow
        elevation: 4, //android shadow
        //ios 4 properties:
        shadowColor: 'black',
        shadowOffset: { width: 4, height: 4},
        shadowRadius: 6,
        shadowOpacity: .25,
    },

});