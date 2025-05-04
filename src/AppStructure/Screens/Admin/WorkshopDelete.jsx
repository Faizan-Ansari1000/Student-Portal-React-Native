import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";
import Toast from "react-native-toast-message";

export default function WorkshopDelete() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const notify = 'Server error';

    const getData = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get('/studentRoute/workshop');
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

    const deleteData = async (itemId, index) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this workshop?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete", style: "destructive", onPress: async () => {
                        try {
                            setLoading(true);
                            await ApiInstance.delete(`/studentRoute/workshop/${itemId}`);
                            Toast.show({ type: 'success', text1: 'Success', text2: 'Successfully deleted' });
                            const updatedData = [...postData];
                            updatedData.splice(index, 1);
                            setPostData(updatedData);
                            setLoading(false);
                        } catch (error) {
                            console.log(error);
                            Toast.show({ type: 'error', text1: `${notify}`, text2: error.response?.data?.message });
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Your Workshops</Text>
            <Text style={styles.subtitle}>You can delete any workshop by tapping the button below.</Text>
            {loading ? (
                <ActivityIndicator size={32} color={'black'} style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={postData}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    renderItem={({ item, index }) => (
                        <View style={styles.card}>
                            <Text style={styles.text}>Date: {item.date_time}</Text>
                            <Text style={styles.text}>Destination: {item.destination}</Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                disabled={loading}
                                onPress={() => deleteData(item._id, index)}
                            >
                                <Text style={styles.deleteText}>Delete Workshop</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
        color: 'black',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 14,
        color: 'gray',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        elevation: 2,
    },
    text: {
        fontSize: 16,
        color: 'black',
        marginBottom: 4,
    },
    deleteButton: {
        marginTop: 12,
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
