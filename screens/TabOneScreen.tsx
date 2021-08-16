import * as React from "react";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Logo...
// import Logo from "../assets/images/splash/chat.png";
const BGColor = "#4D4A95";

export default function TabOneScreen() {
  // SafeArea Value...
  const edges = useSafeAreaInsets();

  // Animation Values....
  const startAnimation = useRef<Animated.Value>(new Animated.Value(0)).current;

  // Scaling Down Both logo and Title...
  const scaleLogo = useRef<Animated.Value>(new Animated.Value(1)).current;
  const scaleTitle = useRef<Animated.Value>(new Animated.Value(1)).current;

  // Offset Animation....
  const moveLogo = useRef<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current;
  const moveTitle = useRef<Animated.ValueXY>(
    new Animated.ValueXY({ x: 0, y: 0 })
  ).current;

  // Animating Content...
  const contentTransition = useRef<Animated.Value>(
    new Animated.Value(Dimensions.get("window").height)
  ).current;

  // Animation Done....
  useEffect(() => {
    // Starting Animation after 1000ms....
    setTimeout(() => {
      // Parallel Animation...
      Animated.parallel([
        Animated.timing(startAnimation, {
          // For same Height for non safe Area Devices...
          toValue: -Dimensions.get("window").height + (edges.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          // Scaling to 0.35
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          // Scaling to 0.8
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          // Moving to Right Most...
          toValue: {
            x: Dimensions.get("window").width / 2 - 35,
            y: Dimensions.get("window").height / 2 - 5,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          // Moving to Right Most...
          toValue: {
            x: 0,
            // Since image size is 100...
            y: Dimensions.get("window").height / 2 - 90,
          },
          useNativeDriver: true,
        }),
        Animated.timing(contentTransition, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 800);
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: BGColor,
          zIndex: 1, // zIndex 높은 값이여야 상대적으로 더 위에 보임
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={require("../assets/images/splash/chat.png")}
            style={{
              width: 100,
              height: 100,
              marginBottom: 20,
              transform: [
                { translateX: moveLogo.x },
                { translateY: moveLogo.y },
                { scale: scaleLogo },
              ],
            }}
          />

          <Animated.Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
              transform: [{ translateY: moveTitle.y }, { scale: scaleTitle }],
            }}
          >
            Tab One Header !!
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0,0,0,0.04)",
          zIndex: 0,
          transform: [{ translateY: contentTransition }],
        }}
      >
        {
          /// ...Tab One contents..
        }
        <View style={styles.container}>
          <Text style={styles.title}>Tab One</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        </View>
      </Animated.View>
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

// <View style={styles.container}>
//   <Text style={styles.title}>Tab One</Text>
//   <View
//       style={styles.separator}
//       lightColor="#eee"
//       darkColor="rgba(255,255,255,0.1)"
//   />
//   <EditScreenInfo path="/screens/TabOneScreen.tsx" />
// </View>
