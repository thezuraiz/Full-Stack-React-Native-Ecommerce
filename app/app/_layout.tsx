import { Stack } from "expo-router";
import "../global.css";
import SafeArea from "./components/safeAreaComponent";

export default function RootLayout() {
  return (
    <SafeArea>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeArea>
  );
}
