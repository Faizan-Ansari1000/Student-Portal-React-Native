import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, ActivityIndicator, } from "react-native";
import Toast from "react-native-toast-message";
import ApiInstance from "../config/Apis/ApiInstance";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function SignUp() {

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const LoginAccount = async () => {
        if (!model.email || !model.password) {
            return Toast.show({
                type: "error",
                text1: "Validation error",
                text2: "Please Provide both Fields",
            });
        }
        if (!model.email.includes("@")) {
            return ToastAndroid.show("@ is missing", ToastAndroid.LONG);
        }
        try {
            setLoading(true);
            const res = await ApiInstance.post("/authRoute/login", model);
            console.log(res.data);
            const { role } = res.data;
            if (role === "admin") {
                Toast.show({
                    type: "success",
                    text1: "Logged In",
                    text2: "Welcome Principal",
                });
                setLoading(false);
                setModel({})
                navigation.navigate("Admin");
            } else if (role === "user") {
                Toast.show({
                    type: "success",
                    text1: "Logged In",
                    text2: "Welcome to Our Portal",
                });
                setLoading(false);
                setModel({})
                navigation.navigate("Portal");
            } else {
                Toast.show({
                    type: "error",
                    text1: "Role Error",
                    text2: "Role not found",
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Server error",
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
                    {/* Top Section */}
                    <View style={styles.topDesign}>
                        <Text style={styles.topText}>Let’s Sign You In</Text>
                        <Text style={styles.subText}>Welcome back! You’ve been missed.</Text>
                    </View>

                    {/* Heading */}
                    <Text style={styles.heading}></Text>

                    {/* Info Para */}
                    <Text style={styles.infoText}>
                        Hello Again!
                    </Text>
                    <Text style={styles.textLine}>Your gateway to knowledge starts here.</Text>

                    {/* Input Fields */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, email: e })}
                            value={model.email || ""}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(e) => setModel({ ...model, password: e })}
                            value={model.password || ""}
                        />
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity style={styles.button} disabled={loading} onPress={LoginAccount}>
                        {loading ? (
                            <ActivityIndicator size={24} color={"#fff"} />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    {/* Account Line */}
                    <View style={styles.signUpButton}>
                        <Text style={styles.signupText}>Missing your Password?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
                            <Text style={styles.signupLink}>Forget</Text>
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
        fontSize: 30,
        color: "black",
        textAlign: "center",
        marginBottom: 30,
        paddingHorizontal: 10,
        fontWeight: 'bold', fontStyle: 'italic'
    },
    textLine: {
        fontStyle: 'italic',
        color: "black",
        marginBottom: 20,
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
        fontStyle: 'italic'
    },
    signUpButton: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
});

