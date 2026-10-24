
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="marcas" options={{ title: 'Marcas compatíveis' }} />
        <Stack.Screen name="conectar" options={{ title: 'Conectar câmera' }} />
        <Stack.Screen name="video" options={{ title: 'Ao vivo' }} />
        <Stack.Screen name="comprar" options={{ title: 'Comprar uma câmera' }} />
      </Stack>
    </ThemeProvider>
  );
}
