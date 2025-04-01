import {View, Text, StyleSheet, Pressable} from "react-native";
import Svg, {Path} from "react-native-svg";
import {CornerDownRight, Navigation} from "lucide-react-native";
import {useNavigation} from "expo-router";
import {Journey, JourneySection} from "@/app/api/types";
import {setCurrentJourney} from "@/app/api/utils";
import globalStyles from "@/app/styles";

export default ({
                    journey,
                    section,
                    status = "onTime", // 'onTime', 'delayed', 'cancelled'
                    scheduledTime,
                    actualTime,
                    delayDuration,
                    additionalInfo,
                    depart,
                    arrival,
                    loading
                }: {
    journey: Journey;
    section: JourneySection;
    status?: string;
    scheduledTime: string;
    actualTime?: string;
    delayDuration?: string;
    additionalInfo?: string;
    depart?: string;
    arrival?: string;
    loading: boolean;
}) => {
    const navigation = useNavigation();

    const getBackgroundColor = () => {
        switch (status) {
            case "delayed":
                return "#AB1E62";
            case "cancelled":
                return "#C54200";
            default:
                return "#f5f5f5";
        }
    };

    const handleTrainCardPress = () => {
        setCurrentJourney(journey, section!, depart!, arrival!);
        // @ts-ignore
        navigation.navigate("(details)");
    }

    return (
        <Pressable onPress={handleTrainCardPress}>
            <View style={[styles.container, {backgroundColor: getBackgroundColor()}]}>
                <View style={styles.trainContainer}>
                    <Text
                        style={[
                            styles.trainName,
                            status !== "onTime" ? styles.whiteText : styles.blackText,
                        ]}
                    >
                        {depart}
                    </Text>
                    <View style={styles.destinationContainer}>
                        <CornerDownRight style={globalStyles.iconDim}/>
                        <Text
                            style={[
                                styles.destination,
                                status !== "onTime" ? styles.whiteText : styles.blackText,
                            ]}
                        >
                            {arrival}
                        </Text>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    {status === "delayed" ? (
                        <>
                            <View style={styles.delayedTimeContainer}>
                                <Text style={styles.scheduledTime}>{scheduledTime}</Text>
                                <Text style={[styles.trainTime, styles.whiteText]}>
                                    {actualTime}
                                </Text>
                            </View>
                            <Text style={styles.delayText}>Retard de {delayDuration}</Text>
                            {additionalInfo && (
                                <Text style={styles.additionalInfo}>{additionalInfo}</Text>
                            )}
                        </>
                    ) : status === "cancelled" ? (
                        <>
                            <Text style={[styles.cancelledText, styles.whiteText]}>
                                SUPPRIMÉ
                            </Text>
                            <Text style={[styles.scheduledTime, styles.whiteText]}>
                                {scheduledTime}
                            </Text>
                            {additionalInfo && (
                                <Text style={styles.additionalInfo}>{additionalInfo}</Text>
                            )}
                        </>
                    ) : (
                        <>
                            <Text style={[styles.trainTime, styles.blackText]}>
                                {scheduledTime}
                            </Text>
                            <Text style={[styles.blackText]}>à l'heure</Text>
                        </>
                    )}
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        marginVertical: 2,
        width: "100%",
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f5f5f5",
    },
    trainName: {
        fontSize: 20,
        fontFamily: "BricolageGrotesqueSemiBold",
    },
    trainTime: {
        fontSize: 30,
        lineHeight: 30,
        fontFamily: "BricolageGrotesqueSemiBold",
    },
    trainContainer: {
        flexDirection: "column",
        fontSize: 18,
        flexShrink: 1,
    },
    destinationContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        fontSize: 18,
    },
    destination: {
        fontSize: 20,
        fontFamily: "BricolageGrotesqueSemiBold",
    },
    timeContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: 18,
        alignItems: "flex-end",
        flex: 1,
        flexShrink: 0,
        minWidth: 100
    },
    delayedTimeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
        justifyContent: "flex-end",
    },
    scheduledTime: {
        fontSize: 18,
        textDecorationLine: "line-through",
        fontWeight: "bold",
        color: "white",
    },
    delayText: {
        fontSize: 16,
        color: "white",
    },
    cancelledText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    whiteText: {
        color: "#fff",
    },
    blackText: {
        color: "#000",
    },
    additionalInfo: {
        fontSize: 12,
        color: "white",
        marginTop: 4,
        fontStyle: "italic",
        textAlign: "left",
        flexWrap: "nowrap",
    },
    stopNameText: {
        fontSize: 20,
        fontFamily: "BricolageGrotesqueSemiBold",
    }
});
