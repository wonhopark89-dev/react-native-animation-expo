import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigation";

export default function TabTwoScreen() {
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => rootNavigation.navigate("IndicatorTutorialScreen")}
      >
        <Text>{`Indicator Tutorial...`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
