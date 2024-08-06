import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isAnimating, setAnimating] = useState(false); // Para manejar la animación de cierre
  const menuTranslateX = useRef(new Animated.Value(-width * 0.5)).current; // Inicialmente fuera de la pantalla a la izquierda

  // Maneja la visibilidad del menú
  const toggleMenu = () => {
    if (isMenuVisible) {
      // Si el menú está visible, comienza la animación de repliegue
      Animated.timing(menuTranslateX, {
        toValue: -width * 0.5,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => {
        // Después de la animación de repliegue, oculta el menú
        setMenuVisible(false);
        setAnimating(false);
      });
      setAnimating(true);
    } else {
      // Si el menú está oculto, muestra el menú y comienza la animación de despliegue
      setMenuVisible(true);
      setAnimating(true);
      Animated.timing(menuTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start(() => setAnimating(false));
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado negro */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleMenu}
          accessibilityLabel="Menú"
          accessibilityHint="Abre o cierra el menú principal"
        >
          <FontAwesome name="bars" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menú desplegable */}
      {(isMenuVisible || isAnimating) && (
        <Animated.View
          style={[
            styles.menu,
            {
              transform: [{ translateX: menuTranslateX }],
            }
          ]}
        >
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Opción 1')}>
            <Text style={styles.menuText}>Opción 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Opción 2')}>
            <Text style={styles.menuText}>Opción 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Opción 3')}>
            <Text style={styles.menuText}>Opción 3</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para el contenedor
  },
  header: {
    height: 80, // Altura del encabezado
    backgroundColor: '#000', // Fondo negro para el encabezado
    justifyContent: 'center', // Centra el contenido verticalmente
    paddingHorizontal: 20, // Espacio a los lados del encabezado
    position: 'relative', // Permite que el botón esté posicionado absolutamente dentro del encabezado
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000', // Fondo negro para camuflar el botón con el encabezado
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Posiciona el botón dentro del encabezado
    top: 10, // Ajusta la posición vertical del botón dentro del encabezado
    left: 10, // Ajusta la posición horizontal del botón dentro del encabezado
  },
  menu: {
    position: 'absolute',
    height: height - 80, // Ocupa toda la altura de la pantalla menos el espacio del encabezado
    width: width * 0.5, // Ocupa el 50% del ancho de la pantalla
    backgroundColor: '#fff', // Fondo blanco para que coincida con el fondo del contenedor
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10,
    zIndex: 0, // Asegura que el menú esté detrás del botón
    top: 80, // Ajusta la posición del menú para que esté debajo del encabezado
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

export default HomeScreen;
