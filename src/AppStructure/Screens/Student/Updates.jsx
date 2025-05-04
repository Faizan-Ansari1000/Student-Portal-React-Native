import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
    TextInput,
    ScrollView,
    ToastAndroid,
} from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";

export default function Updates() {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState({});
    const [formIsOpen, setFormIsOpen] = useState(false)
    const [loader, setLoader] = useState(false);
    const notify = 'Server error'


    const getUpdates = useCallback(async () => {
        try {
            setLoading(true);
            const res = await ApiInstance.get("/studentRoute/update");
            setPostData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getUpdates();
    }, []);

    const sentApplication = async () => {
        if (!model.studentName || !model.fatherName || !model.studentClass || !model.description || !model.decision) {
            return ToastAndroid.show('Validation error (Some Fields are missing)', ToastAndroid.LONG)
        }
        try {
            setLoader(true)
            const res = await ApiInstance.post('/studentRoute/confirmation', model)
            Toast.show({ type: 'success', text1: 'Sent', text2: 'Your Form has been Successfully Submitted' })
            setModel({});
            setFormIsOpen(false)
            setLoader(false)
        } catch (error) {
            console.log(error)
            Toast.show({ type: 'error', text1: `${notify}`, text2: error.response?.data?.message })
            setLoader(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Admin Updates</Text>

            {loading ? (
                <ActivityIndicator color="black" size={28} style={{ marginTop: 40 }} />
            ) : postData.length === 0 ? (
                <Text style={styles.noData}>No Updates Available</Text>
            ) : (
                <FlatList
                showsVerticalScrollIndicator={false}
                    data={postData}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>Title: {item.title}</Text>
                            <Text style={styles.text}>Description: {item.description}</Text>
                            <Text style={styles.text}>Date: {item.date}</Text>
                            <Text style={styles.text}>Deadline: {item.importantDeadline}</Text>
                            <Text style={styles.text}>Location: {item.location}</Text>
                            <Text style={styles.text}>Priority Level: {item.level}</Text>

                            <TouchableOpacity
                                onPress={() => setFormIsOpen(true)}
                                style={styles.confirmBtn}
                            >
                                <MaterialIcons name="check-circle" size={20} color="white" />
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <Modal
                transparent={true}
                visible={formIsOpen}
                onRequestClose={() => setFormIsOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeading}>Please confirm the following details</Text>

                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 10 }}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <TextInput
                                placeholder="Student Name"
                                placeholderTextColor="#999"
                                onChangeText={(e) => setModel({ ...model, studentName: e })}
                                value={model.studentName || ""}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Father Name"
                                placeholderTextColor="#999"
                                onChangeText={(e) => setModel({ ...model, fatherName: e })}
                                value={model.fatherName || ""}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Class"
                                placeholderTextColor="#999"
                                onChangeText={(e) => setModel({ ...model, studentClass: e })}
                                value={model.studentClass || ""}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Yes / No"
                                placeholderTextColor="#999"
                                onChangeText={(e) => setModel({ ...model, decision: e })}
                                value={model.decision || ""}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Description (Optional)"
                                placeholderTextColor="#999"
                                onChangeText={(e) => setModel({ ...model, description: e })}
                                value={model.descriptions || ""}
                                style={[styles.input, styles.textArea]}
                                multiline
                            />

                            <TouchableOpacity disabled={loader} style={styles.sendButton} onPress={sentApplication}>
                                {loader ? (
                                    <ActivityIndicator color={"white"} />
                                ) : (
                                    <Text style={styles.sendButtonText}>Send</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setFormIsOpen(false)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>


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
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#f5f5f5",
        borderRadius: 14,
        padding: 14,
        marginBottom: 16,
        elevation: 3,
        shadowColor: "#000",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
        color: "#333",
        marginBottom: 2,
    },
    confirmBtn: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#000",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        marginTop: 10,
    },
    confirmText: {
        color: "#fff",
        fontWeight: "600",
        marginLeft: 6,
    },
    noData: {
        marginTop: 50,
        fontSize: 16,
        color: "#555",
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
    },
    modalHeading: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        fontSize: 14,
        color: "#000",
        backgroundColor: "#fff",
        marginTop: 6
    },
    textArea: {
        height: 80,
        textAlignVertical: "top",
    },
    sendButton: {
        backgroundColor: "#000",
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 16,
    },
    sendButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    closeButton: {
        backgroundColor: "#922b21",
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
        marginTop: 16,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});

