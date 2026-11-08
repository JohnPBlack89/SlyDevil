import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { useScreenColors } from '@/components/screen-ui';
import { RoomPreviewProvider } from '@/components/room-preview';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const colors = useScreenColors();
  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.page }}>
      <ThemeProvider value={{ ...baseTheme, colors: { ...baseTheme.colors, background: colors.page, card: colors.surface, text: colors.text } }}>
        <AnimatedSplashOverlay />
        <RoomPreviewProvider>
          <Stack initialRouteName="index" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.page } }} />
        </RoomPreviewProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
