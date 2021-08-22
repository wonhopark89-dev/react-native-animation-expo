import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  View,
  ViewabilityConfig,
  ViewToken,
} from "react-native";
import slides from "./slides";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef<
    (info: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => void
  >(({ viewableItems }) => {
    if (viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
    // setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem {...item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
    </View>
  );
};

export default Onboarding;
