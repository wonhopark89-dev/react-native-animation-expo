import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IndicatorTutorialScreen from "../screens/IndicatorTutorial/IndicatorTutorialScreen";

type IndicatorTutorialParamList = {
  IndicatorTutorialScreen: undefined;
};

const IndicatorTutorialStack =
  createStackNavigator<IndicatorTutorialParamList>();

const IndicatorTutorialStackNavigator = () => {
  return (
    <IndicatorTutorialStack.Navigator
      initialRouteName={"IndicatorTutorialScreen"}
    >
      <IndicatorTutorialStack.Screen
        name={"IndicatorTutorialScreen"}
        component={IndicatorTutorialScreen}
        options={{ headerShown: false }}
      />
    </IndicatorTutorialStack.Navigator>
  );
};

export default IndicatorTutorialStackNavigator;
