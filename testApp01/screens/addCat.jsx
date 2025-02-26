import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const AddCat = () => {
    const [catName, setCatName] = useState('');

    const handleAddCat = async () => {
        let cats = await SecureStore.getItemAsync('cat');
        cats = JSON.parse(cats) || { cats: [] };

        if (cats.cats.includes(catName.toLocaleUpperCase())) {
            console.log('Category already exists');
            return;
        }

        cats.cats.push(catName.toLocaleUpperCase());
        cats = JSON.stringify(cats);
        await SecureStore.setItemAsync('cat', cats);
        setCatName('');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a New Category</Text>
            <TextInput
                style={styles.input}
                placeholder="Category name"
                value={catName}
                onChangeText={setCatName}
            />
            <Button title="Add Category" onPress={handleAddCat} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    textArea: {
        height: 100,
    },
});

export default AddCat;

