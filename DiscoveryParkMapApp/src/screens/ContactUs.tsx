import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'

const ContactUs = () => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.contentText}>Email</Text>
                <Text style={styles.contentText}>Phone No</Text>
                <Text style={styles.contentText}>Github Repo</Text>
                <Text style={styles.contentText}>University of North Texas</Text>
                <Text style={styles.contentText}>Help</Text>
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
    title: {
        fontSize: 25,
        color: 'black'
    }
})

export default ContactUs
