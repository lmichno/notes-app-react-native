import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useFocusEffect } from '@react-navigation/native';

const EditPage = ({ navigation }) => {
    const route = useRoute();
    const { noteKey } = route.params;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchNote = async () => {
        try {
            const noteString = await SecureStore.getItemAsync(noteKey);

            if (noteString) {
                const note = JSON.parse(noteString);
                setTitle(note.title);
                setContent(note.content);
                setDate(note.date);
                setCategory(note.category);
            }
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    };

    const fetchCategories = async () => {
        const catsString = await SecureStore.getItemAsync('cat');
        if (catsString) {
            const cats = JSON.parse(catsString);
            setCategories(cats.cats);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNote();
            fetchCategories();
        }, [noteKey])
    );

    const handleAddNote = async () => {
        const note = {
            date: date,
            title,
            content,
            category
        };
        const noteString = JSON.stringify(note);
        await SecureStore.setItemAsync(noteKey, noteString);
        setTitle('');
        setContent('');
        setCategory('');
        navigation.navigate('Notes');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit a Note</Text>
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
            <Button title="Submit" onPress={handleAddNote} />
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

export default EditPage;