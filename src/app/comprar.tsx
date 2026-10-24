
import { FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack } from 'expo-router';

export default function ComprarScreen() {
  const dicas = [
    'Procure "ONVIF Profile S" ou "Profile T" na descrição ou no manual.',
    'Prefira câmeras ligadas na tomada (as de bateria quase nunca têm ONVIF).',
    'Wi-Fi 2.4 GHz, resolução 1080p ou mais e visão noturna.',
    'Câmera que gira e inclina ajuda a acompanhar o pet pela casa.',
    'Áudio nos dois sentidos permite falar com o pet.',
    'Evite marcas que só funcionam com a nuvem delas (Ring, Nest, Arlo, Eufy).',
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Comprar uma câmera' }} />
      <FlatList
        contentContainerStyle={styles.lista}
        data={dicas}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <Text style={styles.subtitulo}>
            Como escolher uma câmera compatível
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.texto}>✔ {item}</Text>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.botao}
            onPress={() =>
              Linking.openURL('https://www.onvif.org/conformant-products/')
            }
          >
            <Text style={styles.botaoTexto}>Ver lista oficial ONVIF</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lista: {
    padding: 16,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#222222',
  },
  card: {
    backgroundColor: '#F2F2F7',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  texto: {
    fontSize: 14,
    color: '#333333',
  },
  botao: {
    backgroundColor: '#6C5CE7',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
