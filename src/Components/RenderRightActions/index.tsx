import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

interface RightActionsProps {
  progress: Animated.AnimatedInterpolation<number>;
  dragX: Animated.AnimatedInterpolation<number>;
}

const RightActions: React.FC<RightActionsProps> = ({ progress, dragX }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tamamlandı</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efeefc",
    justifyContent: "center",
    flex: 1,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: "flex-end",
    paddingRight: 20,
  },
  text: {
    color: "#000",
    fontWeight: "600",
  },
});

export default RightActions;
