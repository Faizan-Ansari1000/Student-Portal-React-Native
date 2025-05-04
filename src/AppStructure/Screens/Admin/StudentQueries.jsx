import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ApiInstance from "../../config/Apis/ApiInstance";

export default function StudentQueries() {

    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const getQueries = useCallback(async () => {
        try {
            setLoading(true)
            setErrorMsg(null)
            const res = await ApiInstance.get('/studentRoute/query')
            setPostData(res.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setErrorMsg(error.message && 'Your Internet is unstable or Backend error');
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getQueries();
    }, [])

    return (
        <View style={Style.container}>
            <Text style={Style.heading}>Student Queries</Text>

            {errorMsg && <Text style={Style.error}>{errorMsg}</Text>}

            {loading ? (
                <ActivityIndicator color={'black'} size={30} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                showsVerticalScrollIndicator={false}
                    data={postData}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={Style.card}>
                            <Text style={Style.label}>Student Name:</Text>
                            <Text style={Style.value}>{item.stdName}</Text>

                            <Text style={Style.label}>Email Address:</Text>
                            <Text style={Style.value}>{item.email}</Text>

                            <Text style={Style.label}>Phone:</Text>
                            <Text style={Style.value}>{item.phone}</Text>

                            <Text style={Style.label}>Subject:</Text>
                            <Text style={Style.value}>{item.subject}</Text>

                            <Text style={Style.label}>Detail:</Text>
                            <Text style={Style.value}>{item.detail}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2
    },
    label: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 14
    },
    value: {
        color: '#333',
        fontSize: 14,
        marginBottom: 8
    }
});
