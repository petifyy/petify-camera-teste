
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MARCAS } from '../data/marcas';

export default function MarcasScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Marcas compatíveis' }} />
      <FlatList
        contentContainerStyle={styles.lista}
        data={MARCAS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.subtitulo}>Marcas compatíveis</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.nome}</Text>
            <Text style={styles.cardTexto}>{item.modelos.join(' • ')}</Text>
            <Text style={styles.observacao}>{item.obs}</Text>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/conectar',
                  params: { marca: JSON.stringify(item) },
                })
              }
            >
              <Text style={styles.link}>Conectar esta marca →</Text>
            </TouchableOpacity>
          </View>
        )}
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
  cardTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },
  cardTexto: {
    fontSize: 14,
    marginTop: 4,
    color: '#333333',
  },
  observacao: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  link: {
    color: '#6C5CE7',
    marginTop: 8,
    fontWeight: '600',
  },
});
