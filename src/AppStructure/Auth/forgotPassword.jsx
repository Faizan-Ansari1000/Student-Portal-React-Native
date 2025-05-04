import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
    SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/Apis/ApiInstance";

export default function ForgotPassword() {
    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const notify = "Server error";

    const resetPassword = async () => {
        if (!model.email || !model.newPassword) {
            return Toast.show({
                type: "error",
                text1: "Validation error",
                text2: "Some Field are missing",
            });
        }
        if (!model.email.includes("@")) {
            return ToastAndroid.show("@ is missing in email", ToastAndroid.LONG);
        }
        if (model.newPassword.length < 6) {
            return ToastAndroid.show(
                "Password should be 6+ characters",
                ToastAndroid.LONG
            );
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post("/authRoute/forgotPassword", model);
            Toast.show({
                type: "success",
                text1: "Updated",
                text2: "Your Password is Successfully Updated",
            });
            setModel({});
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
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    {/* Top Design */}
                    <View style={styles.topDesign}>
                        <Text style={styles.topText}>Reset Password</Text>
                        <Text style={styles.subText}>Recover your account securely</Text>
                    </View>

                    {/* Heading */}
                    <Text style={styles.heading}></Text>

                    {/* Info Para */}
                    <Text style={styles.infoText}>
                        Enter your registered email and new password to reset.
                    </Text>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, email: e })}
                            value={model.email || ""}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter New Password"
                            placeholderTextColor="black"
                            secureTextEntry={true}
                            onChangeText={(e) =>
                                setModel({ ...model, newPassword: e })
                            }
                            value={model.newPassword || ""}
                        />
                    </View>

                    {/* Reset Password Button */}
                    <TouchableOpacity
                        style={styles.button}
                        disabled={loading}
                        onPress={resetPassword}
                    >
                        {loading ? (
                            <ActivityIndicator size={24} color={"#fff"} />
                        ) : (
                            <Text style={styles.buttonText}>Reset Password</Text>
                        )}
                    </TouchableOpacity>

                    {/* Back to Login Line */}
                    <View style={styles.signUpButton}>
                        <Text style={styles.signupText}>Remember your password?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.signupLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
    },
    container: {
        width: "100%",
        alignItems: "center",
    },
    topDesign: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 160,
        backgroundColor: "black",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    topText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    subText: {
        fontSize: 14,
        color: "#fff",
        textAlign: "center",
        marginTop: 5,
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 160,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 14,
        color: "gray",
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    inputContainer: {
        width: "90%",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: "#f5f5f5",
        color: "#000",
    },
    button: {
        width: "90%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    signupText: {
        color: "black",
    },
    signupLink: {
        paddingStart: 5,
        fontWeight: "bold",
        color: "black",
        fontStyle: "italic",
    },
    signUpButton: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
});
