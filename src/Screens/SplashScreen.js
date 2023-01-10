import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('HomeScreen');
    }, 2000)

    return (
        <View style={styles.container}>
            <Text style={styles.textHello}>Welcome !</Text>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHello: {
        fontSize: 30,
        fontWeight:'bold'
    }
})