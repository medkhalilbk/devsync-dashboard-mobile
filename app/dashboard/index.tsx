import { colors } from "@/assets/styles";
import { GET } from "@/requests";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  BarChart,
  ContributionGraph,
  ProgressChart,
} from "react-native-chart-kit";
import { ContributionChartValue } from "react-native-chart-kit/dist/contribution-graph/ContributionGraph";
import { Card, IconButton, List, Button } from "react-native-paper";
import { RectProps } from "react-native-svg";

export default function DashboardPage() {
  const [projects, setProjects] = React.useState([]);
  const [data, setData] = React.useState({
    totalPushes: 0,
    totalPulls: 0,
    totalContributions: 0,
  });
  const [pullChartData, setPullChartData] = React.useState({
    labels: ["Loading..."],
    datasets: [{ data: [0] }],
  });
  const [pushChartData, setPushChartData] = React.useState({
    labels: ["Loading..."],
    datasets: [{ data: [0] }],
  });
  const [commitsData, setCommitsData] = React.useState([]);

  const quickStats = [
    {
      title: "Total Pushes",
      value: data.totalPushes,
      icon: "code-tags",
      color: "#4CAF50",
    },
    {
      title: "Total Pulls",
      value: data.totalPulls,
      icon: "source-branch",
      color: "#2196F3",
    },
    {
      title: "Total Contributions",
      value: data.totalContributions,
      icon: "source-commit",
      color: "#FFC107",
    },
  ];

  const [recentActivities, setRecentActivities] = React.useState([
    {
      id: 1,
      title: "Project One",
      description: "Project Alpha - 2h ago",
      icon: "github",
    },
    {
      id: 2,
      title: "Project Two",
      description: "Project Beta - 4h ago",
      icon: "github",
    },
  ]);

  React.useEffect(() => {
    GET("/charts")
      .then((res) => {
        setData(res.data?.pushPullTotalContribution);
        setPushChartData(res.data?.pushChartData);
        setPullChartData(res.data?.pullChartData);
        setCommitsData(res.data?.commitsData);
        let project = {
          id: res.data?.project?.id,
          title: res.data?.project?.projectName,
          description: res.data?.project?.projectDescription,
        };
        setRecentActivities((prev) => [...prev, project]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <IconButton
          icon="account-edit"
          size={24}
          iconColor={colors.secondary}
          onPress={() => {
            router.push({
              pathname: "/dashboard/settings",
            });
          }}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
      >
        {quickStats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <IconButton
                icon={stat.icon}
                size={30}
                iconColor={stat.color}
                style={{ backgroundColor: `${stat.color}20` }}
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Progress Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Push/Pull Graph</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          minWidth: Dimensions.get("window").width,
          height: 150,
        }}
      >
        <View
          style={{
            minWidth: Dimensions.get("window").width,
            height: "auto",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            Push Chart
          </Text>
          <BarChart
            data={pushChartData}
            width={Dimensions.get("window").width * 0.9}
            height={180}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              barPercentage: 0.9,
              propsForLabels: {
                fontSize: 10,
              },
              decimalPlaces: 0,
              paddingTop: 10,
            }}
            showValuesOnTopOfBars
            fromZero
            style={{
              marginVertical: 8,
              paddingBottom: 20,
              height: 500,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            minWidth: Dimensions.get("window").width,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 20,
            }}
          >
            Pull Chart
          </Text>
          <BarChart
            data={pullChartData}
            width={Dimensions.get("window").width * 0.9}
            height={180}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              barPercentage: 0.9,
              propsForLabels: {
                fontSize: 10,
              },
              decimalPlaces: 0,
              paddingTop: 10,
            }}
            showValuesOnTopOfBars
            fromZero
            style={{
              marginVertical: 8,
              paddingBottom: 20,
              height: 500,
            }}
          />
        </View>
      </ScrollView>

      {/* Recent Activity */}

      <View style={styles.activityContainer}>
        <View>
          <Text style={styles.sectionTitle}>Global Contributions</Text>
          <ScrollView horizontal>
          <ContributionGraph
            values={commitsData}
            endDate={new Date(Date.now())}
            numDays={105}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              backgroundColor: colors.background,
              backgroundGradientFrom: colors.background,
              backgroundGradientTo: colors.background,
              color: (opacity = 1) => `rgba(70, 130, 180, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              barPercentage: 0.9,
              propsForLabels: {
                fontSize: 10,
              },
              decimalPlaces: 0,
              paddingTop: 10,
            }}
            fromZero
            style={{
              marginVertical: 8,
              paddingBottom: 20, 
            }}
          />
          </ScrollView>
        </View>
        <Text style={styles.sectionTitle}>Projects in Progres</Text>
        <Card style={styles.activityCard}>
          {recentActivities.map((activity, index) => (
            <TouchableOpacity onPress={() => {
              if(activity.id){
                router.push(`/dashboard/project/${activity.id}`)
              } 
            }} key={index}>
              <List.Item
                key={index}
                title={() => (
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                )}
                description={() => (
                  <Text style={styles.activityDescription}>
                    {activity.description}
                  </Text>
                )}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={recentActivities[0].icon}
                    color={colors.secondary}
                    style={styles.activityIcon}
                  />
                )}
                style={[
                  styles.activityItem,
                  index === recentActivities.length - 1 &&
                    styles.lastActivityItem,
                ]}
              />
            </TouchableOpacity>
          ))}
        </Card>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },
  dateText: {
    fontSize: 14,
    color: colors.text + "80",
    marginTop: 4,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: 140,
    marginRight: 12,
    elevation: 2,
  },
  statContent: {
    alignItems: "center",
    padding: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 8,
  },
  statTitle: {
    fontSize: 12,
    color: colors.text + "80",
    marginTop: 4,
  },
  chartContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
  },
  activityContainer: {
    padding: 20,
  },
  activityCard: {
    backgroundColor: colors.card || "#ffffff",
    elevation: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  activityItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border || "#e0e0e0",
    backgroundColor: colors.card || "#ffffff",
    paddingVertical: 8,
  },
  lastActivityItem: {
    borderBottomWidth: 0,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: colors.text + "CC",
  },
  activityIcon: {
    backgroundColor: colors.primary + "15",
    borderRadius: 8,
    margin: 8,
    marginLeft: 15,
  },
  actionContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  actionButton: {
    borderRadius: 8,
  },
});
