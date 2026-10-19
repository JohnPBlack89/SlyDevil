import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { useTheme } from '@/hooks/use-theme';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = useTheme();
  const baseTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemeProvider value={{ ...baseTheme, colors: { ...baseTheme.colors, background: colors.background, card: colors.backgroundElement, text: colors.text } }}>
        <AnimatedSplashOverlay />
        <AppTabs />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
