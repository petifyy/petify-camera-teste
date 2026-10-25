
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { GO2RTC } from '../config';

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

      <WebView
        style={styles.video}
        source={{ uri: GO2RTC }}
        allowsInlineMediaPlayback
        javaScriptEnabled
      />
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
  video: {
    flex: 1,
  },
});
