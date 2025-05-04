import { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../../config/Apis/ApiInstance";

export default function WorkshopReminder() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const notify = 'Server error';

    const sentUpdate = async () => {
        if (!model.workshop || !model.level || !model.date_time || !model.charges || !model.destination) {
            return Toast.show({ type: 'error', text1: 'Validation error', text2: 'Some Fields are missing' });
        }
        if (model.charges.length > 4) {
            return ToastAndroid.show('Put the 4 digits', ToastAndroid.LONG);
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/studentRoute/workshop', model);
            Toast.show({ type: 'success', text1: 'Post', text2: 'Congrats! Update Form is Successfully Sent.' });
            setLoading(false);
            setModel({});
        } catch (error) {
            console.log(error);
            Toast.show({ type: 'error', text1: `${notify}`, text2: error.response?.data?.message });
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Workshop Update
            </Text>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Workshop Title"
                    placeholderTextColor="#888"
                    onChangeText={(e) => setModel({ ...model, workshop: e })}
                    value={model.workshop || ''}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Priority Level"
                    placeholderTextColor="#888"
                    onChangeText={(e) => setModel({ ...model, level: e })}
                    value={model.level || ''}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Date & Time"
                    placeholderTextColor="#888"
                    onChangeText={(e) => setModel({ ...model, date_time: e })}
                    value={model.date_time || ''}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Charges"
                    placeholderTextColor="#888"
                    keyboardType="number-pad"
                    onChangeText={(e) => setModel({ ...model, charges: e })}
                    value={model.charges || ''}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Destination"
                    placeholderTextColor="#888"
                    onChangeText={(e) => setModel({ ...model, destination: e })}
                    value={model.destination || ''}
                />

                <TouchableOpacity
                    disabled={loading}
                    onPress={sentUpdate}
                    style={styles.button}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color={'white'} />
                    ) : (
                        <Text style={styles.buttonText}>Send Update</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#f8f8f8",
        color: "#000",
    },
    button: {
        height: 50,
        backgroundColor: "#000",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
