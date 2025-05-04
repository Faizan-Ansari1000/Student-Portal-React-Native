import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ApiInstance from "../Apis/ApiInstance";

const NotificationIcon = () => {
  const [hasNewUpdate, setHasNewUpdate] = useState(false);

  useEffect(() => {
    const fetchUpdate = async () => {
      try {
        const res = await ApiInstance.get('/studentRoute/update');
        const data = res.data;
        if (data.length > 0) {
          setHasNewUpdate(true);
        }
      } catch (err) {
        console.log("Error checking update:", err);
      }
    };

    fetchUpdate(); 
  }, []);

  const handlePress = () => {
    setHasNewUpdate(false);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ position: "relative" }}>
      <Icon name="notifications-outline" size={30} color="#fff" />
      {hasNewUpdate && (
        <View
          style={{
            position: "absolute",
            top: 2,
            right: 2,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "red",
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default NotificationIcon;
