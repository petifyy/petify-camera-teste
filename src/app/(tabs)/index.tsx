
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { GO2RTC } from '../../config';

const AZUL_ESCURO = '#004468';
const AZUL = '#389DD1';
const AZUL_CLARO = '#66BDEA';
const AMARELO = '#FFE26D';

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ dados?: string }>();

  let dados: any = {};

  try {
    dados = params.dados ? JSON.parse(params.dados) : {};
  } catch {
    dados = {};
  }

  const nomeStream = dados.stream;
  const cameraConectada = !!dados.info && !!nomeStream;
  const nomeCamera = dados.info?.manufacturer || 'Câmera';
  const modeloCamera = dados.info?.model || '';

  const videoUrl = `${GO2RTC.replace(/\/$/, '')}/api/stream.mjpeg?src=${encodeURIComponent(nomeStream || '')}`;

  const videoHtml = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
          }
          body {
            background: #000;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${videoUrl}" />
      </body>
    </html>
  `;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: 'Petify Camera' }} />

      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Petify</Text>
      </View>

      <View style={styles.cardPrincipal}>
        <Text style={styles.titulo}>Câmera ao vivo</Text>
        <Text style={styles.descricao}>
          Acompanhe seu pet de onde estiver.
        </Text>

        {cameraConectada ? (
          <View style={styles.cameraConectada}>
            <View style={styles.cameraCabecalho}>
              <View>
                <Text style={styles.cameraNome}>
                  {nomeCamera} {modeloCamera}
                </Text>
                <Text style={styles.cameraSubtitulo}>
                  Sua câmera está conectada
                </Text>
              </View>

              <View style={styles.statusAoVivo}>
                <View style={styles.pontoAoVivo} />
                <Text style={styles.statusTexto}>AO VIVO</Text>
              </View>
            </View>

            <View style={styles.videoContainer}>
              <WebView
                style={styles.video}
                source={{ html: videoHtml }}
                javaScriptEnabled
                scrollEnabled={false}
                allowsInlineMediaPlayback
              />
            </View>

            <View style={styles.controlesCamera}>
              <View style={styles.controleDesativado}>
                <Text style={styles.controleTexto}>Som</Text>
                <Text style={styles.controleLegenda}>Em breve</Text>
              </View>

              <View style={styles.controleDesativado}>
                <Text style={styles.controleTexto}>Gravar</Text>
                <Text style={styles.controleLegenda}>Em breve</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.botaoExpandir}
              onPress={() =>
                router.push({
                  pathname: '/video',
                  params: { dados: JSON.stringify(dados) },
                })
              }
            >
              <Text style={styles.botaoExpandirTexto}>
                Expandir vídeo
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.opcoes}>
            <View style={[styles.opcao, styles.opcaoAmarela]}>
              <Text style={styles.opcaoTitulo}>
                Tenho uma câmera compatível!
              </Text>

              <TouchableOpacity
                style={styles.botaoConectar}
                onPress={() => router.push('/marcas')}
              >
                <Text style={styles.botaoConectarTexto}>Conectar</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.opcao, styles.opcaoAzul]}>
              <Text style={styles.opcaoTitulo}>
                Quero uma câmera para monitoramento
              </Text>

              <TouchableOpacity
                style={styles.botaoComprar}
                onPress={() => router.push('/comprar')}
              >
                <Text style={styles.botaoComprarTexto}>Compre já!</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <Text style={styles.rodape}>
        Petify Camera
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFC',
  },
  conteudo: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: AZUL_ESCURO,
  },
  cardPrincipal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: AZUL_ESCURO,
    marginBottom: 8,
  },
  descricao: {
    fontSize: 14,
    color: '#647985',
    marginBottom: 20,
  },
  opcoes: {
    flexDirection: 'row',
    gap: 12,
  },
  opcao: {
    flex: 1,
    minHeight: 180,
    borderRadius: 16,
    padding: 14,
    justifyContent: 'space-between',
  },
  opcaoAmarela: {
    backgroundColor: AMARELO,
  },
  opcaoAzul: {
    backgroundColor: AZUL_CLARO,
  },
  opcaoTitulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: AZUL_ESCURO,
  },
  botaoConectar: {
    backgroundColor: AZUL_ESCURO,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoConectarTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  botaoComprar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoComprarTexto: {
    color: AZUL_ESCURO,
    fontWeight: 'bold',
  },
  cameraConectada: {
    gap: 14,
  },
  cameraCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  cameraNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AZUL_ESCURO,
  },
  cameraSubtitulo: {
    fontSize: 12,
    color: '#647985',
    marginTop: 3,
  },
  statusAoVivo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDECEC',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  pontoAoVivo: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#E53935',
  },
  statusTexto: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#C62828',
  },
  videoContainer: {
    width: '100%',
    height: 210,
    backgroundColor: '#000000',
    borderRadius: 14,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
    backgroundColor: '#000000',
  },
  controlesCamera: {
    flexDirection: 'row',
    gap: 10,
  },
  controleDesativado: {
    flex: 1,
    backgroundColor: '#F0F5F7',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  controleTexto: {
    color: AZUL_ESCURO,
    fontSize: 14,
    fontWeight: 'bold',
  },
  controleLegenda: {
    color: '#82939B',
    fontSize: 10,
    marginTop: 3,
  },
  botaoExpandir: {
    backgroundColor: AZUL_ESCURO,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoExpandirTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rodape: {
    textAlign: 'center',
    color: '#82939B',
    fontSize: 12,
    marginTop: 30,
    marginBottom: 15,
  },
});
