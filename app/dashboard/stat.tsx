import { View, Text, ScrollView, Dimensions } from "react-native";
import { router } from "expo-router";
import { Button, Card, List, Surface } from "react-native-paper";
import styles, { colors } from "../../assets/styles";

export default function StatPage() {
  const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={{
      backgroundColor: colors.background
    }}>
      <View>
        <Text style={[styles.title, { color: colors.secondary, textAlign: "left", marginLeft: 50 }]}>
          Push/Pull Charts 📈
        </Text>
        
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View style={{
            backgroundColor: "red",
            height: 250,
            width: windowWidth * 0.9,
            marginRight: 16,
            borderRadius: 10,
          }} />
          <View style={{
            backgroundColor: "blue",
            height: 250,
            width: windowWidth * 0.9,
            marginRight: 16,
            borderRadius: 10,
          }} />
          <View style={{
            backgroundColor: "white",
            height: 250,
            width: windowWidth * 0.9,
            marginRight: 16,
            borderRadius: 10,
          }} />
        </ScrollView>

        <View style={{marginTop:60, height: 200,alignSelf:"center", width: windowWidth * 0.9, backgroundColor: "green",  borderRadius: 10 }}>
        </View>

        <View style={{marginTop:60, height: 200, width: windowWidth * 0.9, backgroundColor: "green", marginRight: 16, borderRadius: 10 }}></View>
      </View>
    </ScrollView>
  );
}
