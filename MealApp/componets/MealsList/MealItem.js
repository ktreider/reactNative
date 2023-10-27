import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Details from '../Details';

const MealItem = ({ id, title, imageUrl, duration, complexity, affordability }) => {
    const navigation = useNavigation(); //hook to navigate outside registered screens

    function selectMealItemHandler() {
        navigation.navigate('MealDetails', {
            mealId: id,
        });
    }

    return (
        <View style={styles.mealItem}> 
            <Pressable 
                android_ripple={{color: '#ccc'}}         
                style={({ pressed }) => pressed ? styles.buttonPressed : null}
                onPress={selectMealItemHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image source={{uri: imageUrl}} style={styles.image}/>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Details duration={duration} complexity={complexity} affordability={affordability} />
                </View>
            </Pressable>
        </View>
    );
}

export default MealItem;

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: '100%',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        padding: 8,
    },
    mealItem: {
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'white',

        elevation: 4, //android shadow
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible', 

        //ios shadow
        backgroundColor: 'white', //need a background color for shadow
        shadowColor: 'black',
        shadowOpacity: .25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    buttonPressed: {
        opacity: .5,
    },
});