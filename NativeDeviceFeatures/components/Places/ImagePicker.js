import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';

const ImagePicker = ({onTakeImage}) => {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission(); //ask for permission

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            //permissions denied, tell user
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app');

            return false;
        }

        return true; //permission granted, use camera
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if ( !hasPermission ) {
            return; //cancel execution if no permissions
        }

        const image = await launchCameraAsync({
            //configuration object
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
        //console.log(image);

        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri);
    }

    let imagePreview = <Text>No image yet</Text>;

    if (pickedImage) {
        imagePreview = <Image source={{uri: pickedImage}} style={styles.image}/>;
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>

            <OutlinedButton icon='camera' onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    );
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});