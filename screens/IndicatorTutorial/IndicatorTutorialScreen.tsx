import React from "react";
import { SafeAreaView } from "react-native";
import Onboarding from "./Onboarding";

const IndicatorTutorialScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Onboarding />
    </SafeAreaView>
  );
};

export default IndicatorTutorialScreen;
