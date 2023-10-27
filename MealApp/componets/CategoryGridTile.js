import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';

function CategoryGridTile({ title, color, onPress }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
        android_ripple={{color: '#ccc'}}
        onPress={onPress}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,

        elevation: 4, //android shadow
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible', 

        //ios shadow
        backgroundColor: 'white', //need a background color for shadow
        shadowColor: 'black',
        shadowOpacity: .25,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 4,
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: .5,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});