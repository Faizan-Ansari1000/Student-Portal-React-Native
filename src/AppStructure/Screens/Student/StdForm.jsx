import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../../config/Apis/ApiInstance";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function StdForm() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const registered = async () => {
        if (!model.stdName || !model.email || !model.fatherName || !model.phone || !model.fatherPhone || !model.address || !model.cnic || !model.studentClass) {
            return Toast.show({
                type: "error",
                text1: "Validation error",
                text2: "All Fields are required",
            });
        }

        if (!model.email.includes("@")) {
            return ToastAndroid.show("@ is missing in Email", ToastAndroid.LONG);
        }

        if (model.phone?.length < 11 || model.fatherPhone?.length < 11) {
            return ToastAndroid.show(
                "Enter valid 11-digit phone numbers",
                ToastAndroid.LONG
            );
        }

        if (model.cnic?.length < 13) {
            return ToastAndroid.show(
                "Enter valid 13-digit CNIC",
                ToastAndroid.LONG
            );
        }

        try {
            setLoading(true);
            const res = await ApiInstance.post("/studentRoute/studentReg", model);
            Toast.show({
                type: "success",
                text1: "Submitted",
                text2: "Your Application has been Submitted",
            });
            console.log(res.data)
            await AsyncStorage.setItem('userId', res.data.data._id)
            setModel({});
            navigation.navigate('Portal')
            setLoading(false)
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Server Error",
                text2: error.response?.data?.message || "Something went wrong",
            });
            setLoading(false)
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.heading}>Student Registration</Text>
            <Text style={styles.infoText}>
                Please fill all fields carefully, once submitted it cannot be edited.
            </Text>

            <View style={styles.formBox}>
                <View style={styles.inputWrapper}>
                    <MaterialIcons name="person" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Student Name"
                        onChangeText={(e) => setModel({ ...model, stdName: e })}
                        value={model.stdName || ""}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="person-outline" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Father Name"
                        onChangeText={(e) => setModel({ ...model, fatherName: e, })}
                        value={model.fatherName || ""}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="email" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={[
                            styles.input,
                        ]}
                        placeholder="Email Address"
                        onChangeText={(e) => setModel({ ...model, email: e })}
                        value={model.email || ""}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="phone" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone No"
                        keyboardType="number-pad"
                        onChangeText={(e) => setModel({ ...model, phone: e })}
                        value={model.phone || ""}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="call" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Father's Contact"
                        keyboardType="number-pad"
                        onChangeText={(e) => setModel({ ...model, fatherPhone: e })}
                        value={model.fatherPhone || ""}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="badge" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="CNIC"
                        keyboardType="number-pad"
                        onChangeText={(e) => setModel({ ...model, cnic: e })}
                        value={model.cnic || ""}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="location-city" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        onChangeText={(e) => setModel({ ...model, address: e })}
                        value={model.address || ""}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="school" size={22} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Class"
                        onChangeText={(e) => setModel({ ...model, studentClass: e })}
                        value={model.studentClass || ""}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={registered}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size={24} color={"#fff"} />
                    ) : (
                        <Text style={styles.buttonText}>Submit Form</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 10,
        color: "black",
    },
    infoText: {
        textAlign: "center",
        color: "#444",
        marginBottom: 20,
    },
    formBox: {
        width: "100%",
        alignItems: "center",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "#f5f5f5",
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: "#000",
    },
    invalidInput: {
        borderColor: "red",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "600",
    },
});
