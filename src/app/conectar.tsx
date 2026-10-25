
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
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { BRIDGE } from '../config';

const AZUL_ESCURO = '#004468';
const AZUL = '#389DD1';
const AZUL_CLARO = '#66BDEA';
const AMARELO = '#FFE26D';

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
      Alert.alert('Atenção', 'Selecione novamente a marca da sua câmera.');
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
        'Confira o IP, os dados de acesso e a compatibilidade da câmera com ONVIF.\n\n' +
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
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen
        options={{
          title: etapa === 0 ? 'Conecte a câmera' : 'Dados da câmera',
        }}
      />

      <TouchableOpacity
        style={styles.voltar}
        onPress={() => {
          if (etapa === 1) {
            setEtapa(0);
          } else {
            router.back();
          }
        }}
      >
        <Ionicons name="chevron-back" size={28} color="#858585" />
      </TouchableOpacity>

      <View style={styles.logoArea}>
        <Text style={styles.logo}>IMAGEMEXEMPLO</Text>
        <Text style={styles.tituloLogo}>
          {etapa === 0 ? 'Conecte sua câmera' : 'Dados de conexão'}
        </Text>
      </View>

      {etapa === 0 ? (
        <>
          <View style={styles.ilustracao}>
            <View style={styles.circuloExterno}>
              <View style={styles.circuloInterno}>
                <Text style={styles.imagemExemplo}>IMAGEMEXEMPLO</Text>
              </View>
            </View>
          </View>

          <Text style={styles.tituloSecao}>Passos para conexão</Text>

          <View style={styles.passo}>
            <View style={styles.iconePasso}>
              <Ionicons
                name="power-outline"
                size={29}
                color={AZUL}
              />
            </View>
            <View style={styles.textoPasso}>
              <Text style={styles.tituloPasso}>Ligue a câmera</Text>
              <Text style={styles.descricaoPasso}>
                Conecte-a à tomada e aguarde até que termine de iniciar.
              </Text>
            </View>
          </View>

          <View style={styles.passo}>
            <View style={styles.iconePasso}>
              <Ionicons
                name="wifi-outline"
                size={29}
                color={AZUL}
              />
            </View>
            <View style={styles.textoPasso}>
              <Text style={styles.tituloPasso}>Conecte ao Wi-Fi</Text>
              <Text style={styles.descricaoPasso}>
                Configure a câmera pelo aplicativo da marca. O celular e a
                câmera devem estar na mesma rede.
              </Text>
            </View>
          </View>

          <View style={styles.passo}>
            <View style={styles.iconePasso}>
              <Ionicons
                name="search-outline"
                size={29}
                color={AZUL}
              />
            </View>
            <View style={styles.textoPasso}>
              <Text style={styles.tituloPasso}>Procure o endereço IP</Text>
              <Text style={styles.descricaoPasso}>
                Consulte as configurações da câmera, seu aplicativo ou a lista
                de dispositivos do roteador.
              </Text>
            </View>
          </View>

          <View style={styles.passo}>
            <View style={styles.iconePasso}>
              <Ionicons
                name="lock-closed-outline"
                size={27}
                color={AZUL}
              />
            </View>
            <View style={styles.textoPasso}>
              <Text style={styles.tituloPasso}>Confira o acesso ONVIF</Text>
              <Text style={styles.descricaoPasso}>
                Verifique se seu modelo oferece ONVIF e obtenha o usuário e a
                senha do dispositivo.
              </Text>
            </View>
          </View>

          <View style={styles.dica}>
            <Ionicons
              name="information-circle-outline"
              size={27}
              color={AZUL_ESCURO}
            />
            <View style={styles.dicaTextoArea}>
              <Text style={styles.dicaTitulo}>Dica</Text>
              <Text style={styles.dicaTexto}>
                Mantenha a câmera ligada e próxima do roteador durante a
                configuração. Nem todos os modelos são compatíveis.
              </Text>
            </View>
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
          <View style={styles.ilustracaoPequena}>
            <View style={styles.circuloExterno}>
              <View style={styles.circuloInterno}>
                <Text style={styles.imagemExemplo}>IMAGEMEXEMPLO</Text>
              </View>
            </View>
          </View>

          <Text style={styles.tituloSecao}>
            {marca?.nome || 'Sua câmera'}
          </Text>

          <Text style={styles.instrucaoCampos}>
            Informe os dados do dispositivo para tentar estabelecer a conexão.
          </Text>

          <Text style={styles.label}>Endereço IP</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex.: 192.168.0.50"
            placeholderTextColor="#999999"
            value={ip}
            onChangeText={setIp}
            keyboardType="numbers-and-punctuation"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Usuário da câmera</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o usuário do dispositivo"
            placeholderTextColor="#999999"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha da câmera</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a senha do dispositivo"
            placeholderTextColor="#999999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            autoCapitalize="none"
          />

          <View style={styles.dica}>
            <Ionicons
              name="information-circle-outline"
              size={27}
              color={AZUL_ESCURO}
            />
            <View style={styles.dicaTextoArea}>
              <Text style={styles.dicaTitulo}>Atenção</Text>
              <Text style={styles.dicaTexto}>
                Use os dados de acesso da câmera, que podem ser diferentes
                do login do aplicativo da marca.
              </Text>
            </View>
          </View>

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
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  conteudo: {
    paddingHorizontal: 31,
    paddingTop: 12,
    paddingBottom: 30,
  },
  voltar: {
    width: 34,
    height: 34,
    justifyContent: 'center',
    marginLeft: -9,
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
  logo: {
    color: AZUL,
    fontSize: 29,
    fontWeight: '500',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  tituloLogo: {
    fontSize: 16,
    color: '#171717',
    marginTop: 11,
  },
  ilustracao: {
    height: 175,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ilustracaoPequena: {
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuloExterno: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#F1F9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circuloInterno: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#DFF1FC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imagemExemplo: {
    fontSize: 12,
    fontWeight: '800',
    color: AZUL_ESCURO,
    textAlign: 'center',
  },
  tituloSecao: {
    fontSize: 16,
    color: AZUL,
    fontWeight: '600',
    marginTop: 3,
    marginBottom: 12,
  },
  passo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
    gap: 11,
  },
  iconePasso: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8EDF0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  textoPasso: {
    flex: 1,
  },
  tituloPasso: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
    marginBottom: 2,
  },
  descricaoPasso: {
    fontSize: 10,
    lineHeight: 14,
    color: '#888888',
  },
  dica: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#E0F0FF',
    borderRadius: 14,
    padding: 12,
    marginTop: 7,
    marginBottom: 13,
  },
  dicaTextoArea: {
    flex: 1,
  },
  dicaTitulo: {
    fontSize: 13,
    fontWeight: '800',
    color: AZUL_ESCURO,
    marginBottom: 2,
  },
  dicaTexto: {
    fontSize: 10,
    lineHeight: 14,
    color: '#667D89',
  },
  botao: {
    backgroundColor: "#2E98FE",
    minHeight: 46,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    marginTop: 1,
  },
  botaoDesativado: {
    opacity: 0.65,
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  instrucaoCampos: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 20,
    marginBottom: 17,
  },
  label: {
    color: AZUL_ESCURO,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 13,
  },
  input: {
    minHeight: 48,
    borderBottomWidth: 1.5,
    borderBottomColor: AMARELO,
    paddingHorizontal: 2,
    paddingVertical: 10,
    fontSize: 14,
    color: AZUL_ESCURO,
  },
});
