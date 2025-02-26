
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
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
import EditPage from './screens/editPage';
import AddCat from './screens/addCat';

const Drawer = createDrawerNavigator();


export default function App() {

  React.useEffect(() => {
    setStorage();
  }, []);

  async function setStorage() {
    if (await SecureStore.getItemAsync('0') === null) {
      await SecureStore.setItemAsync('0', '0');
    }

    if (await SecureStore.getItemAsync('cat') === null) {

      const cats = {
        cats: ['OGÓLNE']
      }
      catsString = JSON.stringify(cats);
      await SecureStore.setItemAsync('cat', catsString);

    }
  }


  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Notes" component={NotesPage} options={{ drawerIcon: () => (<Image style={styles.icon} source={Notes} />) }} />
        <Drawer.Screen name="Add note" component={AddPage} options={{ drawerIcon: () => (<Image style={styles.icon} source={Plus} />) }} />
        <Drawer.Screen name="Add category" component={AddCat} options={{ drawerIcon: () => (<Image style={styles.icon} source={Plus} />) }} />
        <Drawer.Screen name="Info" component={InfoPage} options={{ drawerIcon: () => (<Image style={styles.icon} source={Info} />) }} />
        <Drawer.Screen name="EditPage" component={EditPage} options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('./images/back.png')} style={styles.backIcon} />
            </TouchableOpacity>
          ),
        })} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function CustomDrawerContent(props) {
  const { navigation } = props;
  const [activeItem, setActiveItem] = useState('Notes');

  const handlePress = (screen) => {
    setActiveItem(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Notes App</Text>
          <Text style={styles.circleTextLower}>Manage your notes</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'Notes' && styles.activeMenuItem]}
        onPress={() => handlePress('Notes')}
      >
        <Image style={styles.icon} source={Notes} />
        <Text style={[styles.menuText, activeItem === 'Notes' && styles.activeMenuText]}>Notes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'Add note' && styles.activeMenuItem]}
        onPress={() => handlePress('Add note')}
      >
        <Image style={styles.icon} source={Plus} />
        <Text style={[styles.menuText, activeItem === 'Add note' && styles.activeMenuText]}>Add note</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'Add category' && styles.activeMenuItem]}
        onPress={() => handlePress('Add category')}
      >
        <Image style={styles.icon} source={Plus} />
        <Text style={[styles.menuText, activeItem === 'Add category' && styles.activeMenuText]}>Add category</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuItem, activeItem === 'Info' && styles.activeMenuItem]}
        onPress={() => handlePress('Info')}
      >
        <Image style={styles.icon} source={Info} />
        <Text style={[styles.menuText, activeItem === 'Info' && styles.activeMenuText]}>Info</Text>
      </TouchableOpacity>
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
  },
  menuItem: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 10,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(124,210,244, 0.7)',
  },
  activeMenuText: {
    fontWeight: 'bold',
  },
  backIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});
