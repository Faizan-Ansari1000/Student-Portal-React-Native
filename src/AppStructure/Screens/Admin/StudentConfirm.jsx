import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";
import Toast from "react-native-toast-message";

export default function StudentConfirm() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const notify = 'Server error';

    const getData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/studentRoute/confirmation');
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
        getData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Student Confirmations
            </Text>

            {loading ? (
                <ActivityIndicator size={28} color={'black'} style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={postData}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                            <Text style={styles.title}>{item.studentName}</Text>
                            <View style={styles.detailRow}>
                                <Text style={styles.label}>Father Name:</Text>
                                <Text style={styles.value}>{item.fatherName}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.label}>Class:</Text>
                                <Text style={styles.value}>{item.studentClass}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.label}>Description:</Text>
                                <Text style={styles.value}>{item.description || 'N/A'}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.label}>Decision:</Text>
                                <Text style={styles.value}>{item.decision}</Text>
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
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#f8f8f8",
        padding: 16,
        borderRadius: 16,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
        fontStyle:'italic'
    },
    detailRow: {
        flexDirection: "row",
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        width: 100,
    },
    value: {
        fontSize: 14,
        color: "#000",
        flex: 1,
    },
});
