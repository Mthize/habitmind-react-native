import { type Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import IllustrationCard from "@/components/ui/IllustrationCard";
import { sereneMeditation } from "@/constants/assets";
import { colors } from "@/constants/colors";
import { ONBOARDING, SIGN_IN } from "@/constants/routes";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function WelcomeRoute() {
  const router = useRouter();
  const { setHasSeenWelcome } = useOnboardingStore();

  const handleReadyPress = () => {
    setHasSeenWelcome(true);
    router.push(ONBOARDING as Href);
  };

  const handleSignInPress = () => {
    setHasSeenWelcome(true);
    router.push(SIGN_IN as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBlock}>
          <IllustrationCard
            source={sereneMeditation}
            variant="circle"
            size={280}
            imageScale={1.05}
            backgroundColor={colors.background}
          />

          <Text style={styles.title}>Welcome to HabitMind</Text>
          <Text style={styles.subtitle}>
            Track your habits, understand your mood, and build routines that actually fit your
            life.
          </Text>
        </View>

        <View style={styles.bottomBlock}>
          <Pressable style={styles.primaryButton} onPress={handleReadyPress}>
            <Text style={styles.primaryButtonText}>I&apos;m Ready</Text>
          </Pressable>

          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <Pressable onPress={handleSignInPress} hitSlop={8}>
              <Text style={styles.signInLink}> Sign In</Text>
            </Pressable>
          </View>
        </View>
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
    paddingTop: 28,
    paddingBottom: 28,
    justifyContent: "space-between",
  },
  topBlock: {
    alignItems: "center",
  },
  title: {
    marginTop: 40,
    color: colors.text,
    fontSize: 38,
    lineHeight: 44,
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
  bottomBlock: {
    paddingTop: 32,
  },
  primaryButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 2,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  signInRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signInText: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  signInLink: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800",
  },
});
