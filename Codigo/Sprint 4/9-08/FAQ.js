import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Animated, Easing } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import MenuHamburguesa from './MenuHamburguesa'; // Ajusta la ruta según tu estructura de archivos

const faqData = [
  { question: '¿Cómo puedo usar la aplicación?', answer: 'Para usar la aplicación, solo tienes que iniciar sesión y explorar las funcionalidades disponibles en la pantalla principal.' },
  { question: '¿Es necesario registrarse?', answer: 'Sí, debes registrarte para poder acceder a todas las funciones de la aplicación.' },
  { question: '¿Dónde puedo encontrar mi perfil?', answer: 'Puedes encontrar tu perfil en la pestaña "Perfil" en la esquina inferior derecha de la pantalla.' },
  { question: '¿Cómo restablezco mi contraseña?', answer: 'Puedes restablecer tu contraseña desde la pantalla de inicio de sesión, seleccionando la opción "Olvidé mi contraseña".' },
  { question: '¿Cómo contacto con soporte?', answer: 'Para contactar con soporte, dirígete a la sección "Soporte" en el menú principal y elige "Contactar con soporte".' },
];

const FAQScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isSupportVisible, setIsSupportVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false); // Añadido para el menú hamburguesa

  const animation = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const toggleSupport = () => {
    const toValue = isSupportVisible ? 0 : 1;
    const rotateValue = isSupportVisible ? 0 : 1;

    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue: rotateValue,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    setIsSupportVisible(prev => !prev);
  };

  const handleSend = () => {
    // Aquí puedes agregar la lógica para enviar el mensaje, como una llamada a una API.
    console.log('Mensaje enviado:', message);
    setMessage('');
  };

  const supportTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // Ajusta el valor según la altura de tu área de soporte
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // Flecha de 0 a 180 grados
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => setIsMenuVisible(prev => !prev)}>
        <FontAwesome name="bars" size={30} color="#fff" />
      </TouchableOpacity>
      <MenuHamburguesa isVisible={isMenuVisible} onClose={() => setIsMenuVisible(false)} />

      <Text style={styles.title}>Preguntas Frecuentes</Text>
      <ScrollView style={styles.faqContainer}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => handlePress(index)} style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.arrow}>{expandedIndex === index ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {expandedIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSupport} accessibilityLabel="Mostrar/ocultar soporte">
        <Animated.Text style={[styles.toggleButtonText, { transform: [{ rotate }] }]}>
          {isSupportVisible ? '▲' : '▼'}
        </Animated.Text>
      </TouchableOpacity>
      <Animated.View style={[styles.contactContainer, { transform: [{ translateY: supportTranslateY }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleSupport} accessibilityLabel="Plegar soporte">
          <Animated.Text style={[styles.closeButtonText, { transform: [{ rotate }] }]}>▼</Animated.Text>
        </TouchableOpacity>
        <Text style={styles.contactTitle}>Contactar con Soporte</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={3}
          placeholder="Escribe tu consulta aquí..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} accessibilityLabel="Enviar mensaje">
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#f8f8f8',
  },
  faqContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  faqItem: {
    marginBottom: 15,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  question: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  answerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  answer: {
    fontSize: 14,
    color: '#555',
  },
  contactContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 80, // Añade espacio adicional en la parte inferior
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 60,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 24, // Tamaño de la flecha en el botón de despliegue
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8, // Reduce el padding para hacer el botón más pequeño
    zIndex: 1, // Asegúrate de que el botón esté en la capa superior
  },
  closeButtonText: {
    fontSize: 20, // Reduce el tamaño de la flecha
    color: '#000',
    textAlign: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
});

export default FAQScreen;
