import {Image, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {CornerDownRight} from "lucide-react-native";
import {red} from "react-native-reanimated/lib/typescript/Colors";

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <Image source={require('./images/map.png')} style={styles.headerImage}/>
                <View style={styles.paddedBox}>
                    <View style={styles.horizontalList}>
                        <View style={styles.list}>
                            <Text style={styles.title}>Ychoux</Text>
                            <View style={styles.horizontalList}>
                                <CornerDownRight style={styles.icon} />
                                <Text style={styles.title}>Bordeaux St Jean</Text>
                            </View>
                        </View>
                        <View style={styles.full}>

                        </View>
                        <View style={styles.listRight}>
                            <Text style={styles.hourText}>08:00</Text>
                            <Text style={styles.textBody}>à l'heure</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1
    },
    full: {
        flex: 1,
    },
    headerImage: {
        height: 250,
    },
    list: {
        display: "flex",
    },
    listRight: {
        display: "flex",
        alignItems: "flex-end",
    },
    horizontalList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    icon: {
        color: "black",
        opacity: 0.5
    },
    paddedBox: {
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontFamily: "BricolageGrotesqueSemiBold",
        lineHeight: 30
    },
    textBody: {
        fontSize: 18,
        fontFamily: "BricolageGrotesqueRegular",
    },
    hourText: {
        fontSize: 30,
        fontFamily: "BricolageGrotesqueBold",
        lineHeight: 30
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    }
});
