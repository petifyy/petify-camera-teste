import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MARCAS } from '../data/marcas';

export default function MarcasScreen() {
  const router = useRouter();

  const logosMarcas: Record<string, any> = {
  intelbras: require('../../assets/images/marcasCam/intelbras.png'),
  "tp-link tapo": require('../../assets/images/marcasCam/tapo.png'),
  reolink: require('../../assets/images/marcasCam/reolink.png'),
  jortan: require('../../assets/images/marcasCam/jortann.jpg'),
};

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.voltar}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={30} color="#858585" />
        </TouchableOpacity>

        <Text style={styles.logo}>
          <Text style={styles.logoPet}>pet</Text>
          <Text style={styles.logoI}>i</Text>
          <Text style={styles.logoFy}>fy</Text>
        </Text>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.imagemContainer}>
          <Image
            source={require('../../assets/images/camera.png')}
            style={styles.imagemCamera}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subtitulo}>
          Escolha a marca da sua câmera
        </Text>

        <FlatList
          contentContainerStyle={styles.lista}
          data={MARCAS}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            console.log('Marca:', item.nome);
            console.log('Logo:', logosMarcas[item.nome.toLowerCase()]);

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.7}
                onPress={() =>
                  router.push({
                    pathname: '/conectar',
                    params: { marca: JSON.stringify(item) },
                  })
                }
              >
                <Image
                  source={logosMarcas[item.nome.trim().toLowerCase()]}
                  style={styles.logoMarca}
                  resizeMode="contain"
                />

                <Ionicons
                  name="chevron-forward"
                  size={25}
                  color="#858585"
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  header: {
    height: 145,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  voltar: {
    position: 'absolute',
    left: 20,
    top: 57,
    zIndex: 1,
  },
  logo: {
    fontSize: 43,
    fontWeight: '400',
    fontStyle: 'italic',
    letterSpacing: -2.5,
    marginTop: 15,
  },
  logoPet: {
    color: '#FFE26D',
  },
  logoI: {
    color: '#66BDEA',
  },
  logoFy: {
    color: '#389DD1',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 26,
  },
  imagemContainer: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagemCamera: {
    width: 175,
    height: 155,
  },
  subtitulo: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0077C8',
    marginBottom: 16,
    marginLeft: 14,
  },
  lista: {
    paddingBottom: 25,
  },
  card: {
    height: 47,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 8,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.13,
    shadowRadius: 3,
    elevation: 2,
  },
  logoMarca: {
    width: 125,
    height: 35,
  },
  cardTitulo: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.7,
  },
});