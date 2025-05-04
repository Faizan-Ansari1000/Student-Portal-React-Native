import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";
import Toast from "react-native-toast-message";

export default function Workshops() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const notify = 'Server error';

    const getWorkshops = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/studentRoute/workshop');
            console.log(res.data);
            setPostData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            Toast.show({ type: 'error', text1: `${notify}`, text2: error.response?.data?.message });
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getWorkshops();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Upcoming Workshops</Text>
            <Text style={styles.subHeading}>
                Stay updated with the latest workshops. Explore details, prioritize your participation, and enhance your skills.
            </Text>

            {loading ? (
                <ActivityIndicator color={'black'} size="large" style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={postData}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                            <Text style={styles.title}>{item.workshop}</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Priority:</Text>
                                <Text style={styles.value}>{item.level}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date & Time:</Text>
                                <Text style={styles.value}>{item.date_time}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Charges:</Text>
                                <Text style={styles.value}>{item.charges} /-</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Destination:</Text>
                                <Text style={styles.value}>{item.destination}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8,
    },
    subHeading: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
        lineHeight: 20,
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#444",
        width: 110,
    },
    value: {
        fontSize: 14,
        color: "#000",
        flex: 1,
    },
});
