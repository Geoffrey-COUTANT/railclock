import {
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    View, Dimensions, FlatList, ActivityIndicator
} from "react-native";
import React from "react";
import {Text} from "@/components/Themed";
import CardTrain from "@/components/CardTrain";
import {Ionicons} from '@expo/vector-icons';
import {getJourneys, getPtObject, searchForPtObject} from "@/app/api/api";
import {formatTimestamp} from "../api/utils";
import globalStyles from "@/app/styles";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const trains: any[] | (() => any[]) = [];
const {height, width} = Dimensions.get("window");

export default function TabOneScreen() {
    const [departCity, setDepartCity] = React.useState("");
    const [arrivalCity, setArrivalCity] = React.useState("");
    const [filteredTrains, setFilteredTrains] = React.useState(trains);
    const [isSearching, setIsSearching] = React.useState(false);
    const {top} = useSafeAreaInsets();

    const swapCities = () => {
        setDepartCity(arrivalCity);
        setArrivalCity(departCity);
    };

    const handleSearch = async () => {
        if (departCity === "" || arrivalCity === "") {
            console.log("Depart/Arrival city is/are empty");
            return
        }

        setIsSearching(true);

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
                        journey: journey[i],
                        section: section,
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

        setIsSearching(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={[styles.title, {marginTop: top}]}>railclock</Text>
            </View>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setDepartCity}
                    value={departCity}
                    placeholder="Gare de départ"
                    placeholderTextColor="#999"
                />
                <Pressable onPress={swapCities} style={styles.swapButton}>
                    <Ionicons name="swap-vertical" size={24} color="#210010"/>
                </Pressable>
                <TextInput
                    style={styles.input}
                    onChangeText={setArrivalCity}
                    value={arrivalCity}
                    placeholder="Gare d'arrivée"
                    placeholderTextColor="#999"
                />
            </View>
            <Pressable style={styles.button} onPress={handleSearch}>
                <Text style={styles.buttonText}>Rechercher</Text>
            </Pressable>
            {filteredTrains.length !== 0 && (<Text style={styles.sectionTitle}>Résultats de la recherche</Text>)}
            {filteredTrains.length === 0 && (<Text>Aucun train trouvé. Faites une recherche !</Text>)}
            {isSearching ? (<ActivityIndicator size={"large"}/>) :
                (
                    <FlatList
                        style={[{width: "100%"}]}
                        contentContainerStyle={globalStyles.contentContainer}
                        data={filteredTrains}
                        renderItem={({item}) => (
                            <CardTrain journey={item.journey} section={item.section} {...item} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
            }
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
    searchBarContainer: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        color: "#210010",
        fontFamily: "BricolageGrotesqueSemiBold",
    },
    subtitle: {
        fontSize: 20,
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
        fontFamily: "BricolageGrotesqueRegular"
    },
    swapButton: {
        position: "absolute",
        zIndex: 50,
        right: 15,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: "100%",
        top: "28%"
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
        marginTop: 40,
        marginBottom: 20,
        fontFamily: "BricolageGrotesqueSemiBold",
    },
    scrollView: {
        flex: 1,
        width: "100%",
    },
    noTrainText: {
        fontSize: 16,
        textAlign: "center",
        color: "#AB1E62",
        marginTop: 20,
    }
});