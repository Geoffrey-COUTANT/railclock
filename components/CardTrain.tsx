import { View, Text, StyleSheet } from "react-native";

export default function CardTrain() {
  return (
    <View style={styles.container}>
      <View style={styles.trainContainer}>
        <Text style={styles.trainName}>Ychoux</Text>
        <Text style={styles.destination}>Bordeaux-St-Jean</Text>
      </View>
      <Text style={styles.trainTime}>12:00</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },
  trainName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  trainTime: {
    fontSize: 25,
  },
  trainContainer: {
    flexDirection: "column",
    fontSize: 18,
  },
  destination: {
    fontSize: 18,
  },
});
