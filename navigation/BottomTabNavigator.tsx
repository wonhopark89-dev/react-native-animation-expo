/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  BottomTabParamList,
  TabFloatingParamList,
  TabFourParamList,
  TabOneParamList,
  TabThreeParamList,
  TabTwoParamList,
} from "../types";
import TabThreeScreen from "../screens/TabThreeScreen";
import TabFourScreen from "../screens/TabFourScreen";
import TabFloatingScreen from "../screens/TabFloatingScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const tabStyle = StyleSheet.create({
  defaultTab: {
    // centring Tab Button...
    position: "absolute",
    top: 20,
  },
});

function getTabWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const tabOffsetValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="TabOne"
        tabBarOptions={{
          activeTintColor: Colors[colorScheme].tint,
          showLabel: false,
          // Floating Tab Bar...
          style: {
            backgroundColor: "white",
            position: "absolute",
            bottom: 40,
            marginHorizontal: 20,
            // Max Height...
            height: 60,
            borderRadius: 10,
            // Shadow...
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
        }}
      >
        <BottomTab.Screen
          name="TabOne"
          component={TabOneNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={tabStyle.defaultTab}>
                <TabIcon name={"home"} color={focused ? "red" : "gray"} />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (evt) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <BottomTab.Screen
          name="TabTwo"
          component={TabTwoNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={tabStyle.defaultTab}>
                <TabIcon name={"search"} color={focused ? "red" : "gray"} />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (evt) => {
              Animated.spring(tabOffsetValue, {
                toValue: getTabWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <BottomTab.Screen
          name={"TabFloating"}
          component={TabFloatingNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: "red",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: Platform.OS == "android" ? 50 : 30,
                  }}
                >
                  <TabIcon name={"plus"} color={"white"} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        <BottomTab.Screen
          name="TabThree"
          component={TabThreeNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={tabStyle.defaultTab}>
                <TabIcon name={"bell"} color={focused ? "red" : "gray"} />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (evt) => {
              Animated.spring(tabOffsetValue, {
                toValue: getTabWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <BottomTab.Screen
          name="TabFour"
          component={TabFourNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={tabStyle.defaultTab}>
                <TabIcon name={"user-alt"} color={focused ? "red" : "gray"} />
              </View>
            ),
          }}
          listeners={({ navigation, route }) => ({
            tabPress: (evt) => {
              Animated.spring(tabOffsetValue, {
                toValue: getTabWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </BottomTab.Navigator>
      <Animated.View
        style={{
          width: getTabWidth() - 20,
          height: 3,
          backgroundColor: "lightpink",
          position: "absolute",
          bottom: 98,
          left: 50,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      />
    </>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof Ionicons>["name"];
//   color: string;
// }) {
//   return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
// }

const TabIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome5>["name"];
  color: React.ComponentProps<typeof FontAwesome5>["color"];
}) => {
  return <FontAwesome5 size={20} {...props} />;
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title", headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ headerTitle: "Tab Three Title" }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="TabFourScreen"
        component={TabFourScreen}
        options={{ headerTitle: "Tab Four Title" }}
      />
    </TabFourStack.Navigator>
  );
}

const TabFloatingStack = createStackNavigator<TabFloatingParamList>();

function TabFloatingNavigator() {
  return (
    <TabFloatingStack.Navigator>
      <TabFloatingStack.Screen
        name={"TabFloatingScreen"}
        component={TabFloatingScreen}
        options={{ headerTitle: "Tab Floating" }}
      />
    </TabFloatingStack.Navigator>
  );
}
