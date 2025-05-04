import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Welcome() {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://static.vecteezy.com/system/resources/previews/007/885/644/non_2x/flat-isometric-illustration-concept-man-working-on-computer-free-vector.jpg'
                }}
            />
            <Text style={styles.title}>Welcome to LMS</Text>
            <Text style={styles.subtitle}>Learn Grow Succeed.</Text>

            <Text style={styles.description}>
                Access top courses, track your progress, and achieve your goals with our modern learning platform.
            </Text>
            <TouchableOpacity
                style={styles.getStartedButton}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#333333',
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 30,
    },
    description: {
        fontSize: 16,
        color: '#444444',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        marginBottom: 30,
    },
    getStartedButton: {
        backgroundColor: '#000000',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
    },
    getStartedText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },

});
