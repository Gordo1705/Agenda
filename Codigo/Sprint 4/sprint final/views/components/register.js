import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Inicialización de la app y obtención del objeto de autenticación
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Función para manejar la creación de cuenta
  const handleCreateAccount = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Campos vacíos', 'Por favor completa todos los campos.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user; // obtegngo user
        console.log('Cuenta creada exitosamente:', user);
        Alert.alert('Registro exitoso', 'Cuenta creada exitosamente.');
        navigation.navigate('Login'); // Redirige al usuario al login
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al crear la cuenta:', errorMessage);
        Alert.alert('Error', 'Hubo un error al crear la cuenta. Por favor intenta nuevamente.');
      });
  };

  // Función para navegar al inicio de sesión
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Comencemos!</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.secondaryFooterText}>
        <Text style={styles.secondaryText}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity style={styles.ContainerSecondary} onPress={handleLogin}>
          <Text style={styles.secondaryButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEDEC',
    alignContent: 'center',
    padding: 40,
  },
  title: {
    fontSize: 30,
    color: '#333232',
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  input: {
    height: 55,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 22,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#333232',
    height: 55,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryFooterText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryText: {
    color: '#333232',
    fontWeight: 'bold',
  },
  secondaryButton: {
    color: '#333232',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Register;
