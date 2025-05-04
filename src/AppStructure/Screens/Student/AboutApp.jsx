import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutApp() {

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>About This App</Text>

            <View style={styles.section}>
                <Text style={styles.title}>App Name:</Text>
                <Text style={styles.text}>Student LMS Portal</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Developed By:</Text>
                <Text style={styles.text}>Faizan</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Purpose:</Text>
                <Text style={styles.text}>
                    This mobile application was created to simplify and modernize the student learning management experience. It allows students to access courses, manage their assignments, view progress, receive updates, and send queries — all in one convenient and user-friendly app.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Motivation:</Text>
                <Text style={styles.text}>
                    The inspiration behind this app was to reduce the manual effort required in student-teacher communication and give students a clean and organized digital environment for their academic life. The app bridges gaps in scheduling, performance tracking, and updates through a modern UI.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Core Features:</Text>
                <Text style={styles.text}>• View and manage assignments</Text>
                <Text style={styles.text}>• Course progress tracking</Text>
                <Text style={styles.text}>• Real-time schedule updates</Text>
                <Text style={styles.text}>• Push notifications for announcements</Text>
                <Text style={styles.text}>• Direct student queries system</Text>
                <Text style={styles.text}>• Secure login and user profile</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Technologies Used:</Text>
                <Text style={styles.text}>• React Native (Frontend)</Text>
                <Text style={styles.text}>• Node.js & Express.js (Backend)</Text>
                <Text style={styles.text}>• MongoDB (Database)</Text>
                <Text style={styles.text}>• Notifications, Axios, React Hooks, Navigation and more.... </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Design Theme:</Text>
                <Text style={styles.text}>
                    The app is designed using a minimalist black & white theme to offer a clean, distraction-free experience that feels both modern and professional. Rounded corners, consistent typography, and padding contribute to a smooth UI.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Contact & Feedback:</Text>
                <Text style={styles.text}>For suggestions, bugs, or questions:</Text>
                <Text style={styles.text}>Email: faizan.dev@example.com</Text>
                <Text style={styles.text}>Phone: +92-300-0000000</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Version 1.0.0</Text>
                <Text style={styles.footerText}>© 2025 Faizan. All rights reserved.</Text>
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
        marginBottom: 25,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
        color: 'black',
        lineHeight: 28,
    },
    footer: {
        marginTop: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20
    },
    footerText: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
        lineHeight: 18,
    },

});
