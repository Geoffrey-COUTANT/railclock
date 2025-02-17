import {
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import React from "react";
import { Text } from "@/components/Themed";
import CardTrain from "@/components/CardTrain";

export default function TabOneScreen() {
  const [departCity, setDepartCity] = React.useState("");
  const [arrivalCity, setArrivalCity] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>railclock</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setDepartCity}
        value={departCity}
        placeholder="Gare de départ"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        onChangeText={setArrivalCity}
        value={arrivalCity}
        placeholder="Gare d'arrivée"
        placeholderTextColor="#999"
      />
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </Pressable>
      <Text style={styles.sectionTitle}>Mes trajets</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <CardTrain status="onTime" scheduledTime="10:00" />
        <CardTrain
          status="delayed"
          scheduledTime="11:00"
          actualTime="11:30"
          delayDuration="30 min"
        />
        <CardTrain status="cancelled" scheduledTime="12:00" />
        <CardTrain
          status="onTime"
          scheduledTime="14:30"
          actualTime="15:00"
          delayDuration="30 min"
          additionalInfo="Difficultés lors de la préparation du train"
        />

        <CardTrain
          status="onTime"
          scheduledTime="16:45"
          additionalInfo="Réutilisation d'un train"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#fff",
    width: "100%",
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
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    width: "100%",
  },
});
