import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../../constants/Colors';

/**Make button reuseable, by adding prop to allow other components to use
 * this component to pass in a function that will be executed on a press
 * 
 * pull another prop 'onPress' (name up to you) - onPress here since we want
 * it to be envoked on a press
*/
const PrimaryButton = ({children, onPress}) => {

    function pressHandler() {
        onPress(); 
    }

    // create a button using view and text
    // gather what it should say from props.children
    return (
        <View style={styles.buttonOuter}>
            {/** style prop accepts either a style object, or a function that 
             * is automatically called when the Pressable component is pressed
             * - here the property is 'pressed' which is a part of the object
             * passed to the function for this component. Default True if pressed,
             * false otherwise
             */}
            <Pressable 
                style={({pressed}) => pressed ? [styles.buttonInner, styles.pressed]: styles.buttonInner } 
                onPress={pressHandler} 
                android_ripple={{color: Colors.primary600 }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

export default PrimaryButton;

const styles =  StyleSheet.create({
    buttonOuter: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonInner: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,

        elevation: 2, //android shadow
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    //dedicated style for ios pressed styling
    pressed: {
        opacity: .75,
    }

});