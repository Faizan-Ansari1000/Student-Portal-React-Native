import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../../config/Apis/ApiInstance";


export default function SentUpdate() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const notify = "Server error";

    const sentUpdate = async () => {
        if (
            !model.title ||
            !model.description ||
            !model.date ||
            !model.importantDeadline ||
            !model.location ||
            !model.level
        ) {
            return Toast.show({
                type: "error",
                text1: "Validation error",
                text2: "Some Fields are missing",
            });
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post("/studentRoute/update", model);
            Toast.show({
                type: "success",
                text1: "Sent",
                text2: "Update has been Successfully Sent",
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: `${notify}`,
                text2: error.response?.data?.message,
            });
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
                <Text style={styles.heading}>Send Update</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    placeholderTextColor="#777"
                    onChangeText={(e) => setModel({ ...model, title: e })}
                    value={model.title || ""}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    placeholderTextColor="#777"
                    onChangeText={(e) => setModel({ ...model, description: e })}
                    value={model.description || ""}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date"
                    placeholderTextColor="#777"
                    onChangeText={(e) => setModel({ ...model, date: e })}
                    value={model.date || ""}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Deadline"
                    placeholderTextColor="#777"
                    onChangeText={(e) => setModel({ ...model, importantDeadline: e })}
                    value={model.importantDeadline || ""}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    placeholderTextColor="#777"
                    onChangeText={(e) => setModel({ ...model, location: e })}
                    value={model.location || ""}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Priority Level"
                    placeholderTextColor="#777"
                    onChangeText={(e) => setModel({ ...model, level: e })}
                    value={model.level || ""}
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.disabledButton]}
                    disabled={loading}
                    onPress={sentUpdate}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.buttonText}>Send</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    scroll: {
        paddingBottom: 40,
    },
    heading: {
        color: "#000",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#f4f4f4",
        color: "#000",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderColor: "black",
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 12,
        padding: 14
    },
    backText: {
        color: "black",
        fontSize: 15,
    },
});
