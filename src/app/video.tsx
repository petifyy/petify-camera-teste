
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { VLCPlayer } from 'react-native-vlc-media-player';

export default function VideoScreen() {
  const params = useLocalSearchParams<{ dados?: string }>();

  let dados: any = {};

  try {
    dados = params.dados ? JSON.parse(params.dados) : {};
  } catch {
    dados = {};
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Ao vivo' }} />

      <Text style={styles.info}>
        {dados.info?.manufacturer || 'Câmera'}{' '}
        {dados.info?.model || ''}
      </Text>

      <View style={styles.videoFundo}>
      <VLCPlayer
        style={styles.video}
        source={{
          uri: dados.url,
          initOptions: ['--rtsp-tcp', '--network-caching=300'],
        }}
        autoplay
        resizeMode="contain"
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  info: {
    fontSize: 12,
    color: '#666666',
    margin: 8,
  },
  videoFundo: {
    flex: 1,
    backgroundColor: '#000000',
  },
  video: {
    flex: 1,
  },
});