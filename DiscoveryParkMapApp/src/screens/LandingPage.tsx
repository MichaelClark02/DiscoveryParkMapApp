import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'

const LandingPage = () => {
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.logoWrapper}>
                    <Text style={styles.logo}>UNT</Text>
                    <View style={styles.DPText}>
                        <Text style={styles.logoText}>Discovery</Text>
                        <Text style={styles.logoText}>Park</Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <Text style={styles.mapsText}>MAPS</Text>
                </View>
                <View>
                    <Text style={styles.sponsor}>powered by THE GROUP</Text>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#63695F',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        flex: 1,
        justifyContent: 'center'
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 5, 
    },
    main: {
        alignItems: 'center'
    },
    mapsText: {
        fontSize: 40,
        marginTop: 30,
        color: 'white'
    },
    centeredContent: {
        alignItems: 'center',
        justifyContent: 'center', 
    },
    footer: {
        fontSize: 10
    },
    logo: {
        color: 'white',
        fontSize: 70,
        fontWeight: '600'
    },
    logoText: {
        color: 'white',
        fontSize: 20
    },
    DPText: {
        flexDirection: 'column',
    },
    sponsor: {
        color: 'white',
        marginTop: 200,
    }
})

export default LandingPage

