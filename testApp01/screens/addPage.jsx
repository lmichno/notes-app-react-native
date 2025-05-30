import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

const AddPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchCategories();
        }, [])
    );

    const fetchCategories = async () => {
        const catsString = await SecureStore.getItemAsync('cat');
        if (catsString) {
            const cats = JSON.parse(catsString);
            setCategories(cats.cats);
            setCategory(cats.cats[0]);
        }
    };
    const handleAddNote = async () => {
        const note = {
            date: new Date().toLocaleString('pl-PL', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            title,
            content,
            category
        };
        const noteString = JSON.stringify(note);
        let numOfNotes = await SecureStore.getItemAsync('0');
        numOfNotes = parseInt(numOfNotes) + 1;
        await SecureStore.setItemAsync(numOfNotes.toString(), noteString);
        await SecureStore.setItemAsync('0', numOfNotes.toString());
        setTitle('');
        setContent('');
        setCategory('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a New Note</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
            />
            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                {categories.map((cat, index) => (
                    <Picker.Item key={index} label={cat} value={cat} />
                ))}
            </Picker>
            <Button title="Add Note" onPress={handleAddNote} />
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
    picker: {
        width: '100%',
        height: 50,
        marginBottom: 20,
    },
});

export default AddPage;