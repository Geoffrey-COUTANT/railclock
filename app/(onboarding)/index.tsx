import { StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { Text, View } from "@/components/Themed";
import CardTrain from "@/components/CardTrain";

export default function TabOneScreen() {
  const [departCity, setDepartCity] = React.useState("");
  const [arrivalCity, setArrivalCity] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#210010",
  },
  input: {
    height: 50,
    borderWidth: 0,
    padding: 15,
    width: "90%",
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 5,
    width: "90%",
    backgroundColor: "#210010",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionTitle: {
    alignSelf: "flex-start",
    paddingLeft: "5%",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
  },
});
