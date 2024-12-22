import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";
import styles from "../assets/styles";
import { Button } from "react-native-paper";
export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App</Text>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: "#666",
            textAlign: "center",
            marginBottom: 30,
            lineHeight: 24,
          }}
        >
          This is a simple home page where you can navigate to different
          sections of the app.
        </Text>

        <View
          style={{
            gap: 15,
            width: "100%",
            flex: 1,
            maxWidth: 300,
          }}
        > 
          <Button
            contentStyle={{ flexDirection: "row-reverse" }}
            icon="arrow-right-thick"
            mode="contained"
            onPress={() => router.push("/dashboard")}
          >
            Next
          </Button>
        </View>
      </View>
    </View>
  );
}
