import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
    View, TouchableOpacity, ScrollView, TextInput, StyleSheet, ToastAndroid, Text, ActivityIndicator, Modal,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ApiInstance from "../../config/Apis/ApiInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Portal() {
    const navigation = useNavigation();
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const getProfileName = async () => {
        try {
            setLoading(true);
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                ToastAndroid.show("Oops! Profile not found", ToastAndroid.SHORT);
                return;
            }
            const res = await ApiInstance.get(`/studentRoute/studentReg/${userId}`);
            setPostData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            // Toast.show({
            //     type: "error",
            //     text1: "Server error",
            //     text2: error.response?.data?.message
            // });
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginStart: 3 }}>
                    <TouchableOpacity onPress={() => setIsOpen(true)} style={{ marginRight: 10 }}>
                        <MaterialIcons name="list" color="black" size={26} />
                    </TouchableOpacity>
                </View>
            )

        });
    }, [navigation]);

    useEffect(() => {
        getProfileName();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {/* Modal */}
                <Modal transparent visible={isOpen} animationType="fade" onRequestClose={() => setIsOpen(false)}>
                    <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setIsOpen(false)}>
                        <View style={styles.modalContentWrapper}>
                            <View style={styles.modalContainer}>
                                <TouchableOpacity style={styles.modalItem} onPress={() => navigation.navigate('Workshops')}>
                                    <Text style={styles.modalText}>Workshops</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalItem}>
                                    <Text style={styles.modalText}>Application Sent</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalItem} onPress={() => navigation.navigate('Queries')}>
                                    <Text style={styles.modalText}>Queries</Text>
                                </TouchableOpacity>
                                <View style={{ backgroundColor: 'white', borderRadius: 22, padding: 1, }}>
                                    <TouchableOpacity style={[styles.modalButton,]} onPress={() => setIsOpen(false)}>
                                        <Text style={[styles.modalText, { color: "red" }]}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                {/* Search */}
                <View style={styles.searchContainer}>
                    <TextInput placeholder="Search..." placeholderTextColor="#999" style={styles.searchInput} />
                    <MaterialIcons name="search" size={24} color="black" />
                </View>

                {/* Welcome */}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.welcomeText}>Assalam o Walaikum!</Text>
                    {loading ? (
                        <ActivityIndicator color={"black"} size={20} />
                    ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <Text style={styles.welcomeText}>
                                {postData?.stdName || "User"}
                            </Text>
                        </TouchableOpacity>
                    )}

                </View>
                {/* Horizontal Quick Access Cards */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickScroll}>
                    <TouchableOpacity style={styles.quickCardAssignment} onPress={() => navigation.navigate('Assignments')}>
                        <Text style={styles.quickText}>Assignments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCardShdedule} onPress={() => navigation.navigate('Schedule')}>
                        <Text style={styles.quickText}>Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCardProgess} onPress={() => navigation.navigate('Progress')}>
                        <Text style={styles.quickText}>Progress</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Lessons Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.heading}>Lessons</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>SEE ALL</Text>
                    </TouchableOpacity>
                </View>

                {/* Horizontal Lessons */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.lessonScroll}>
                    <TouchableOpacity style={styles.lessonCard}>
                        <Text style={styles.lessonText}>React Native</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lessonCard}>
                        <Text style={styles.lessonText}>JavaScript</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lessonCard}>
                        <Text style={styles.lessonText}>UI Design</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.lessonCard}>
                        <Text style={styles.lessonText}>Backend Development</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Content for Scrrolable Screen */}
                <View style={styles.extraContent}>
                    {/* Upcoming Class */}
                    <Text style={styles.subHeading}>Upcoming Class</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.contentTitle}>Mobile App Development</Text>
                        <Text style={styles.contentText}> Monday |  10:00 AM - 12:00 PM</Text>
                        <Text style={styles.contentText}> Room 204, Main Building</Text>
                        <Text style={styles.contentText}> Instructor: Sir Ahmed</Text>
                    </View>

                    {/* Reminders */}
                    <Text style={styles.subHeading}>Reminders</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.contentTitle}>Assignment 4 - UI Components</Text>
                        <Text style={styles.contentText}> Due: Sunday, 11:59 PM</Text>
                        <Text style={styles.contentText}> Submit via Student Portal</Text>
                    </View>

                    {/* Announcements */}
                    <Text style={styles.subHeading}>Announcements</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.contentTitle}> Mid-Term Results Announced</Text>
                        <Text style={styles.contentText}>Check your grades in the Results section.</Text>
                    </View>

                    {/* Enrolled Courses */}
                    <Text style={styles.subHeading}>My Courses</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.contentText}> Mobile App Development</Text>
                        <Text style={styles.contentText}> JavaScript Essentials</Text>
                        <Text style={styles.contentText}> UI/UX Designing</Text>
                    </View>

                    {/* Progress Report */}
                    <Text style={styles.subHeading}>Progress Summary</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.contentText}> Attendance: 92%</Text>
                        <Text style={styles.contentText}> Assignments: 4/5 Submitted</Text>
                        <Text style={styles.contentText}> Quizzes: 3/4 Attempted</Text>
                    </View>

                    {/* Next Milestone */}
                    <Text style={styles.subHeading}>Next Milestone</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.contentTitle}> Final Project Presentation</Text>
                        <Text style={styles.contentText}> Date: May 25th</Text>
                        <Text style={styles.contentText}>Prepare and upload slides before May 20</Text>
                    </View>
                </View>

            </ScrollView>

            {/* Fixed Bottom Tab Bar */}
            <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItem}>
                    <MaterialIcons name="home" size={20} color="black" />
                    <Text style={styles.tabText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Updates')}>
                    <MaterialIcons name="notifications" size={20} color="black" />
                    <Text style={styles.tabText}>Updates</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
                    <MaterialIcons name="person" size={20} color="black" />
                    <Text style={styles.tabText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Setting')}>
                    <MaterialIcons name="settings" size={20} color="black" />
                    <Text style={styles.tabText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "flex-end",
        flexDirection: "row",
    },

    modalContentWrapper: {
        width: "70%",
        height: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: "#000",
        elevation: 6,
    },

    modalContainer: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
        justifyContent: "flex-start",
    },

    modalItem: {
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderColor: "#e6e6e6",
    },
    modalButton: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#641e16',
        borderWidth: 3,
        borderBottomWidth: 3,
        marginBottom: 10,
        borderRadius: 20,
        paddingStart: 5
    },

    modalText: {
        fontSize: 16,
        color: "black",
        fontWeight: "500",
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        margin: 5,
        marginBottom: 15,
        marginTop: 15,
        paddingHorizontal: 15,
        borderRadius: 22,
        backgroundColor: "white",
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: "black",
    },
    welcomeText: {
        fontSize: 18,
        color: "black",
        fontWeight: "600",
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    quickScroll: {
        paddingHorizontal: 2,
        marginBottom: 20,
    },
    quickCardAssignment: {
        backgroundColor: "#2874a6",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginRight: 5,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
    },
    quickCardShdedule: {
        backgroundColor: "#212f3c",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginRight: 5,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
    },
    quickCardProgess: {
        backgroundColor: "#145a32",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 16,
        marginRight: 5,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
    },
    quickText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    seeAll: {
        fontSize: 14,
        color: "black",
        fontWeight: "500",
    },
    lessonScroll: {
        paddingHorizontal: 5,
        marginBottom: 30,
        marginRight: 6
    },
    lessonCard: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 50,
        marginRight: 7,
    },
    lessonText: {
        color: "black",
        fontWeight: "600",
    },
    extraContent: {
        paddingHorizontal: 20,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
    },
    contentText: {
        color: "#333",
        fontSize: 14,
        marginTop: 4,
    },
    infoBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        backgroundColor: "#f9f9f9",
    },
    contentTitle: {
        fontWeight: "bold",
        fontSize: 14,
        color: "black",
        marginBottom: 4,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginTop: 10,
        marginBottom: 6,
    },
    tabBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 55,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    tabItem: {
        justifyContent: "center",
        alignItems: "center",
    },
    tabText: {
        fontSize: 12,
        color: "black",
    },
});
