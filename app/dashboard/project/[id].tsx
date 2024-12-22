import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather'; 
import { BlurView } from 'expo-blur';
import { GET } from '@/requests';
import { useLocalSearchParams } from 'expo-router';

interface ProjectConfig {
  jiraLink: string;
  notionLink: string;
  invoiceLink: string;
  linkedServers: string[];
  specificationSheets: string;
}

interface NotificationConfig {
  comments: boolean;
  newBranch: boolean;
  approvedPR: boolean;
  pushCommits: boolean;
  pullRequests: boolean;
  mergeRequests: boolean;
  githubActionStatus: boolean;
}

interface ProjectData {
  id: number;
  projectName: string;
  projectDescription: string;
  projectLink: string;
  imgUrl: string;
  projectConfig: ProjectConfig;
  notificationConfig: NotificationConfig;
  created_at: string;
  webhookID: number;
}

const { width } = Dimensions.get('window');

function EmptyState() {
  return (
    <View style={styles.emptyContainer}>
      <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContent}>
         <ActivityIndicator size="large" color="#64B5F6" />
        <Text style={styles.emptyTitle}>Project not started yet</Text>
        <Text style={styles.emptyDescription}>
          The project is not started yet
        </Text>
      </Animated.View>
    </View>
  );
}

export default function ProjectDetails() {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id !== "25") {
          setIsLoading(false);
          return;
        }
        const res = await GET("/charts");
        setProject(res.data?.project);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.container}>
         <ActivityIndicator size="large" color="#64B5F6" />
      </View>
    );
  }

  if (!project) {
    return <EmptyState />;
  }

  const handleLinkPress = async (url: string) => {
    if (await Linking.canOpenURL(url)) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1a1b2e', '#2a3a5a', '#1a1b2e']}
        style={styles.gradient}
      >
        <Animated.View entering={FadeInDown.duration(1000)} style={styles.header}>
          <BlurView intensity={80} style={styles.blurContainer}>
            <Image
              source={{ 
                uri: "https://res.cloudinary.com/dfpflbdkq/image/upload/v1732054917/devsync/39-399490_green-power-button-png-removebg-preview_cw60w4.png"
              }}
              style={styles.projectImage}
              resizeMode="contain"
            />
            <View style={styles.headerText}>
              <Text style={styles.projectName}>{project.projectName}</Text>
              <Text style={styles.projectDescription}>{project.projectDescription}</Text>
            </View>
          </BlurView>
        </Animated.View>

        <View style={styles.content}>
          {/* Project Links */}
          <Animated.View entering={FadeInUp.duration(1000).delay(200)} style={styles.card}>
            <Text style={styles.cardTitle}>Project Links</Text>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => handleLinkPress(project.projectLink)}
            >
              <Icon name="github" size={24} color="#64B5F6" />
              <View style={styles.linkText}>
                <Text style={styles.linkTitle}>GitHub Repository</Text>
                <Text style={styles.linkUrl}>{project.projectLink}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Notification Settings */}
          <Animated.View entering={FadeInUp.duration(1000).delay(400)} style={styles.card}>
            <Text style={styles.cardTitle}>Notification Settings</Text>
            <View style={styles.notificationGrid}>
              {Object.entries(project.notificationConfig).map(([key, value]) => (
                <View
                  key={key}
                  style={[
                    styles.notificationItem,
                    value ? styles.enabledNotification : styles.disabledNotification
                  ]}
                >
                  <Text style={styles.notificationText}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Text>
                  <Text style={[styles.notificationStatus, value ? styles.enabledText : styles.disabledText]}>
                    {value ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Project Configuration */}
          <Animated.View entering={FadeInUp.duration(1000).delay(600)} style={styles.card}>
            <Text style={styles.cardTitle}>Project Configuration</Text>
            <View style={styles.configSection}>
              <Text style={styles.configTitle}>Linked Servers</Text>
              {project.projectConfig.linkedServers.map((server, index) => (
                <View key={index} style={styles.serverItem}>
                  <Icon name="server" size={20} color="#64B5F6" />
                  <Text style={styles.serverText}>{server || 'No servers linked'}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Footer Info */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Created: {new Date(project.created_at).toLocaleDateString()}
            </Text>
            <Text style={styles.footerText}>Webhook ID: {project.webhookID}</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b2e',
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  header: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  blurContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  projectImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  projectName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 16,
    color: '#64B5F6',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    marginBottom: 8,
  },
  linkText: {
    marginLeft: 12,
  },
  linkTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  linkUrl: {
    color: '#64B5F6',
    fontSize: 14,
  },
  notificationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  notificationItem: {
    width: (width - 64) / 2,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  enabledNotification: {
    backgroundColor: 'rgba(46, 213, 115, 0.2)',
  },
  disabledNotification: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  notificationText: {
    color: '#fff',
    fontSize: 14,
  },
  notificationStatus: {
    fontSize: 12,
    marginTop: 4,
  },
  enabledText: {
    color: '#2ed573',
  },
  disabledText: {
    color: '#a4b0be',
  },
  configSection: {
    marginBottom: 16,
  },
  configTitle: {
    color: '#64B5F6',
    fontSize: 16,
    marginBottom: 8,
  },
  serverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serverText: {
    color: '#fff',
    marginLeft: 8,
  },
  footer: {
    marginTop: 16,
  },
  footerText: {
    color: '#a4b0be',
    fontSize: 14,
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#1a1b2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    color: '#64B5F6',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 24,
  },
});
