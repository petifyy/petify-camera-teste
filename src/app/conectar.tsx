
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { BRIDGE } from '../config';

export default function ConectarScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ marca?: string }>();

  let marca: any = null;

  try {
    marca = params.marca ? JSON.parse(params.marca) : null;
  } catch {
    marca = null;
  }

  const [ip, setIp] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function conectar() {
    if (!marca) {
      Alert.alert('Erro', 'Não foi possível carregar a marca selecionada.');
      return;
    }

    if (!ip.trim() || !usuario.trim() || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha o IP, o usuário e a senha da câmera.');
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
        'Não conectou',
        'Confira se o celular e a câmera estão na mesma rede Wi-Fi e se o IP e os dados estão corretos.\n\n' +
          mensagem,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: marca?.nome || 'Conectar câmera' }} />

      <Text style={styles.titulo}>
        {marca?.nome || 'Conectar câmera'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="IP da câmera (ex.: 192.168.0.50)"
        value={ip}
        onChangeText={setIp}
        keyboardType="numbers-and-punctuation"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Usuário ONVIF"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha da câmera"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.botao, loading && styles.botaoDesativado]}
        onPress={conectar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botaoTexto}>Conectar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#222222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 12,
    color: '#222222',
  },
  botao: {
    backgroundColor: '#6C5CE7',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  botaoDesativado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
