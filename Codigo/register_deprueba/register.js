import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/database';


export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegister = () => {
    if (email.trim() === '' || phone.trim() === '' || password.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    // Guardo los datos en Firebase
    firebase.database().ref('users').push({
      email: email,
      phone: phone,
      password: password,
      // Otros datos a guardar
    })
    .then(() => {
      alert('Registro exitoso');
      navigation.navigate('Login');
    })
    .catch(error => {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un problema al intentar registrar. Por favor intenta nuevamente.');
    });
  };
  
  

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>¡Comenzemos!</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu Telefono"
        value={phone}
        onChangeText={setPhone}
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sing Up</Text>
      </TouchableOpacity>
      <View style={styles.secondaryFooterText}>
        <Text style={styles.secondaryText}>Ya tienes una cuenta?</Text>
        <TouchableOpacity style={styles.ContainerSecondary} onPress={handleLogin}>
          <Text style={styles.secondaryButton}> Login </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    fontWeight:'bold',
    paddingBottom: 40,
  },

  label: {
    fontSize: 18,
    marginBottom: 5,
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

  secondaryButton:{
    color: '#333232',
    fontWeight: 'bold',
  },
});
