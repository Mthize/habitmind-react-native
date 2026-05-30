import { type Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import SelectableCard from "@/components/ui/SelectableCard";
import { colors } from "@/constants/colors";
import { starterHabits } from "@/constants/habits";
import { ONBOARDING_INSIGHTS } from "@/constants/routes";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function OnboardingHabitsRoute() {
  const router = useRouter();
  const { selectedHabits, toggleHabit } = useOnboardingStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.copyBlock}>
          <Text style={styles.title}>Choose the habits you want to improve</Text>
          <Text style={styles.subtitle}>
            Select a few routines you want HabitMind to help you build.
          </Text>
        </View>

        <View style={styles.featureGrid}>
          {starterHabits.map((habit) => (
            <SelectableCard
              key={habit}
              label={habit}
              selected={selectedHabits.includes(habit)}
              onPress={() => toggleHabit(habit)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push(ONBOARDING_INSIGHTS as Href)}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
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
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 28,
  },
  footer: {
    marginTop: "auto",
    paddingTop: 28,
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
