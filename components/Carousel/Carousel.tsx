import React, { useRef, useState } from "react";
import { View, Text, Image, ScrollView, Dimensions, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, } from "react-native";

interface SlideItem {
    id: string;
    title: string;
    image: any;
}

const data: SlideItem[] = [
    { id: "1", title: "Bienvenue", image: require("../assets/image1.png") },
    { id: "2", title: "Découvrez", image: require("../assets/image2.png") },
    { id: "3", title: "Commencez", image: require("../assets/image3.png") },
];

const { width } = Dimensions.get("window");

const CarouselComponent: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setActiveIndex(index);
    };

    return (
        <View>
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
                    </View>
                ))}
            </ScrollView>

            {/* INDICATEURS DE PAGINATION */}
            <View style={styles.pagination}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        width,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    image: {
        width: 280,
        height: 180,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "blue",
    },
    inactiveDot: {
        backgroundColor: "gray",
    },
});

export default CarouselComponent;