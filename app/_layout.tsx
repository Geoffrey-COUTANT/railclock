import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme, ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "react-native";
import type {Theme} from "@react-navigation/native/src/types";
import {fonts} from "@react-navigation/native/src/theming/fonts";
import * as NavigationBar from 'expo-navigation-bar';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(onboarding)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BricolageGrotesqueRegular: require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
    BricolageGrotesqueSemiBold: require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    BricolageGrotesqueBold: require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#ffffff')
    NavigationBar.setButtonStyleAsync("dark");
  });

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const RailclockTheme: Theme = {
  dark: false,
  colors: {
    primary: '#210010',
    background: '#fff',
    card: 'rgb(255, 255, 255)',
    text: '#210010',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
  fonts,
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={RailclockTheme}>
      <Stack>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen name="(details)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle="dark-content" backgroundColor={"transparent"} translucent={true} />
    </ThemeProvider>
  );
}
