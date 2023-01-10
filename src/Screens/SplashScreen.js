import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SplashScreen = ({ navigation }) => {

    setTimeout(() => {
        navigation.navigate('HomeScreen');
    }, 2000)


    return (
        <View style={styles.container}>
            <Text style={styles.textHello}>Hello Redux</Text>
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
    logo: {
        width: 100,
        height: 100
    },
    textHello: {
        fontSize: 20
    }
})