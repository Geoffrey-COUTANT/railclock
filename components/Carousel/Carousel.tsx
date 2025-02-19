import React, { useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    StyleSheet,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Button, Pressable
} from "react-native";
import {useSafeAreaFrame, useSafeAreaInsets} from "react-native-safe-area-context";
import {globalStyles} from "@/app/styles";
import {LinearGradient} from "expo-linear-gradient";
import {BlurView} from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";

interface SlideItem {
    id: string;
    title: string;
    message: string;
    image: any;
}
const data: SlideItem[] = [
    { id: "1", title: "Les horaires de vos trains, en avance", message:"railclock vous permettra de connaître les horaires de vos trains préférés avec élégance.", image: require("./images/railclock-left.png") },
    { id: "2", title: "Recherchez l’horaire parfait pour le train parfait", message:"D’un point A à un point B, railclock vous fournira l’horaire parfait.", image: require("./images/Resultats_recherche-left.png") },
    { id: "3", title: "Observez votre trajet en un clic", message:"Railclock vous montre même la carte pour pouvoir vous y retrouver plus vite !", image: require("./images/Resultats_recherche-right.png") },
];

const { width } = Dimensions.get("window");

const CarouselComponent: React.FC = () => {
    const { bottom } = useSafeAreaInsets();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setActiveIndex(index);
    };

    return (
        <View>
            <View style={[styles.blurContainer, { width: '100%', height: '27%' }]}>
                {/*<MaskedView*/}
                {/*    maskElement={*/}
                {/*        <LinearGradient colors={["#AB1E62", "#D44E53", "#FF8242"]}*/}
                {/*                        locations={[0, 0.5, 1]}*/}
                {/*                        style={[StyleSheet.absoluteFill]}*/}
                {/*        />*/}
                {/*    }*/}
                {/*    style={[StyleSheet.absoluteFill]}>*/}
                {/*    <BlurView intensity={1000} tint="dark" style={StyleSheet.absoluteFill}/>*/}
                {/*    <LinearGradient colors={["#AB1E62", "#D44E53", "#FF8242"]}*/}
                {/*                    locations={[1, 0.5 , 0]}*/}
                {/*                    style={[StyleSheet.absoluteFill]}*/}
                {/*    />*/}
                {/*</MaskedView>*/}Ò
            </View>
            {/* SCROLLVIEW HORIZONTAL */}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {data.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.message}>{item.message}</Text>
                    </View>
                ))}
            </ScrollView>
            {/* INDICATEURS DE PAGINATION */}
            <View style={[styles.pagination]}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>
            <View style={[{marginBottom: bottom}, globalStyles.primaryButton]}>
                <Pressable onPress={() => {
                    scrollViewRef.current?.scrollTo({x: width * (activeIndex + 1), animated: true});
                }}>
                    <Text style={styles.buttonMessage}>Continuer</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        width,
        marginTop: 70,
        padding: 20,
        display: "flex",
    },
    image: {
        alignSelf: "center",
        width: 250,
        flex: 1,
        borderRadius: 10,
        objectFit: "contain",
    },
    title: {
        fontSize: 40,
        fontFamily: "BricolageGrotesqueBold",
        marginTop: 10,
    },
    message: {
        fontSize: 25,
        fontFamily: "BricolageGrotesqueRegular",
        marginTop: 10,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "#210010",
        borderRadius: 10,
        width: 8,
        height: 8,
    },
    inactiveDot: {
        backgroundColor: "gray",
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "red"
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "25%",
        justifyContent: "flex-end",
    },
    blur: {
        width: '100%',
        height: '100%'
    },
    blurContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "25%",
        justifyContent: "flex-end",
    },
    primaryButton: {
        backgroundColor: "#FF8242",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    buttonMessage: {
        color: "white",
        fontSize: 20,
        marginVertical: 5,
        fontFamily: "BricolageGrotesqueRegular",
        textAlign: "center",
    }
});

export default CarouselComponent;

