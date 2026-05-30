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
        <View style={styles.copyBlock}>
          <Text style={styles.title}>Get insights that adapt to you</Text>
          <Text style={styles.subtitle}>
            HabitMind learns from your check-ins and helps you understand what supports your
            progress.
          </Text>
          <Text style={styles.note}>AI-powered insights will be available with a paid plan.</Text>
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
  },
  copyBlock: {
    marginTop: 24,
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
  note: {
    marginTop: 18,
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  primaryButton: {
    marginTop: "auto",
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
