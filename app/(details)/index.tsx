import {ActivityIndicator, FlatList} from 'react-native';
import {Text, View} from '@/components/Themed';
import {CornerDownRight} from "lucide-react-native";
import {globalStyles} from "@/app/styles"
import {BackButton} from "@/components/BackButton";
import {TrainStopCard, TrainStopCardStyle} from "@/components/TrainStopCard";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import MapView, {Polyline} from "react-native-maps";
import {VehicleJourney} from "@/app/api/types";
import {formatTime, formatTimestamp, getCurrentJourney, getLinkId} from "@/app/api/utils";
import React, {useEffect, useState} from "react";
import {getVehicleJourney} from "@/app/api/api";

export default function DetailsScreen() {
    const {top} = useSafeAreaInsets();
    const journey = getCurrentJourney();
    const [vehicleJourney, setVehicleJourney] = useState<VehicleJourney>();
    const midLatitude = (44.825873 + 44.210613) / 2; // Moyenne des latitudes
    const midLongitude = (-0.556697 + -0.920974) / 2; // Moyenne des longitudes

    useEffect(() => {
        async function fetchThings() {
            if (!journey) return;

            let vehicleJourney = await getVehicleJourney(getLinkId(journey.section, "vehicle_journey")!)!;
            setVehicleJourney(vehicleJourney);
        }

        fetchThings()
    }, []);

    if (!journey) return <View><Text>No journey</Text></View>

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.list}>
                <View>
                    <MapView
                        style={[globalStyles.headerImage, {pointerEvents: "none"}]}
                        initialRegion={{
                            latitude: midLatitude, // Centrage sur le point médian
                            longitude: midLongitude,
                            latitudeDelta: 0.6922,
                            longitudeDelta: 0.6421,
                        }}
                    >
                        <Polyline
                            coordinates={[
                                { latitude: 44.825873, longitude: -0.556697 },
                                { latitude: 44.210613, longitude: -0.920974 },
                            ]}
                            strokeColor="#000"
                            strokeColors={['#7F0000']}
                            strokeWidth={2}
                        />
                    </MapView>
                    <BackButton offset={top}/>
                </View>
                <View style={globalStyles.paddedBox}>
                    <View style={globalStyles.horizontalList}>
                        <View style={globalStyles.list}>
                            <Text style={globalStyles.title}>{journey.depart}</Text>
                            <View style={globalStyles.horizontalList}>
                                <CornerDownRight style={globalStyles.iconDim}/>
                                <Text style={globalStyles.title}>{journey.arrival}</Text>
                            </View>
                        </View>
                        <View style={globalStyles.full}>

                        </View>
                        <View style={globalStyles.listRight}>
                            <Text style={globalStyles.textBody}>départ à</Text>
                            <Text
                                style={globalStyles.hourText}>{formatTimestamp(journey.journey.departure_date_time)}</Text>
                            <Text style={globalStyles.textBody}>arrivera à</Text>
                            <Text
                                style={globalStyles.hourText}>{formatTimestamp(journey.journey.arrival_date_time)}</Text>
                        </View>
                    </View>
                </View>
                <View style={[globalStyles.paddedBox, globalStyles.noMarginsX]}>
                    <Text
                        style={globalStyles.textBody}>Train {journey.section.display_informations.commercial_mode} {journey.section.display_informations.label}</Text>
                    <Text style={globalStyles.textBody}>n° {journey.section.display_informations.trip_short_name}</Text>
                </View>
                {vehicleJourney === undefined ? (
                    <ActivityIndicator size={"large"}/>) : <FlatList
                    contentContainerStyle={globalStyles.contentContainer}
                    data={vehicleJourney?.stop_times} renderItem={(item) => {
                    return <TrainStopCard
                        style={item.item.stop_point.name === journey?.arrival ? TrainStopCardStyle.Target : TrainStopCardStyle.Default}
                        stopName={item.item.stop_point.name} stopHour={formatTime(item.item.departure_time)}/>
                }} keyExtractor={(item, index) => index.toString()}/>}
            </View>
        </View>
    );
}