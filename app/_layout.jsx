// import * as ScreenCapture from "expo-screen-capture";
// import { useEffect } from "react";
import { persistor, store } from "@/Store/Store";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./global.css";

export default function RootLayout() {
  // useEffect(() => {
  //   ScreenCapture.preventScreenCaptureAsync();
  //   return () => {
  //     ScreenCapture.preventScreenCaptureAsync();
  //   };
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen name="(Tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
