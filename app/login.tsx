import styles from "@/assets/styles";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View, Platform  } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import React from "react";
export default function LoginScreen() {
  async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log("not granted")
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
         console.log("Project ID not found")
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(pushTokenString);
        return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
  }
  React.useEffect(() => {
    registerForPushNotificationsAsync()
  } ,[])
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State to hold error message

  const validateEmail = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleNextPress = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear error if email is valid
      router.push({
        pathname:"/scan-qr",
        params:{email:email}
      })
      // Proceed to next action (e.g., navigate to next screen)
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100 }}>
        <Text style={styles.textHeader}>Welcome back to DevSync 👋</Text>
        <Text style={styles.sloganText}>Track Your Team, Master Your Work</Text>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          keyboardType="email-address"
          contentStyle={styles.input}
          outlineColor={Colors.dark.secondary}
          value={email}
          theme={{
            colors: {
              placeholder: "red",
            },
          }}
          onChangeText={(text) => setEmail(text)}
        />
        {emailError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{emailError}</Text> // Display error message
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="arrow-right-thick"
          mode="contained"
          onPress={handleNextPress}
        >
          Next
        </Button>
      </View>
    </View>
  );
}
