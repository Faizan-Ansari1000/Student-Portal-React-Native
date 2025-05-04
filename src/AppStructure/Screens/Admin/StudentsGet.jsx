import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";
import Toast from "react-native-toast-message";

export default function StudentGet() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [serachEmail, setSearchEmail] = useState("");
    const notify = 'Server error';

    const getStudents = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/studentRoute/studentReg');
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
        getStudents();
    }, []);

    const filteredData = serachEmail
        ? postData.filter((item) => item.email.toLowerCase().includes(serachEmail.toLowerCase()))
        : postData;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                All Registered Students
            </Text>
            <Text style={styles.subHeading}>
                Search by Email to find a student
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter student email"
                placeholderTextColor="#888"
                onChangeText={(e) => setSearchEmail(e)}
                value={serachEmail}
            />

            {loading ? (
                <ActivityIndicator size={28} color={'black'} style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={filteredData}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => {
                        const isHighlighted = item.email.toLowerCase() === serachEmail.toLowerCase();
                        return (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[
                                    styles.card,
                                    isHighlighted && styles.highlightedCard
                                ]}
                            >
                                <Text style={styles.title}>{item.stdName}</Text>
                                <View style={styles.detailRow}>
                                    <Text style={styles.label}>Father Name:</Text>
                                    <Text style={styles.value}>{item.fatherName}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.label}>Father Phone:</Text>
                                    <Text style={styles.value}>{item.fatherPhone}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.label}>Email:</Text>
                                    <Text style={styles.value}>{item.email}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.label}>Phone:</Text>
                                    <Text style={styles.value}>{item.phone}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.label}>CNIC:</Text>
                                    <Text style={styles.value}>{item.cnic}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.label}>Address:</Text>
                                    <Text style={styles.value}>{item.address}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.label}>Class:</Text>
                                    <Text style={styles.value}>{item.studentClass}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
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
        marginBottom: 8,
        textAlign: "center",
    },
    subHeading: {
        fontSize: 14,
        color: "#555",
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        height: 48,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 22,
        paddingHorizontal: 16,
        marginBottom: 20,
        color: "#000",
        backgroundColor: "#f8f8f8",
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
    highlightedCard: {
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: "#e8e8e8",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
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
