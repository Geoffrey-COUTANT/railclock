import {
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  View, Dimensions, FlatList
} from "react-native";
import React from "react";
import {Text} from "@/components/Themed";
import CardTrain from "@/components/CardTrain";
import {Ionicons} from '@expo/vector-icons';
import {getJourneys, getPtObject, searchForPtObject} from "@/app/api/api";
import { formatTimestamp } from "../api/utils";

const trains: any[] | (() => any[]) = [

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

    const handleSearch = async () => {
        if (departCity === "" || arrivalCity === "") {
            console.log("Depart/Arrival city is/are empty");
            return
        }

        let departPtObject = await getPtObject(departCity);
        let arrivalPtObject = await getPtObject(arrivalCity);

        let journey = await getJourneys(departPtObject!.id, arrivalPtObject!.id);

        try {
            let results = [];

            for (let i = 0; i < journey.length; i++) {
                for (let j = 0; j < journey[i].sections.length; j++) {
                    let section = journey[i].sections[j];
                    if (!section.from || !section.to)
                        continue;

                    if (section.type !== "public_transport")
                        continue;

                    const fromStopArea = section.from.stop_area ? section.from.stop_area
                        : section.from.stop_point ? section.from.stop_point : undefined;
                    const toStopArea = section.to.stop_area ? section.to.stop_area
                        : section.to.stop_point ? section.to.stop_point : undefined;

                    const from = fromStopArea ? fromStopArea.name : section.from.name;
                    const to = toStopArea ? toStopArea.name : section.to.name;

                    if (from === to) continue;

                    results.push({
                        status: "onTime",
                        scheduledTime: formatTimestamp(section.departure_date_time),
                        depart: from,
                        arrival: to,
                    });
                }
            }

            setFilteredTrains(results);
        } catch (error) {
            console.error(error);
        }
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
                <Ionicons name="swap-horizontal" size={24} color="#210010"/>
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
            {filteredTrains.length === 0 && (<Text>No train found</Text>)}
            <FlatList
                contentContainerStyle={styles.contentContainer}
                data={filteredTrains}
                renderItem={({item}) => (
                    <CardTrain {...item} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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
    color: "#210010",
    fontFamily: "BricolageGrotesqueSemiBold",
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
  }
});