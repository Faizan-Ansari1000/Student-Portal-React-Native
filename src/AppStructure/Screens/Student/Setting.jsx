import { ScrollView, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Setting() {

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const logOut = async () => {
        try {
            setLoading(true)
            await AsyncStorage.removeItem('userId')
            setLoading(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Welcome' }]
            })
        } catch (error) {
            console.log(error)
            ToastAndroid.show('You are not Logout in App (Please Try Again)', ToastAndroid.LONG)
            setLoading(false)
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Settings</Text>

            {/* Preferences Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Enable Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Dark Mode</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={() => setDarkMode(!darkMode)}
                    />
                </View>
            </View>

            {/* Security Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Security</Text>

                <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('forgotPassword')}>
                    <Text style={styles.optionText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Two-Factor Authentication</Text>
                </TouchableOpacity>
            </View>

            {/* Others */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Other</Text>

                <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('AboutApp')}>
                    <Text style={styles.optionText}>About the App</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton}>
                    <Text style={styles.optionText}>Privacy Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={logOut} disabled={loading}>
                    <Text style={[styles.optionText, { color: 'red' }]}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    optionButton: {
        paddingVertical: 22,
    },
    optionText: {
        fontSize: 14,
        color: 'black',
    },
});
