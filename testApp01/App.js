import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import Plus from './images/plus.png';
import Info from './images/info.png';
import Notes from './images/notes.png';

import AddPage from './screens/addPage';
import InfoPage from './screens/infoPage';
import NotesPage from './screens/notesPage';

const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="notes" component={NotesPage} options={{ drawerIcon: () => (<Image style={styles.icon} source={Notes} />) }} />
        <Drawer.Screen name="add note" component={AddPage} options={{ drawerIcon: () => (<Image style={styles.icon} source={Plus} />) }} />
        <Drawer.Screen name="info" component={InfoPage} options={{ drawerIcon: () => (<Image style={styles.icon} source={Info} />) }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>

      <View style={styles.header}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Notes App</Text>
          <Text style={styles.circleTextLower}>Menage your notes</Text>
        </View>
      </View>

      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    color: 'red'
  },
  circle: {
    width: 600,
    height: 600,
    marginTop: -400,
    borderRadius: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#02b3ee',
    marginBottom: 130
  },
  circleText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#e0f5fc'
  },
  drawer: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  circleTextLower: {
    fontSize: 20,
    fontWeight: 'light',
    color: '#7cd2f4',
    marginBottom: 70
  }
});
