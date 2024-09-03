import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MenuHamburguesa from '../../MenuHamburguesa'; // Ajustar ruta si abris d otra pc

const HomeScreen = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Botón de hamburguesa para abrir el menú */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <FontAwesome name="bars" size={30} color="#fff" />
      </TouchableOpacity>

      <View style={styles.square}>
        <Text style={styles.text}>Homescreen</Text>
      </View>
      <MenuHamburguesa isVisible={isMenuVisible} onClose={toggleMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
});

export default HomeScreen;