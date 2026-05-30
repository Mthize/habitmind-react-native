import { type Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { HOME } from "@/constants/routes";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function OnboardingInsightsRoute() {
  const router = useRouter();
  const { setHasCompletedOnboarding } = useOnboardingStore();

  const handleEnterHabitMind = () => {
    setHasCompletedOnboarding(true);
    router.replace(HOME as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.copyBlock}>
            <Text style={styles.title}>Get insights that adapt to you</Text>
            <Text style={styles.subtitle}>
              HabitMind learns from your check-ins and helps you understand what supports your
              progress.
            </Text>
          </View>

          <View style={styles.noteCard}>
            <Text style={styles.note}>AI-powered insights will be available with a paid plan.</Text>
          </View>

          <View style={styles.previewCard}>
            <Text style={styles.previewTitle}>Insight preview</Text>

            <View style={styles.previewList}>
              {[
                "Weekly habit patterns",
                "Mood and routine connections",
                "Personalized AI suggestions",
              ].map((item) => (
                <View key={item} style={styles.previewItem}>
                  <Text style={styles.previewBullet}>•</Text>
                  <Text style={styles.previewItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={handleEnterHabitMind}>
          <Text style={styles.primaryButtonText}>Enter HabitMind</Text>
        </Pressable>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
    justifyContent: "space-between",
  },
  topSection: {
    marginTop: 24,
  },
  copyBlock: {
    alignItems: "center",
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 14,
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  noteCard: {
    marginTop: 20,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: "#F3F3F0",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  note: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  previewCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E3E0",
    borderRadius: 28,
    padding: 22,
    marginTop: 40,
  },
  previewTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
  },
  previewList: {
    marginTop: 18,
    gap: 14,
  },
  previewItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewBullet: {
    width: 18,
    color: colors.text,
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "700",
  },
  previewItemText: {
    flex: 1,
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "600",
  },
  primaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
});
