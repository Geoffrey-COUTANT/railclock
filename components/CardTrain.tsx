import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function CardTrain({
  status = "onTime", // 'onTime', 'delayed', 'cancelled'
  scheduledTime,
  actualTime,
  delayDuration,
  additionalInfo,
    depart,
    arrival
}: {
  status?: string;
  scheduledTime: string;
  actualTime?: string;
  delayDuration?: string;
  additionalInfo?: string;
  depart?: string;
  arrival?: string;
}) {
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

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
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
          <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke={status !== "onTime" ? "white" : "black"}
            strokeWidth={1.5}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
            />
          </Svg>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: undefined,
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
    fontFamily: "BricolageGrotesqueSemiBold"
  },
  trainContainer: {
    flexDirection: "column",
    fontSize: 18,
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
    marginLeft: 10,
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
