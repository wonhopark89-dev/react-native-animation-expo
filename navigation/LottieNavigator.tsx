import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LottieWrapperScreen from "../screens/Lottie/LottieWrapperScreen";

type LottieParamList = {
  LottieWrapperScreen: undefined;
};

const LottieStack = createStackNavigator<LottieParamList>();

const LottieStackNavigator = () => {
  return (
    <LottieStack.Navigator initialRouteName={"LottieWrapperScreen"}>
      <LottieStack.Screen
        name={"LottieWrapperScreen"}
        component={LottieWrapperScreen}
        options={{ headerShown: false }}
      />
    </LottieStack.Navigator>
  );
};

export default LottieStackNavigator;
