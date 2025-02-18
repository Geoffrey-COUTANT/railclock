import {Image, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';
import {CornerDownRight} from "lucide-react-native";
import {red} from "react-native-reanimated/lib/typescript/Colors";
import {globalStyles} from "@/app/styles"
import {BackButton} from "@/components/BackButton";

export default function DetailsScreen() {
    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.list}>
                <View>
                    <Image source={require('./images/map.png')} style={globalStyles.headerImage}/>
                    <BackButton offset={60}/>
                </View>
                <View style={globalStyles.paddedBox}>
                    <View style={globalStyles.horizontalList}>
                        <View style={globalStyles.list}>
                            <Text style={globalStyles.title}>Ychoux</Text>
                            <View style={globalStyles.horizontalList}>
                                <CornerDownRight style={globalStyles.iconDim} />
                                <Text style={globalStyles.title}>Bordeaux St Jean</Text>
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
            </View>
        </View>
    );
}