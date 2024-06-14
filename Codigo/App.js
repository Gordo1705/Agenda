import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Validar que los campos no estén vacíos
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Aquí podrías agregar lógica para autenticar al usuario
    // En este ejemplo, simplemente simulamos que el usuario está "logueado" al presionar el botón
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleGoogleLogin = () => {
    // Aquí iría la lógica para iniciar sesión con Google
    console.log('Login with Google');
    // Esta función debería integrarse con la API de Google para autenticar al usuario
  };

  const handleGitHubLogin = () => {
    // Aquí iría la lógica para iniciar sesión con GitHub
    console.log('Login with GitHub');
    // Esta función debería integrarse con la API de GitHub para autenticar al usuario
  };

  const handleRegisterRedirect = () => {
    // Aquí iría la lógica para redirigir a la página de registro
    console.log('Redirect to register page');
    // Deberías implementar la navegación a la página de registro de tu aplicación
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View>
          <Text>Welcome, {username}!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleLogin}>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonText, { color: '#000' }]}>Iniciar con Google</Text>
              <Image source={require('/home/administrador/my-app/assets/google.png')} style={styles.buttonIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.githubButton]} onPress={handleGitHubLogin}>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonText, { color: '#000' }]}>Iniciar con GitHub</Text>
              <Image source={require('/home/administrador/my-app/assets/github.png')} style={styles.buttonIcon} />
            </View>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterRedirect}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.footerText}>© 2024 Mi Empresa. Todos los derechos reservados.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 300,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
  },
  githubButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginLeft:10,
  },
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    width: '80%', // Ancho ajustado al 80%
    marginVertical: 20,
  },
  registerButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 300,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
