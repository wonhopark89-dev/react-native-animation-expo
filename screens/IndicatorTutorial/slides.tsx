import React from "react";
import { Image } from "react-native";

export interface SlideProp {
  id: string;
  title: string;
  description: string;
  image: React.ComponentProps<typeof Image>["source"];
}

const slides: SlideProp[] = [
  {
    id: "1",
    title: "Quick & Easy Payments",
    description:
      "Grow your business by accepting card payments with the new card reader.",
    image: require("../../assets/images/indicatorTutorial/creditcard.png"),
  },
  {
    id: "2",
    title: "Smart Point of Sale",
    description:
      "Complete point of sale software tailored to your business needs.",
    image: require("../../assets/images/indicatorTutorial/computer.png"),
  },
  {
    id: "3",
    title: "Instant Notifications",
    description:
      "Instant notifications let your quickly see new purchases and messages.",
    image: require("../../assets/images/indicatorTutorial/notifications.png"),
  },
  {
    id: "4",
    title: "Customize Everything",
    description: "Adjust your system to speed up your checkout.",
    image: require("../../assets/images/indicatorTutorial/customize.png"),
  },
];

export default slides;
