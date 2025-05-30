import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notes App v2.0</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default InfoPage;