import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

export const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textHello}>Hello Tammira</Text>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})