
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, ActivityIndicator, Linking, Alert } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { BRIDGE, GO2RTC } from '../../config';
import { MARCAS } from '../../data/marcas';

function Inicio() {
  const router = useRouter();

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: 'Petify' }} />
      <Text style={s.titulo}>Câmera do seu pet</Text>
      <TouchableOpacity style={s.botao} onPress={() => router.push('/marcas')}>
        <Text style={s.botaoTxt}>Conecte com uma câmera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[s.botao, s.botao2]} onPress={() => router.push('/comprar')}>
        <Text style={s.botaoTxt}>Comprar uma câmera</Text>
      </TouchableOpacity>
    </View>
  );
}

function Marcas() {
  const router = useRouter();

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={MARCAS}
      keyExtractor={m => m.id}
      ListHeaderComponent={<Text style={s.sub}>Marcas compatíveis</Text>}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.cardTitulo}>{item.nome}</Text>
          <Text style={s.cardTxt}>{item.modelos.join(' • ')}</Text>
          <Text style={s.cardObs}>{item.obs}</Text>
          <TouchableOpacity onPress={() => router.push({ pathname: '/conectar', params: { marca: JSON.stringify(item) } })}>
            <Text style={s.link}>Conectar esta marca →</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

function Conectar() {
  const router = useRouter();
  const params = useLocalSearchParams<{ marca?: string }>();
  const marca = params.marca ? JSON.parse(params.marca) : null;
  const [ip, setIp] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function conectar() {
    if (!marca) {
      Alert.alert('Erro', 'Não foi possível carregar a marca.');
      return;
    }

    setLoading(true);
    try {
      const r = await fetch(`${BRIDGE}/connect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, porta: marca.porta, usuario, senha }),
      });
      const dados = await r.json();
      if (!r.ok) throw new Error(dados.erro || 'Falha na conexão');
      router.push({ pathname: '/video', params: { dados: JSON.stringify(dados) } });
    } catch (e) {
      const mensagem = e instanceof Error ? e.message : 'Erro desconhecido';
      Alert.alert('Não conectou', 'Confira se o celular está no mesmo Wi-Fi da câmera e se os dados estão certos.\n\n' + mensagem);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={s.container}>
      <Stack.Screen options={{ title: marca?.nome || 'Conectar câmera' }} />
      <Text style={s.sub}>{marca?.nome || 'Câmera'}</Text>
      <TextInput style={s.input} placeholder="IP da câmera (ex: 192.168.0.50)" value={ip} onChangeText={setIp} keyboardType="numbers-and-punctuation" />
      <TextInput style={s.input} placeholder="Usuário ONVIF" value={usuario} onChangeText={setUsuario} autoCapitalize="none" />
      <TextInput style={s.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
      <TouchableOpacity style={s.botao} onPress={conectar} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.botaoTxt}>Conectar</Text>}
      </TouchableOpacity>
    </View>
  );
}

function Video() {
  const params = useLocalSearchParams<{ dados?: string }>();
  const dados = params.dados ? JSON.parse(params.dados) : {};

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Ao vivo' }} />
      <Text style={s.cardObs}>{dados.info?.manufacturer} {dados.info?.model}</Text>
      <WebView source={{ uri: `${GO2RTC}/stream.html?src=camera1` }} allowsInlineMediaPlayback />
    </View>
  );
}

function Comprar() {
  const dicas = [
    'Procure "ONVIF Profile S" ou "Profile T" na descrição ou no manual.',
    'Prefira câmeras ligadas na tomada (as de bateria quase nunca têm ONVIF).',
    'Wi-Fi 2.4 GHz, resolução 1080p ou mais e visão noturna.',
    'Câmera que gira e inclina ajuda a acompanhar o pet pela casa.',
    'Áudio nos dois sentidos permite falar com o pet.',
    'Evite marcas que só funcionam com a nuvem delas (Ring, Nest, Arlo, Eufy).',
  ];

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={dicas}
      keyExtractor={d => d}
      ListHeaderComponent={<Text style={s.sub}>Como escolher uma câmera compatível</Text>}
      renderItem={({ item }) => <View style={s.card}><Text style={s.cardTxt}>✔ {item}</Text></View>}
      ListFooterComponent={
        <TouchableOpacity style={s.botao} onPress={() => Linking.openURL('https://www.onvif.org/conformant-products/')}>
          <Text style={s.botaoTxt}>Ver lista oficial ONVIF</Text>
        </TouchableOpacity>
      }
    />
  );
}

export default function HomeScreen() {
  return <Inicio />;
}

export { Marcas, Conectar, Video, Comprar };

const s = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', gap: 14 },
  titulo: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  sub: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  botao: { backgroundColor: '#6C5CE7', padding: 16, borderRadius: 14, alignItems: 'center' },
  botao2: { backgroundColor: '#00B894' },
  botaoTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
  card: { backgroundColor: '#f2f2f7', padding: 14, borderRadius: 12, marginBottom: 10 },
  cardTitulo: { fontSize: 17, fontWeight: '700' },
  cardTxt: { fontSize: 14, marginTop: 4 },
  cardObs: { fontSize: 12, color: '#666', marginTop: 4 },
  link: { color: '#6C5CE7', marginTop: 8, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 12 },
});
