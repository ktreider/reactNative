import { useCallback, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../models/place';

const PlaceForm = ({onCreatePlace}) => {
    const [enteredTitle, setEnteredTitle] = useState();
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();


    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function savePlaceHandler() {
        //console.log(enteredTitle);
        //console.log(selectedImage);
        //console.log(pickedLocation);
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
        onCreatePlace(placeData);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, [] );

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={styles.input} />
            </View>

            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />

            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form : {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },

});