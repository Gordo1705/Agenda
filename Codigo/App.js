import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('/home/administrador/my-app/assets/escudo.jpg')}
          style={width:100px;}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>franco</Text>
        <Text>blas</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: 'center',
    justifyContent: 'center', // Alinear el contenido en el centro vertical
  },
  textContainer: {
    marginBottom: 50,
  },
  imageContainer: {
    marginBottom: 20, // Espacio entre la imagen y el texto
  },
  image: {
    width: 200, // Ajustar el ancho de la imagen según tus necesidades
    height: 200, // Ajustar la altura de la imagen según tus necesidades
    resizeMode: 'contain', // Ajustar la imagen dentro del tamaño especificado
  },
});
