import React, { useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";

interface SlideItem {
    id: string;
    title: string;
    image: any;
}

const data: SlideItem[] = [
    { id: "1", title: "Bienvenue", image: require("./images/railclock-left.png") },
    { id: "2", title: "Découvrez", image: require("./images/railclock-left.png") },
    { id: "3", title: "Commencez", image: require("./images/Resultats_recherche-left.png") },
];

const { width, height } = Dimensions.get("window");

const CarouselComponent: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderItem = ({ item }: { item: SlideItem }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width * 0.8}
                layout="default"
                horizontal={true}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
                onSnapToItem={(index) => setActiveIndex(index)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    slide: {
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
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
});

export default CarouselComponent;