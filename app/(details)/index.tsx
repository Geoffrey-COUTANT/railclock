import {Image, StyleSheet} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import {Text, View} from '@/components/Themed';

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.list}>
                <Image source={require('./images/map.png')} style={styles.headerImage}/>
                <View style={styles.paddedBox}>
                    <View style={styles.horizontalList}>
                        <View style={styles.list}>
                            <Text style={styles.title}>Ychoux</Text>
                            <Text style={styles.title}>Bordeaux St Jean</Text>
                        </View>
                        <View style={styles.full}>

                        </View>
                        <View style={styles.listRight}>
                            <Text style={styles.title}>08:00</Text>
                            <Text style={styles.title}>à l'heure</Text>
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
    },
    paddedBox: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    }
});
