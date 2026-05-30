import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

export default function IndexRoute() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>HabitMind</Text>
        <Text style={styles.subtitle}>Starting app...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 8,
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
  },
});
