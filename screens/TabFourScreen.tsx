import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const animationEndY = Math.ceil(height * 0.8);
const negativeEndY = animationEndY * -1;

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getRandomColor() {
  return `rgb(${getRandomNumber(50, 100)}, ${getRandomNumber(
    10,
    200
  )}, ${getRandomNumber(150, 200)})`;
}

const TabFourScreen = () => {
  const [hearts, setHearts] = useState<
    { id: number; color: string; right: number }[]
  >([]);

  let heartCount = 1;

  // useEffect(() => {
  //   heartCount = 1;
  // }, []);

  const addHeart = () => {
    setHearts((prevState) => [
      ...prevState,
      {
        id: heartCount,
        right: getRandomNumber(20, 150),
        color: getRandomColor(),
      },
    ]);
    heartCount++;
  };

  const removeHeart = (id: number) => {
    setHearts(hearts.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {hearts.map((item, index) => {
          return (
            <HeartContainer2
              key={index}
              style={{ right: item.right }}
              onComplete={() => removeHeart(item.id)}
              color={item.color}
            />
          );
        })}
      </View>
      <TouchableOpacity onPress={() => addHeart()} style={styles.addButton}>
        <AntDesign name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

interface HeartProp {
  style: ViewStyle;
  color: string;
}

interface HeartContainerProp extends HeartProp {
  // style: ViewStyle;
  onComplete: () => void; // todo : will remove
  // color: string;
}

const HeartContainer2 = ({ style, onComplete, color }: HeartContainerProp) => {
  const [position, setPosition] = useState<Animated.Value>(
    new Animated.Value(0)
  );

  const yAnimation = position.interpolate({
    inputRange: [negativeEndY, 0],
    outputRange: [animationEndY, 0],
  });

  const opacityAnimation = yAnimation.interpolate({
    inputRange: [0, animationEndY],
    outputRange: [1, 0],
  });

  const scaleAnimation = yAnimation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.4, 1],
    extrapolate: "clamp",
  });

  const xAnimation = yAnimation.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY,
    ],
    outputRange: [0, 25, 15, 0, 10],
  });

  const rotateAnimation = yAnimation.interpolate({
    inputRange: [
      0,
      animationEndY / 6,
      animationEndY / 3,
      animationEndY / 2,
      animationEndY,
    ],
    outputRange: ["0deg", "-15deg", "0deg", "15deg", "0deg"],
  });

  function getHeartStyle() {
    return {
      transform: [
        { translateY: position },
        { translateX: xAnimation },
        { scale: scaleAnimation },
        { rotate: rotateAnimation },
      ],
      opacity: opacityAnimation,
    };
  }

  useEffect(() => {
    return Animated.timing(position, {
      duration: 3000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    // todo, fixme : callback : () => onComplete()
  }, []);

  return (
    <Animated.View style={[styles.heartContainer, getHeartStyle(), style]}>
      <Heart style={style} color={color} />
    </Animated.View>
  );
};

const Heart = ({ style, color }: HeartProp) => (
  <View style={[styles.heart, style]}>
    <AntDesign name="heart" size={48} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#378AD9",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 100,
    left: 32,
  },
  heartContainer: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "transparent",
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

export default TabFourScreen;
