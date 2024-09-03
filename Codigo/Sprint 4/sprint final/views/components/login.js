import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hook de navegación
  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Usuario autenticado correctamente!");
        const user = userCredential.user;
        console.log(user);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.log("Error al autenticar:", error.message);

      });
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View>
          <Text>Bienvenido, {email}!</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Homescreen')}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.headerText}>¡Bienvenido de nuevo!</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.forgetText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <Text style={styles.TextUnderLogin}>o continúa con</Text>

          {/* Botones de Google y GitHub u otros proveedores */}
          <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => console.log('Login with Google')}>
            <Text style={[styles.buttonText, { color: '#000' }]}>Google</Text>
          </TouchableOpacity>
          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
          </View>
          {/* Registro */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿Aún no tienes una cuenta?</Text>
            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEDEC',
    alignItems: 'center',
    padding: 40,
  },
  headerText: {
    marginBottom: 30,
    fontSize: 24,
    color: '#333232',
    fontWeight: 'bold',
  },
  input: {
    height: 55,
    width: 300,
    borderColor: '#333232',
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
    marginTop: 7,
    marginBottom: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgetText: {
    textAlign: 'right',
    paddingBottom: 20,
    fontSize: 13,
    fontWeight: 'bold',
  },
  TextUnderLogin: {
    margin: 20,
    textAlign: 'center',
    fontSize: 12,
  },
  googleButton: {
    backgroundColor: '#EFEDEC',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    width: '80%',
    marginVertical: 20,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  registerText: {
    color: 'black',
  },
  registerButton: {
    padding: 8,
    borderRadius: 5,
  },
  registerButtonText: {
    color: '#333232',
    fontWeight: 'bold',
  },
});
