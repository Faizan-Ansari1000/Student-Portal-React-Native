import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Assignments() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.heading}>Assignments</Text>
                <Text style={styles.subHeading}>
                    Keep track of all your assignments here. Make sure to submit before the deadlines to stay on top!
                </Text>

                {/* Assignment 1 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>Assignment: Mathematics</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Subject:</Text>
                        <Text style={styles.value}>Algebra</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Assigned:</Text>
                        <Text style={styles.value}>April 20, 2025</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Due:</Text>
                        <Text style={[styles.value, { color: "red" }]}>April 30, 2025</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.descText}>
                            Solve all exercises from Chapter 5. Make sure to show all steps clearly and double-check your answers.
                        </Text>
                    </View>
                    <Text style={styles.status}>Status: Pending</Text>
                </TouchableOpacity>

                {/* Assignment 2 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>Assignment: English Literature</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Subject:</Text>
                        <Text style={styles.value}>Poetry Analysis</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Assigned:</Text>
                        <Text style={styles.value}>April 18, 2025</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Due:</Text>
                        <Text style={[styles.value, { color: "red" }]}>April 28, 2025</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.descText}>
                            Write a detailed analysis of the poem "The Road Not Taken" by Robert Frost. Focus on theme, tone, and literary devices.
                        </Text>
                    </View>
                    <Text style={[styles.status, { color: "#f39c12" }]}>Status: In Progress</Text>
                </TouchableOpacity>

                {/* Assignment 3 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>Assignment: Science</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Subject:</Text>
                        <Text style={styles.value}>Physics - Motion</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Assigned:</Text>
                        <Text style={styles.value}>April 19, 2025</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Due:</Text>
                        <Text style={[styles.value, { color: "red" }]}>May 2, 2025</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.descText}>
                            Create a project explaining Newton's Laws of Motion with real-life examples. Presentation should be in PPT format.
                        </Text>
                    </View>
                    <Text style={[styles.status, { color: "green" }]}>Status: Completed</Text>
                </TouchableOpacity>

                {/* Assignment 4 */}
                <TouchableOpacity activeOpacity={0.8} style={styles.card}>
                    <Text style={styles.title}>Assignment: Computer Science</Text>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Subject:</Text>
                        <Text style={styles.value}>HTML & CSS</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Assigned:</Text>
                        <Text style={styles.value}>April 17, 2025</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Due:</Text>
                        <Text style={[styles.value, { color: "red" }]}>April 27, 2025</Text>
                    </View>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.label}>Description:</Text>
                        <Text style={styles.descText}>
                            Design a personal portfolio website using basic HTML and CSS only. Include About, Projects, and Contact sections.
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
        width: 120,
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
