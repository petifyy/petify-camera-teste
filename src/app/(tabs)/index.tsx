
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';

const AZUL_ESCURO = '#004468';
const AZUL = '#389DD1';
const AZUL_CLARO = '#66BDEA';
const AMARELO = '#FFE26D';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: 'Petify Camera' }} />

      <View style={styles.logoArea}>
        <Text style={styles.logo}>petify</Text>
        <Text style={styles.logoSubtitulo}>CUIDADO E MONITORAMENTO</Text>
      </View>

      <View style={styles.cardPrincipal}>
        <Text style={styles.titulo}>Câmera ao vivo</Text>
        <Text style={styles.descricao}>
          A conexão com câmeras compatíveis é uma função extra da Petify
          que fará um melhor monitoramento!
        </Text>

        <View style={styles.imagemArea}>
          <Text style={styles.imagemTexto}>IMAGEMEXEMPLO</Text>
          <Text style={styles.imagemLegenda}>
            Imagem ilustrativa de uma câmera
          </Text>
        </View>

        <View style={styles.opcoes}>
          <View style={[styles.opcao, styles.opcaoAmarela]}>
            <Text style={styles.opcaoTitulo}>
              Tenho uma câmera compatível!
            </Text>

            <View style={styles.espaco} />

            <TouchableOpacity
              style={[styles.botao, styles.botaoAzul]}
              onPress={() => router.push('/marcas')}
              activeOpacity={0.85}
            >
              <Text style={styles.botaoTextoClaro}>Conectar</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.opcao, styles.opcaoAzul]}>
            <Text style={styles.opcaoTitulo}>
              Quero uma câmera para monitoramento
            </Text>

            <View style={styles.espaco} />

            <TouchableOpacity
              style={[styles.botao, styles.botaoAmarelo]}
              onPress={() => router.push('/comprar')}
              activeOpacity={0.85}
            >
              <Text style={styles.botaoTextoEscuro}>Compre já!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.rodape}>
        PETIFY · MAIS CUIDADO, MAIS TRANQUILIDADE
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFD',
  },
  conteudo: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 28,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    color: AZUL_ESCURO,
    fontSize: 39,
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -2,
  },
  logoSubtitulo: {
    color: AZUL,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 2,
  },
  cardPrincipal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E7EEF2',
    shadowColor: AZUL_ESCURO,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 5,
  },
  titulo: {
    color: AZUL_ESCURO,
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 8,
  },
  descricao: {
    color: '#526570',
    fontSize: 14,
    lineHeight: 21,
  },
  imagemArea: {
    minHeight: 110,
    backgroundColor: '#F0F8FC',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#DCEEF7',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 12,
  },
  imagemTexto: {
    color: AZUL,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 1,
  },
  imagemLegenda: {
    color: '#718692',
    fontSize: 11,
    marginTop: 6,
  },
  opcoes: {
    flexDirection: 'row',
    gap: 12,
  },
  opcao: {
    flex: 1,
    minWidth: 0,
    minHeight: 205,
    borderRadius: 24,
    padding: 12,
    paddingTop: 20,
    alignItems: 'center',
  },
  opcaoAmarela: {
    backgroundColor: '#FFF6D7',
  },
  opcaoAzul: {
    backgroundColor: '#D8EFF9',
  },
  opcaoTitulo: {
    color: AZUL_ESCURO,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 23,
  },
  espaco: {
    flex: 1,
    minHeight: 18,
  },
  botao: {
    width: '100%',
    minHeight: 43,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  botaoAzul: {
    backgroundColor: AZUL,
  },
  botaoAmarelo: {
    backgroundColor: AMARELO,
  },
  botaoTextoClaro: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  botaoTextoEscuro: {
    color: AZUL_ESCURO,
    fontSize: 14,
    fontWeight: '800',
  },
  rodape: {
    color: '#78909C',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.1,
    textAlign: 'center',
    marginTop: 22,
  },
});
