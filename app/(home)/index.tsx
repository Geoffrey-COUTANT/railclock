import {
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  View, Dimensions,
} from "react-native";
import React from "react";
import { Text } from "@/components/Themed";
import CardTrain from "@/components/CardTrain";
import { Ionicons } from '@expo/vector-icons';

const trains = [
  // Bordeaux -> Paris
  { status: "onTime", scheduledTime: "06:00", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },
  { status: "delayed", scheduledTime: "07:45", actualTime: "08:30", delayDuration: "45 min", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },
  { status: "onTime", scheduledTime: "09:30", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },
  { status: "cancelled", scheduledTime: "11:15", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },
  { status: "onTime", scheduledTime: "13:00", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },
  { status: "delayed", scheduledTime: "15:45", actualTime: "16:30", delayDuration: "45 min", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },
  { status: "onTime", scheduledTime: "18:20", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },
  { status: "onTime", scheduledTime: "20:45", depart: "Bordeaux-St-Jean", arrival: "Paris-Montparnasse" },

  // Paris -> Bordeaux
  { status: "onTime", scheduledTime: "06:30", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "08:15", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },
  { status: "delayed", scheduledTime: "10:00", actualTime: "10:45", delayDuration: "45 min", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "12:30", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },
  { status: "cancelled", scheduledTime: "14:00", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "16:15", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "19:00", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },
  { status: "delayed", scheduledTime: "21:45", actualTime: "22:30", delayDuration: "45 min", depart: "Paris-Montparnasse", arrival: "Bordeaux-St-Jean" },

  // 🛤️ Montendre -> Bordeaux
  { status: "onTime", scheduledTime: "06:15", depart: "Montendre", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "08:45", depart: "Montendre", arrival: "Bordeaux-St-Jean" },
  { status: "delayed", scheduledTime: "11:30", actualTime: "12:00", delayDuration: "30 min", depart: "Montendre", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "14:15", depart: "Montendre", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "17:45", depart: "Montendre", arrival: "Bordeaux-St-Jean" },
  { status: "cancelled", scheduledTime: "20:30", depart: "Montendre", arrival: "Bordeaux-St-Jean" },

  // 🛤️ Bordeaux -> Montendre
  { status: "onTime", scheduledTime: "07:00", depart: "Bordeaux-St-Jean", arrival: "Montendre" },
  { status: "onTime", scheduledTime: "09:30", depart: "Bordeaux-St-Jean", arrival: "Montendre" },
  { status: "onTime", scheduledTime: "12:15", depart: "Bordeaux-St-Jean", arrival: "Montendre" },
  { status: "delayed", scheduledTime: "15:45", actualTime: "16:15", delayDuration: "30 min", depart: "Bordeaux-St-Jean", arrival: "Montendre" },
  { status: "onTime", scheduledTime: "18:00", depart: "Bordeaux-St-Jean", arrival: "Montendre" },
  { status: "cancelled", scheduledTime: "21:30", depart: "Bordeaux-St-Jean", arrival: "Montendre" },

  // 🛤️ Ychoux -> Bordeaux
  { status: "onTime", scheduledTime: "06:45", depart: "Ychoux", arrival: "Bordeaux-St-Jean" },
  { status: "delayed", scheduledTime: "09:00", actualTime: "09:30", delayDuration: "30 min", depart: "Ychoux", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "11:15", depart: "Ychoux", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "14:45", depart: "Ychoux", arrival: "Bordeaux-St-Jean" },
  { status: "onTime", scheduledTime: "17:00", depart: "Ychoux", arrival: "Bordeaux-St-Jean" },
  { status: "cancelled", scheduledTime: "19:30", depart: "Ychoux", arrival: "Bordeaux-St-Jean" },

  // 🛤️ Bordeaux -> Ychoux
  { status: "onTime", scheduledTime: "07:30", depart: "Bordeaux-St-Jean", arrival: "Ychoux" },
  { status: "onTime", scheduledTime: "10:00", depart: "Bordeaux-St-Jean", arrival: "Ychoux" },
  { status: "delayed", scheduledTime: "13:15", actualTime: "13:45", delayDuration: "30 min", depart: "Bordeaux-St-Jean", arrival: "Ychoux" },
  { status: "onTime", scheduledTime: "16:00", depart: "Bordeaux-St-Jean", arrival: "Ychoux" },
  { status: "onTime", scheduledTime: "18:30", depart: "Bordeaux-St-Jean", arrival: "Ychoux" },
  { status: "cancelled", scheduledTime: "21:00", depart: "Bordeaux-St-Jean", arrival: "Ychoux" },
];
const { height, width } = Dimensions.get("window");

export default function TabOneScreen() {
  const [departCity, setDepartCity] = React.useState("");
  const [arrivalCity, setArrivalCity] = React.useState("");
  const [filteredTrains, setFilteredTrains] = React.useState(trains);
  const swapCities = () => {
    setDepartCity(arrivalCity);
    setArrivalCity(departCity);
  };
  const handleSearch = () => {
    const results = trains.filter(
        (train) =>
            train.depart.toLowerCase().includes(departCity.toLowerCase()) &&
            train.arrival.toLowerCase().includes(arrivalCity.toLowerCase())
    );
    setFilteredTrains(results);
  };

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
        <Pressable onPress={swapCities} style={styles.swapButton}>
          <Ionicons name="swap-horizontal" size={24} color="#210010" />
        </Pressable>
        <TextInput
            style={styles.input}
            onChangeText={setArrivalCity}
            value={arrivalCity}
            placeholder="Gare d'arrivée"
            placeholderTextColor="#999"
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </Pressable>
        <Text style={styles.sectionTitle}>Mes trajets</Text>
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
        >
          {filteredTrains.length > 0 ? (
              filteredTrains.map((train, index) => (
                  <CardTrain key={index} {...train} />
              ))
          ) : (
              <Text style={styles.noTrainText}>Aucun train disponible pour ce trajet</Text>
          )}
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
  swapButton: {
    position: "absolute",
    padding: 10,
    top: height * 0.145, // 17% de la hauteur de l'écran
    right: width * 0.03, // 5% du bord droit pour s'adapter à tous les écrans
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
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
  noTrainText: {
    fontSize: 16,
    textAlign: "center",
    color: "#AB1E62",
    marginTop: 20,
  },
});