import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  const handleGitHubLogin = () => {
    console.log('Login with GitHub');
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View>
          <Text>Bienvenido, {username}!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>¡Bienvenido de nuevo!</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
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
              <Image source={require('/home/administrador/my-app/views/components/images/google-logo.png')} style={styles.buttonImage} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.githubButton]} onPress={handleGitHubLogin}>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonText, { color: '#000' }]}>Iniciar con GitHub</Text>
              <Image source={require('/home/administrador/my-app/views/components/images/github-logo.png')} style={styles.buttonImage} />
            </View>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Has olvidado tu usuario?</Text>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegisterRedirect}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonImage: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  githubButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
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
    marginRight: 10,
    color: 'black',
  },
  registerButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  registerButtonText: {
    color: '#fff',
  },
});
