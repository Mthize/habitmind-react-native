import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

import IllustrationCard from "@/components/ui/IllustrationCard";
import { minimalVerificationCodeEmail } from "@/constants/assets";
import { colors } from "@/constants/colors";

export default function VerificationCodeRoute() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <IllustrationCard source={minimalVerificationCodeEmail} backgroundColor={colors.card} />

        <View style={styles.copyBlock}>
          <Text style={styles.title}>Verification Code</Text>
          <Text style={styles.subtitle}>Enter the code we sent to your email.</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter code"
            placeholderTextColor="#8A8A8A"
            keyboardType="number-pad"
          />

          <Pressable
            style={styles.primaryButton}
            onPress={() => Alert.alert("Next step coming soon.")}
          >
            <Text style={styles.primaryButtonText}>Verify code</Text>
          </Pressable>
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
    paddingTop: 24,
    paddingBottom: 28,
  },
  copyBlock: {
    marginTop: 24,
  },
  title: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 10,
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  formCard: {
    marginTop: 28,
    backgroundColor: colors.card,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  input: {
    marginTop: 10,
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    color: colors.text,
  },
  primaryButton: {
    marginTop: 18,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
});
