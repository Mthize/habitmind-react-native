import { type Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import IllustrationCard from "@/components/ui/IllustrationCard";
import { minimalEmailSent } from "@/constants/assets";
import { colors } from "@/constants/colors";
import { VERIFICATION_CODE } from "@/constants/routes";
import { useAuthFlowStore } from "@/stores/useAuthFlowStore";

export default function CheckMailRoute() {
  const router = useRouter();
  const { pendingEmail } = useAuthFlowStore();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <IllustrationCard source={minimalEmailSent} backgroundColor={colors.card} />

        <View style={styles.copyBlock}>
          <Text style={styles.title}>Check your mail</Text>
          <Text style={styles.subtitle}>
            We sent a reset link to your email address.
          </Text>
          {pendingEmail ? <Text style={styles.emailText}>{pendingEmail}</Text> : null}
        </View>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.push(VERIFICATION_CODE as Href)}
        >
          <Text style={styles.secondaryButtonText}>Enter code instead</Text>
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
    paddingTop: 24,
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
    marginTop: 10,
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  emailText: {
    marginTop: 10,
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    marginTop: "auto",
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
});
