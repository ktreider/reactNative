// goal item -jsx code and functionality that is related to outputting single goal items
import { StyleSheet, View, Text, Pressable } from 'react-native';

const GoalItem = (props) => {
    //pull in the delete goal handler (OnDeleteItem) to make items deletable
    return (
        <View style={styles.goalItem}>
            {/**
             * the android_ripple applys a ripple effect to the pressable tag - ANDROID
             * for IOS: 
             * sending a function to the style prop will be called when the Pressable state changes.
             * Thus, destructuing find the pressed state and if it is true (meaning the pressable was pressed),
             * return the styles.pressedItem and apply that styling
             */}
            <Pressable android_ripple={{color:'#210644'}} onPress={props.onDeleteItem.bind(this, props.id)}
             style={({pressed}) => pressed && styles.pressedItem }> 

                <Text style={styles.goalText}>
                    {props.text} 
                </Text>
            </Pressable>
        </View>
    )
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        //Note: ios and android different styling 
        //ios native text element doesnt round borders, wrap text element in view
        borderRadius: 6, 
        backgroundColor: '#5e08cc',
    },
    //styling for the pressed action of the button - IOS styling only.
    pressedItem: {
        opacity: .5,
    },
    goalText: {
        padding: 8,
        color: 'white',
    }

});