import {Text, View} from "@/components/Themed";
import {Pressable, StyleSheet} from "react-native";
import {ChevronLeft} from "lucide-react-native";
import {globalStyles} from "@/app/styles";
import {Link, useNavigation} from "expo-router";

export function BackButton() {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.background} onPress={() => {navigation.goBack()}}>
            <View>
                <ChevronLeft style={globalStyles.icon} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    background: {
        padding: 15,
        position: "absolute",
        top: 15,
        left: 15,
        borderRadius: 8,
        backgroundColor: '#fff',
    }
})