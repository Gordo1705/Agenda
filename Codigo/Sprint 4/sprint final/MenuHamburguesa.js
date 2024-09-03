import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MenuHamburguesa = ({ isVisible, onClose }) => {
  const menuTranslateX = useRef(new Animated.Value(-width * 0.5)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(menuTranslateX, {
      toValue: isVisible ? 0 : -width * 0.5,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={[
        styles.menu,
        {
          transform: [{ translateX: menuTranslateX }],
        },
      ]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <FontAwesome name="close" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('Homescreen'); // Navegar a la pantalla HomeScreen
          onClose(); // Cerrar el menú
        }}
      >
        <Text style={styles.menuText}>HomeScreen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('FAQScreen'); // Navegar a la pantalla FAQScreen
          onClose(); // Cerrar el menú
        }}
      >
        <Text style={styles.menuText}>FAQ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          console.log('Opción 3');
          onClose(); // Cerrar el menú
        }}
      >
        <Text style={styles.menuText}>Cerrar Menú</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: width * 0.5,
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10,
    zIndex: 1,
  },
  closeButton: {
    alignItems: 'flex-end',
    padding: 10,
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
  },
});

export default MenuHamburguesa;
