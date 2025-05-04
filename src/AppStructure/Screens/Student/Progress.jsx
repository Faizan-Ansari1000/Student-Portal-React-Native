import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Progress() {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                <Text style={styles.heading}>Student Progress Overview</Text>
                <Text style={styles.subHeading}>
                    Track your learning journey and achievements. Keep pushing yourself towards excellence!
                </Text>

                {/* Progress Card 1 */}
                <View style={styles.progressCard}>
                    <Text style={styles.courseTitle}>Mathematics</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: "80%" }]} />
                    </View>
                    <Text style={styles.percentageText}>80% Completed</Text>
                    <Text style={styles.courseDetails}>Chapters Covered: Algebra, Trigonometry, Geometry</Text>
                </View>

                {/* Progress Card 2 */}
                <View style={styles.progressCard}>
                    <Text style={styles.courseTitle}>Physics</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: "65%" }]} />
                    </View>
                    <Text style={styles.percentageText}>65% Completed</Text>
                    <Text style={styles.courseDetails}>Topics Covered: Laws of Motion, Thermodynamics</Text>
                </View>

                {/* Progress Card 3 */}
                <View style={styles.progressCard}>
                    <Text style={styles.courseTitle}>English Literature</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: "90%" }]} />
                    </View>
                    <Text style={styles.percentageText}>90% Completed</Text>
                    <Text style={styles.courseDetails}>Books Read: Macbeth, Great Expectations</Text>
                </View>

                {/* Progress Card 4 */}
                <View style={styles.progressCard}>
                    <Text style={styles.courseTitle}>Computer Science</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: "50%" }]} />
                    </View>
                    <Text style={styles.percentageText}>50% Completed</Text>
                    <Text style={styles.courseDetails}>Topics: HTML, CSS, Basic JavaScript</Text>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 16,
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 15,
        color: "#666",
        marginBottom: 25,
        lineHeight: 22,
    },
    progressCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    courseTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: 10,
    },
    progressBarBackground: {
        width: "100%",
        height: 12,
        backgroundColor: "#e0e0e0",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 10,
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#4CAF50",
        borderRadius: 6,
    },
    percentageText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        marginBottom: 8,
    },
    courseDetails: {
        fontSize: 13,
        color: "#888",
        lineHeight: 18,
    },
});
