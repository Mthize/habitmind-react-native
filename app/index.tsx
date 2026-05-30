import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { WELCOME } from "@/constants/routes";

const SPLASH_DELAY_MS = 1500;

export default function IndexRoute() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.replace(WELCOME);
    }, SPLASH_DELAY_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [router]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoMark}>
          <Text style={styles.logoCheck}>✓</Text>
        </View>

        <Text style={styles.title}>HabitMind</Text>
        <Text style={styles.subtitle}>
          Build better routines, one mindful day at a time.
        </Text>
        <Text style={styles.loadingText}>Starting your journey...</Text>
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
  logoMark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
  logoCheck: {
    color: colors.text,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "800",
  },
  title: {
    marginTop: 28,
    color: colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 12,
    maxWidth: 280,
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 28,
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
