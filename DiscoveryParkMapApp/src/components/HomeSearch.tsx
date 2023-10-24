import React from "react";
import { Text, View, StyleSheet } from "react-native";

const HomeSearch =  () => {
    return (
        <View style={styles.inputBox}>
            <Text style={styles.inputText}>Where to ?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inputBox: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        margin: -20,
        padding: 8,
        width:'90%',   
        
    },
    inputText: {
        fontWeight: 'bold',
        fontSize:15,
    },
})

export default HomeSearch
