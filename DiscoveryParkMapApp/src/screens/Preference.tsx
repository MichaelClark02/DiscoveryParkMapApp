import React from "react";
import { Text, View, StyleSheet, SafeAreaView, Button } from 'react-native'

const Preference = () => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.contentText}>My Classes</Text>
                <Text style={styles.contentText}>Filters</Text>
                <Text style={styles.contentText}>Favorites</Text>
                <Text style={styles.contentText}>Setting</Text>
                <Text style={styles.contentText}>Contact Us</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9F7F7',
        flex: 1,
        margin: 30
    },
    wrapper: {
        backgroundColor: '#C2C2C2',
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    contentText: {
        color: 'black',
        margin: 40,
    },
    button: {
        backgroundColor: '#42C54E',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    title: {
        fontSize: 25,
        color: 'black'
    }
})

export default Preference
