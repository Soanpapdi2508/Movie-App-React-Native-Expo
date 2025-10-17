import { Stack } from "expo-router";
import * as ScreenCapture from "expo-screen-capture";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  useEffect(() => {
    ScreenCapture.preventScreenCaptureAsync();
    return () => ScreenCapture.preventScreenCaptureAsync();
  }, []);
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(Tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
