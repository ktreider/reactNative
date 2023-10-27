import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../UI/OutlinedButton';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { getAddress, getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

const LocationPicker = ({onPickLocation}) => {
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused(); //bool. true when this component's screen it belongs on is the main screen
    

    useEffect(() => {
        if (isFocused && route.params) {

            const mapPickedLocation = {
                lat: route.params.pickedLat, 
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }

    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address: address}); 
            }
        }
        handleLocation();
        
        //use useCallback for onPickLocation in PlaceForm
        //to prevent any unnecessary changes to the function
    }, [pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission(); //ask for permission

            return permissionResponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            //permissions denied, tell user
            Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app');

            return false;
        }

        return true; //permission granted, use location
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        
        const location = await getCurrentPositionAsync();

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
       navigation.navigate('Map');
    }

    let mapPreview = <Text>No location picked</Text>;

    if (pickedLocation) {
        mapPreview = <Image source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} style={styles.image}/>;
    }


    return (
        <View>
            <View style={styles.mapPreview}>
                {mapPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    }

});