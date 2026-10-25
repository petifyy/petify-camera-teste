import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { BRIDGE } from '../config';

const AZUL_ESCURO = '#004468';
const AZUL = '#389DD1';
const AZUL_CLARO = '#66BDEA';
const AMARELO = '#FFE26D';

const passos = [
  {
    titulo: 'Ligue sua câmera',
    descricao:
      'Conecte a câmera à tomada e aguarde até que ela termine de iniciar.',
    icone: '1',
  },
  {
    titulo: 'Conecte ao Wi-Fi',
    descricao:
      'Configure a câmera pelo aplicativo da própria marca. Deixe o celular e a câmera na mesma rede Wi-Fi.',
    icone: '2',
  },
  {
    titulo: 'Localize o endereço IP',
    descricao:
      'Procure o endereço IP da câmera nas configurações do dispositivo, no aplicativo da marca ou na lista de aparelhos conectados ao roteador.',
    icone: '3',
  },
  {
    titulo: 'Confira os dados de acesso',
    descricao:
      'Você precisará do usuário e da senha do dispositivo. Verifique também se o modelo oferece ONVIF e se esse acesso está habilitado.',
    icone: '4',
  },
];

export default function ConectarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ marca?: string }>();

  let marca: any = null;

  try {
    marca = params.marca ? JSON.parse(params.marca) : null;
  } catch {
    marca = null;
  }

  const [etapa, setEtapa] = useState(0);
  const [ip, setIp] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function conectar() {
    if (!marca) {
      Alert.alert('Marca não identificada', 'Volte e selecione a marca da câmera.');
      return;
    }

    if (!ip.trim() || !usuario.trim() || !senha) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha o IP, o usuário e a senha da câmera.',
      );
      return;
    }

    setLoading(true);

    try {
      const resposta = await fetch(`${BRIDGE}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: ip.trim(),
          porta: marca.porta,
          usuario: usuario.trim(),
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível conectar à câmera.');
      }

      router.push({
        pathname: '/video',
        params: { dados: JSON.stringify(dados) },
      });
    } catch (erro) {
      const mensagem =
        erro instanceof Error ? erro.message : 'Erro desconhecido.';

      Alert.alert(
        'Não foi possível conectar',
        'Confira o IP, as credenciais, a rede Wi-Fi e se o modelo oferece ONVIF.\n\n' +
          mensagem,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: 'Conectar câmera' }} />

      <View style={styles.cabecalho}>
        <View style={styles.logoCirculo}>
          <Text style={styles.logoTexto}>P</Text>
        </View>
        <Text style={styles.marcaPetify}>petify</Text>
        <Text style={styles.subtitulo}>
          {marca?.nome || 'Sua câmera'} · Configuração
        </Text>
      </View>

      <View style={styles.progresso}>
        {[0, 1].map((item) => (
          <View
            key={item}
            style={[
              styles.progressoParte,
              etapa === item && styles.progressoAtivo,
            ]}
          />
        ))}
      </View>

      {etapa === 0 ? (
        <>
          <Text style={styles.titulo}>Vamos preparar sua câmera?</Text>
          <Text style={styles.textoIntro}>
            Siga estas etapas antes de informar os dados de acesso.
          </Text>

          {passos.map((passo) => (
            <View key={passo.icone} style={styles.cardPasso}>
              <View style={styles.numero}>
                <Text style={styles.numeroTexto}>{passo.icone}</Text>
              </View>
              <View style={styles.textoPasso}>
                <Text style={styles.tituloPasso}>{passo.titulo}</Text>
                <Text style={styles.descricaoPasso}>{passo.descricao}</Text>
              </View>
            </View>
          ))}

          <View style={styles.aviso}>
            <Text style={styles.avisoTitulo}>Importante</Text>
            <Text style={styles.avisoTexto}>
              Nem toda câmera é compatível com ONVIF. Se não encontrar o IP ou
              os dados de acesso, consulte o manual do seu modelo.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setEtapa(1)}
            activeOpacity={0.85}
          >
            <Text style={styles.botaoTexto}>Continuar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.titulo}>Dados da câmera</Text>
          <Text style={styles.textoIntro}>
            Informe os dados do dispositivo {marca?.nome || 'selecionado'}.
          </Text>

          <Text style={styles.label}>Endereço IP</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: 192.168.0.50"
            placeholderTextColor="#7B929E"
            value={ip}
            onChangeText={setIp}
            keyboardType="numbers-and-punctuation"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Usuário do dispositivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o usuário da câmera"
            placeholderTextColor="#7B929E"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha do dispositivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a senha da câmera"
            placeholderTextColor="#7B929E"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.ajuda}>
            Esses dados são usados para tentar acessar a câmera pela rede local.
          </Text>

          <TouchableOpacity
            style={[styles.botao, loading && styles.botaoDesativado]}
            onPress={conectar}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botaoTexto}>Conectar câmera</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() => setEtapa(0)}
          >
            <Text style={styles.botaoSecundarioTexto}>Voltar às instruções</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFD',
  },
  conteudo: {
    padding: 20,
    paddingBottom: 36,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCirculo: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: AZUL_ESCURO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTexto: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
  },
  marcaPetify: {
    color: AZUL_ESCURO,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 5,
    fontStyle: 'italic',
  },
  subtitulo: {
    color: '#547080',
    fontSize: 14,
    marginTop: 5,
  },
  progresso: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  progressoParte: {
    flex: 1,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#D9E7EF',
  },
  progressoAtivo: {
    backgroundColor: AZUL,
  },
  titulo: {
    fontSize: 23,
    fontWeight: '800',
    color: AZUL_ESCURO,
    marginBottom: 8,
  },
  textoIntro: {
    fontSize: 15,
    lineHeight: 22,
    color: '#526B79',
    marginBottom: 20,
  },
  cardPasso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0EDF4',
    gap: 12,
  },
  numero: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#DFF3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroTexto: {
    fontSize: 16,
    fontWeight: '800',
    color: AZUL_ESCURO,
  },
  textoPasso: {
    flex: 1,
  },
  tituloPasso: {
    color: AZUL_ESCURO,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
  descricaoPasso: {
    color: '#526B79',
    fontSize: 13,
    lineHeight: 20,
  },
  aviso: {
    backgroundColor: '#FFF8D9',
    borderRadius: 14,
    padding: 15,
    marginTop: 4,
    marginBottom: 20,
  },
  avisoTitulo: {
    color: AZUL_ESCURO,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 5,
  },
  avisoTexto: {
    color: '#52616A',
    fontSize: 13,
    lineHeight: 19,
  },
  label: {
    color: AZUL_ESCURO,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4E4ED',
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: AZUL_ESCURO,
    fontSize: 15,
  },
  ajuda: {
    fontSize: 12,
    lineHeight: 18,
    color: '#647D8B',
    marginTop: 12,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: AZUL,
    minHeight: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 8,
    shadowColor: AZUL_ESCURO,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 3,
  },
  botaoDesativado: {
    opacity: 0.65,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  botaoSecundario: {
    alignItems: 'center',
    padding: 16,
    marginTop: 4,
  },
  botaoSecundarioTexto: {
    color: AZUL_ESCURO,
    fontWeight: '700',
    fontSize: 14,
  },
});
