import { Colors } from "@/constants/Colors";
import { POST } from "@/requests";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";

export default function ScanQR() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedText, setScannedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const locals = useLocalSearchParams();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  const handleNextPress = () => {
    console.log(locals);
    const email = locals?.email;

    if (email) {
      setLoading(true);
      setError(false);
      POST("/mobile/login", { email: email, password: scannedText })
        .then((res) => {
          setToken(res.data.token);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setLoading(false);
        });
    }
  };

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <View style={{ marginHorizontal: 50 }}>
          <Button
            color={Colors.dark.secondary}
            onPress={requestPermission}
          >
            Grant Permission
          </Button>
        </View>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.dark.secondary} />
          <Text style={styles.message}>Logging in...</Text>
        </View>
      ) : token ? (
        <View style={styles.centered}>
          <Text style={styles.successMessage}>Login succeeded!</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorMessage}>Login failed. Please try again.</Text>
        </View>
      ) : (
        <>
          <View style={{ flexGrow: 0.7, borderRadius: 40 }}>
            <CameraView
              onBarcodeScanned={(data) => {
                setScannedText(data.data);
              }}
              style={styles.camera}
              facing={facing}
            >
              <View style={styles.buttonContainer}></View>
            </CameraView>
          </View>
          <View>
            {scannedText && (
              <View style={{ marginTop: 30, width: "70%", alignSelf: "center" }}>
                <Text style={styles.message}>QR code scanned</Text>
                <Button
                  contentStyle={{ flexDirection: "row-reverse" }}
                  icon="arrow-right-thick"
                  mode="contained"
                  onPress={handleNextPress}
                >
                  Login
                </Button>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: Colors.dark.secondary,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successMessage: {
    textAlign: "center",
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
});
