import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';

const NotesPage = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [numColumns, setNumColumns] = useState(2);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchNotes = async () => {
        try {
            const count = await SecureStore.getItemAsync('0');

            if (count) {
                const notesArray = [];
                for (let i = 1; i <= parseInt(count); i++) {
                    const noteString = await SecureStore.getItemAsync(i.toString());
                    if (noteString) {
                        const note = JSON.parse(noteString);
                        notesArray.push({ key: i.toString(), ...note });
                    }
                }
                setNotes(notesArray);
                setFilteredNotes(notesArray);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleLongPress = (key) => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => deleteNote(key) },
            ],
            { cancelable: true }
        );
    };

    const handlePress = (key) => {
        navigation.navigate('EditPage', { noteKey: key });
    };

    const deleteNote = async (key) => {
        try {
            await SecureStore.deleteItemAsync(key);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchNotes();
        }, [])
    );

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color + '80';
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredNotes(notes);
        } else {
            const filtered = notes.filter(note =>
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.content.toLowerCase().includes(query.toLowerCase()) ||
                note.category.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredNotes(filtered);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search notes..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                key={numColumns}
                data={filteredNotes}
                numColumns={numColumns}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onLongPress={() => handleLongPress(item.key)}
                        onPress={() => handlePress(item.key)}
                    >
                        <View style={[styles.noteContainer, { backgroundColor: getRandomColor() }]}>
                            <Text style={styles.cat}>{item.category}</Text>
                            <Text style={styles.noteDate}>{item.date}</Text>
                            <Text style={styles.noteTitle}>{item.title}</Text>
                            <Text style={styles.noteContent}>{item.content}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    searchInput: {
        width: '92%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
    noteContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'start',
        width: 160,
        height: 160,
    },
    noteDate: {
        fontSize: 12,
        color: '#111',
        marginBottom: 5,
    },
    noteTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 5,
        fontStyle: 'italic',
    },
    noteContent: {
        fontSize: 20,
        color: '#222',
    },
    cat: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 5,
        borderRadius: 5,
        color: '#FFF',
        marginBottom: 5,
        textAlign: 'center',
    }
});

export default NotesPage;