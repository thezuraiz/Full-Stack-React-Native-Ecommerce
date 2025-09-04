import React, { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeAreaProps = {
  children: ReactNode;
};
const SafeArea = ({ children }: SafeAreaProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
      }}
      className="bg-background"
    >
      {children}
    </View>
  );
};

export default SafeArea;
