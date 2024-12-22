import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, Switch, IconButton } from "react-native-paper";
import { colors } from "@/assets/styles";
import { router } from "expo-router";
import { useState } from "react";

export default function SettingsPage() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [locationPermission, setLocationPermission] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton 
          icon="arrow-left" 
          size={24} 
          iconColor={colors.secondary}
          onPress={() => router.back()} 
        />
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.section}>
        <List.Item
          title={() => <Text style={styles.itemTitle}>Language</Text>}
          left={props => <List.Icon {...props} icon="translate" color={colors.secondary} />}
          right={props => <Text style={styles.optionValue}>English</Text>}
          style={styles.listItem}
        />
        <View style={styles.divider} />
        <List.Item
          title={() => <Text style={styles.itemTitle}>Application Theme</Text>}
          left={props => <List.Icon {...props} icon="theme-light-dark" color={colors.secondary} />}
          right={props => <Text style={styles.optionValue}>Light</Text>}
          style={styles.listItem}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <List.Item
          title={() => <Text style={styles.itemTitle}>Push Notifications</Text>}
          left={props => <List.Icon {...props} icon="bell-outline" color={colors.secondary} />}
          right={() => (
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              color={colors.secondary}
            />
          )}
          style={styles.listItem}
        />
        <View style={styles.divider} />
        <List.Item
          title={() => <Text style={styles.itemTitle}>Email Notifications</Text>}
          left={props => <List.Icon {...props} icon="email-outline" color={colors.secondary} />}
          right={() => (
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              color={colors.secondary}
            />
          )}
          style={styles.listItem}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Permissions</Text>
        <List.Item
          title={() => <Text style={styles.itemTitle}>Camera</Text>}
          description={() => (
            <Text style={styles.itemDescription}>
              Needed for stories and on spot posting
            </Text>
          )}
          left={props => <List.Icon {...props} icon="camera" color={colors.secondary} />}
          right={() => (
            <Switch
              value={cameraPermission}
              onValueChange={setCameraPermission}
              color={colors.secondary}
            />
          )}
          style={styles.listItem}
        />
        <View style={styles.divider} />
        <List.Item
          title={() => <Text style={styles.itemTitle}>Location</Text>}
          description={() => (
            <Text style={styles.itemDescription}>
              Needed for location adding in posts
            </Text>
          )}
          left={props => <List.Icon {...props} icon="map-marker" color={colors.secondary} />}
          right={() => (
            <Switch
              value={locationPermission}
              onValueChange={setLocationPermission}
              color={colors.secondary}
            />
          )}
          style={styles.listItem}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    letterSpacing: 0.5,
  },
  section: {
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    marginVertical: 16,
    marginHorizontal: 16,
    letterSpacing: 0.5,
  },
  listItem: {
    paddingVertical: 12,
    backgroundColor: colors.card,
  },
  itemTitle: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 12,
    color: colors.secondary + '99',
    marginTop: 4,
  },
  optionValue: {
    color: colors.secondary,
    marginRight: 8,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.secondary + '15',
    marginHorizontal: 16,
  },
}); 