import React from "react";
import { View, StyleSheet } from "react-native";
import CarouselComponent from "../../components/Carousel/Carousel";

const Onboarding: React.FC = () => {
  return (
      <View style={styles.container}>
        <CarouselComponent />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default Onboarding;