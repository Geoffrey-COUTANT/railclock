import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import "react-native-reanimated";
import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar, View } from "react-native";
import type { Theme } from "@react-navigation/native/src/types";
import { fonts } from "@react-navigation/native/src/theming/fonts";
import * as NavigationBar from "expo-navigation-bar";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(onboarding)", // Définit l'onboarding comme page d'accueil
};

// Empêche l'écran de chargement de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    BricolageGrotesqueRegular: require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
    BricolageGrotesqueSemiBold: require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    BricolageGrotesqueBold: require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
    ...FontAwesome.font,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Masque l'écran de démarrage après le chargement
      setIsReady(true); // L'application est prête
    }
  }, [loaded]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  if (!isReady) {
    return null; // Ne montre rien tant que l'application n'est pas prête
  }

  return <RootLayoutNav />;
}

export const RailclockTheme: Theme = {
  dark: false,
  colors: {
    primary: "#210010",
    background: "#fff",
    card: "rgb(255, 255, 255)",
    text: "#210010",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
  fonts,
};

function RootLayoutNav() {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Ce code ne s'exécutera qu'après que l'application soit entièrement montée
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      router.push("/(onboarding)"); // Utilisez la route sans les parenthèses
    }
  }, [hasMounted, router]);

  return (
    <ThemeProvider value={RailclockTheme}>
      <Stack initialRouteName="(onboarding)">
        <Stack.Screen key={1} name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen key={2} name="(home)" options={{ headerShown: false }} />
        <Stack.Screen key={3} name="(details)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
    </ThemeProvider>
  );
}
