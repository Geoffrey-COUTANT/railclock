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
    Button, Pressable, TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
    const navigation = useNavigation();

    const handleButtonCarouselPress = () => {
        if (activeIndex < data.length - 1) {
            // Passe au slide suivant
            scrollViewRef.current?.scrollTo({ x: (activeIndex + 1) * width, animated: true });
        } else {
            // Redirige vers la page d'accueil
            navigation.navigate("(home)");
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setActiveIndex(index);
    };

    return (
        <View>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                <View style={{ display: "flex", flexDirection: "row", marginBottom: 120 }}>
                    {/* SCROLLVIEW HORIZONTAL */}
                    {data.map((item) => (
                        <View key={item.id} style={styles.slide}>
                            <Image source={item.image} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.message}>{item.message}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={[styles.blurContainer, { width: '100%', height: '100%' }]} pointerEvents="none">
                <MaskedView
                    maskElement={
                        <LinearGradient
                            locations={[0, 0.6, 0.8, 0.9]}
                            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.4)']}
                            style={[styles.absoluteBottom]}
                        />
                    }
                    style={[styles.absoluteBottom]}>
                    <BlurView intensity={1000} tint="light" style={[styles.absoluteBottom]} />
                    <LinearGradient
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        colors={['#AB1E62', '#D44E53', '#FF8242']}
                        style={[styles.absoluteBottom, { opacity: 0.8 }]}
                    />
                </MaskedView>
            </View>

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

            {/* BOUTON CTA */}
            <Pressable onPress={handleButtonCarouselPress} style={styles.carouselCtaButton}>
                <Text style={styles.ctaText}>
                    {activeIndex < data.length - 1 ? "Suivant" : "Commencer"}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        width,
        marginTop: 70,
        padding: 20,
    },
    image: {
        alignSelf: "center",
        width: 250,
        flex: 1,
        borderRadius: 10,
        objectFit: "contain"
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
        position: 'absolute',
        transform: [{ translateX: "-50%" }],
        flexDirection: "row",
        left: "50%",
        bottom: "13%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
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
        backgroundColor: "rgba(33,0,16,0.5)",
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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    absoluteBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: "60%",
    },
    blurContainer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        paddingHorizontal: 35,
        paddingBottom: 50,
    },
    carouselCtaButton: {
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: [{ translateX: "-50%" }],
        backgroundColor: 'black',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 62,
        width: 370,
        zIndex: 10,
    },
    ctaText: {
        fontSize: 20,
        color: 'white'
    }
});

export default CarouselComponent;

