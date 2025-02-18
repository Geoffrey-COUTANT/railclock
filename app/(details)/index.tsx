import {Image, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {CornerDownRight} from "lucide-react-native";
import {red} from "react-native-reanimated/lib/typescript/Colors";
import {globalStyles} from "@/app/styles"
import {BackButton} from "@/components/BackButton";
import {TrainStopCard, TrainStopCardStyle} from "@/components/TrainStopCard";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function DetailsScreen() {
    const {top} = useSafeAreaInsets();

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.list}>
                <View>
                    <Image source={require('./images/map.png')} style={globalStyles.headerImage}/>
                    <BackButton offset={top}/>
                </View>
                <View style={globalStyles.paddedBox}>
                    <View style={globalStyles.horizontalList}>
                        <View style={globalStyles.list}>
                            <Text style={globalStyles.title}>Bordeaux St Jean</Text>
                            <View style={globalStyles.horizontalList}>
                                <CornerDownRight style={globalStyles.iconDim} />
                                <Text style={globalStyles.title}>Ychoux</Text>
                            </View>
                        </View>
                        <View style={globalStyles.full}>

                        </View>
                        <View style={globalStyles.listRight}>
                            <Text style={globalStyles.hourText}>08:00</Text>
                            <Text style={globalStyles.textBody}>à l'heure</Text>
                        </View>
                    </View>
                </View>
                <View style={[globalStyles.paddedBox, globalStyles.noMarginsX]}>
                    <Text style={globalStyles.textBody}>Train TER L51</Text>
                    <Text style={globalStyles.textBody}>n° 866543</Text>
                </View>
                <View style={[globalStyles.list, globalStyles.paddedBox, globalStyles.listGap]}>
                    <TrainStopCard style={TrainStopCardStyle.Default} stopName={"Bordeaux St Jean"} stopHour={"08:45"}/>
                    <TrainStopCard style={TrainStopCardStyle.Default} stopName={"Pessac"} stopHour={"08:50"}/>
                    <TrainStopCard style={TrainStopCardStyle.Default} stopName={"Biganos Facture"} stopHour={"08:55"}/>
                    <TrainStopCard style={TrainStopCardStyle.Target} stopName={"Ychoux"} stopHour={"09:00"}/>
                    <TrainStopCard style={TrainStopCardStyle.Unrelated} stopName={"Labouheyre"} stopHour={"11:00"}/>
                </View>
            </View>
        </View>
    );
}