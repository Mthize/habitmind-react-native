import { type Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import SelectableCard from "@/components/ui/SelectableCard";
import { colors } from "@/constants/colors";
import { ONBOARDING_HABITS, ONBOARDING_INSIGHTS } from "@/constants/routes";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

const featureGoals = [
  "A smarter way to build better habits",
  "Your personal habit companion",
  "Daily check-ins",
  "Mood insights",
];

export default function OnboardingIntroRoute() {
  const router = useRouter();
  const { selectedGoals, toggleGoal, setHasSeenWelcome } = useOnboardingStore();

  const handleGetStarted = () => {
    setHasSeenWelcome(true);
    router.push(ONBOARDING_HABITS as Href);
  };

  const handleSkip = () => {
    setHasSeenWelcome(true);
    router.push(ONBOARDING_INSIGHTS as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.copyBlock}>
          <Text style={styles.title}>Your Partner is Ready to Improve your Habits</Text>
          <Text style={styles.subtitle}>
            Build better routines with calm guidance, daily check-ins, and habit insights that adapt
            to you.
          </Text>
        </View>

        <View style={styles.featureGrid}>
          {featureGoals.map((goal) => (
            <SelectableCard
              key={goal}
              label={goal}
              selected={selectedGoals.includes(goal)}
              onPress={() => toggleGoal(goal)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>

          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 28,
  },
  copyBlock: {
    alignItems: "center",
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 42,
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
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 28,
    alignItems: "center",
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
  skipButton: {
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  skipButtonText: {
    color: colors.mutedText,
    fontSize: 15,
    fontWeight: "700",
  },
});
