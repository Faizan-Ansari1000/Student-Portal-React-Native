import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Schedule() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.heading}>Today's Schedule</Text>
                <Text style={styles.subHeading}>
                    Here’s your detailed schedule for today. Stay organized and on time to make the most of your day!
                </Text>

                {/* Schedule 1 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>Math Class</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Time:</Text>
                        <Text style={styles.value}>8:00 AM - 9:00 AM</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Room:</Text>
                        <Text style={styles.value}>Room 201</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Details:</Text>
                        <Text style={styles.descText}>
                            Algebra revision session for upcoming test. Bring your calculators and previous worksheets.
                        </Text>
                    </View>
                    <Text style={styles.status}>Status: Scheduled</Text>
                </TouchableOpacity>

                {/* Schedule 2 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>Science Practical</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Time:</Text>
                        <Text style={styles.value}>9:30 AM - 11:00 AM</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Lab:</Text>
                        <Text style={styles.value}>Physics Lab</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Details:</Text>
                        <Text style={styles.descText}>
                            Practical experiments on Laws of Motion. Lab coats and safety equipment are mandatory.
                        </Text>
                    </View>
                    <Text style={[styles.status, { color: "#f39c12" }]}>Status: In Progress</Text>
                </TouchableOpacity>

                {/* Schedule 3 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>English Literature Lecture</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Time:</Text>
                        <Text style={styles.value}>11:15 AM - 12:15 PM</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Room:</Text>
                        <Text style={styles.value}>Room 305</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Details:</Text>
                        <Text style={styles.descText}>
                            Analysis of Shakespeare's plays. Be ready with your notes and assigned reading materials.
                        </Text>
                    </View>
                    <Text style={[styles.status, { color: "green" }]}>Status: Completed</Text>
                </TouchableOpacity>

                {/* Schedule 4 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>Computer Lab Session</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Time:</Text>
                        <Text style={styles.value}>1:30 PM - 3:00 PM</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Lab:</Text>
                        <Text style={styles.value}>Computer Lab A</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Details:</Text>
                        <Text style={styles.descText}>
                            Practice HTML and CSS. Complete the assignment on personal portfolio design.
                        </Text>
                    </View>
                    <Text style={[styles.status, { color: "#3498db" }]}>Status: Review Pending</Text>
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
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 8,
    },
    subHeading: {
        fontSize: 15,
        color: "#555",
        marginBottom: 20,
        lineHeight: 22,
    },
    card: {
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    detailRow: {
        flexDirection: "row",
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        width: 100,
    },
    value: {
        fontSize: 14,
        color: "#000",
        flex: 1,
    },
    descriptionBox: {
        marginTop: 10,
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    descText: {
        fontSize: 13,
        color: "#333",
        lineHeight: 18,
    },
    status: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right",
    },
});
