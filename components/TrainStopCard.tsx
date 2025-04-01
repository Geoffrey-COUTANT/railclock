import {Text, View} from "@/components/Themed";
import {StyleSheet} from "react-native";
import {globalStyles} from "@/app/styles";

export enum TrainStopCardStyle {
    Default,
    Target,
    Unrelated
}

export function TrainStopCard({style, stopName, stopHour} : {style: TrainStopCardStyle, stopName: string, stopHour: string}) {
    let styleToAdd = undefined

    switch (style) {
        case TrainStopCardStyle.Default:
            styleToAdd = styles.stopNormal
            break;
        case TrainStopCardStyle.Target:
            styleToAdd = styles.stopTarget
            break;
        case TrainStopCardStyle.Unrelated:
            styleToAdd = styles.stopUnrelated
            break;
    }

    return (
        <View style={[styles.stopCard, styleToAdd]}>
            <Text style={[styles.stopNameText, styleToAdd]}>{stopName}</Text>
            <View style={styles.flexFiller}></View>
            <Text style={[globalStyles.hourText, styleToAdd]}>{stopHour}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    stopCard: {
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    stopNormal: {
        backgroundColor: "#E8E8E8",
        color: "#210010",
    },
    stopTarget: {
        backgroundColor: "#450021",
        color: "#fff",
    },
    stopUnrelated: {
        backgroundColor: "#E8E8E8",
        color: "#210010",
        opacity: 0.5
    },
    flexFiller: {
        flex: 1,
        backgroundColor: "#E8E8E8",
    },
    stopNameText: {
        fontSize: 20,
        fontFamily: "BricolageGrotesqueSemiBold",
    }
})