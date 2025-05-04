import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


export default function Admin() {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('StudentQueries')}>
                        <MaterialIcons name="notifications" size={26} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Admin Dashboard</Text>
            <Text style={styles.subheading}>Welcome, Admin! Here's your control panel.</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SentUpdate')}>
                    <Text style={styles.cardTitle}> Post Update</Text>
                    <Text style={styles.cardDesc}>Send important update to all students.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentGet')}>
                    <Text style={styles.cardTitle}> View All Students</Text>
                    <Text style={styles.cardDesc}>Check student list, attendance, and more.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('StudentConfirm')}>
                    <Text style={styles.cardTitle}> Notifications</Text>
                    <Text style={styles.cardDesc}>Send or get notifications.</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Updates</Text>

                <View style={styles.updateBox}>
                    <TouchableOpacity onPress={() => navigation.navigate('WorkshopDelete')}>
                        <Text style={styles.updateTitle}>Delete</Text>
                        <Text style={styles.updateText}>Delete Data of worksop.</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.updateBox}>
                    <TouchableOpacity onPress={() => navigation.navigate('WorkshopReminder')}>
                        <Text style={styles.updateTitle}> Workshop Reminder</Text>
                        <Text style={styles.updateText}>AI Workshop at 2 PM, Lab-1, Thursday.</Text>
                        <Text style={styles.updateDate}>Posted on: 20 Apr 2025</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomSpace} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    heading: {
        color: "#000",
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subheading: {
        color: "#333",
        fontSize: 14,
        marginBottom: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: "#000",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
    card: {
        backgroundColor: "#f5f5f5",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    cardTitle: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    cardDesc: {
        color: "#555",
        fontSize: 13,
    },
    updateBox: {
        backgroundColor: "#f5f5f5",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    updateTitle: {
        color: "#000",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
    },
    updateText: {
        color: "#444",
        fontSize: 13,
        marginBottom: 6,
    },
    updateDate: {
        color: "#777",
        fontSize: 12,
    },
    bottomSpace: {
        height: 80,
    },
});
