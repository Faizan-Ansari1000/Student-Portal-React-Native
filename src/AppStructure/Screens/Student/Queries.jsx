import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../../config/Apis/ApiInstance";

export default function Queries() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const notify = 'Server error';

    const sentQuery = async () => {
        if (!model.stdName || !model.email || !model.phone || !model.subject || !model.detail) {
            return Toast.show({ type: 'error', text1: 'Validation error', text2: 'Some Fields are missing' });
        }
        if (model.phone.length > 11 || model.phone.length < 11) {
            return ToastAndroid.show('Your Phone Number is too wrong', ToastAndroid.LONG);
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post('/studentRoute/query', model);
            Toast.show({ type: 'success', text1: 'Sent', text2: 'Your Query has been successfully sent' });
            setLoading(false);
            setModel({});
        } catch (error) {
            console.log(error);
            Toast.show({ type: 'error', text1: `${notify}`, text2: error.response?.data?.message });
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Need Help? Submit Your Query
            </Text>
            <Text style={styles.description}>
                If you have any questions, problems, or need assistance, feel free to fill the form below. 
                Our support team will review your query and get back to you as soon as possible. 
                Please provide clear and detailed information so we can serve you better!
            </Text>

            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Student Name (Required)"
                        placeholderTextColor="#aaa"
                        onChangeText={(e) => setModel({ ...model, stdName: e })}
                        value={model.stdName || ''}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Email Address (Required)"
                        placeholderTextColor="#aaa"
                        onChangeText={(e) => setModel({ ...model, email: e })}
                        value={model.email || ''}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Phone Number (Required)"
                        placeholderTextColor="#aaa"
                        onChangeText={(e) => setModel({ ...model, phone: e })}
                        value={model.phone || ''}
                        keyboardType="number-pad"
                        maxLength={11}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Subject (Short Text)"
                        placeholderTextColor="#aaa"
                        onChangeText={(e) => setModel({ ...model, subject: e })}
                        value={model.subject || ''}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Message (Longer Detail)"
                        placeholderTextColor="#aaa"
                        onChangeText={(e) => setModel({ ...model, detail: e })}
                        value={model.detail || ''}
                        multiline
                        numberOfLines={4}
                        style={[styles.input, styles.textArea]}
                    />

                    <TouchableOpacity
                        disabled={loading}
                        onPress={sentQuery}
                        style={styles.button}
                    >
                        {loading ? (
                            <ActivityIndicator color={'#fff'} />
                        ) : (
                            <Text style={styles.buttonText}>Send Query</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 20,
        lineHeight: 22,
    },
    formContainer: {
        gap: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        color: '#000',
    },
    textArea: {
        textAlignVertical: 'top',
        height: 80,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
