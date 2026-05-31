import { useAuth, useSSO, useSignUp } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { Link, type Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

import AuthButton from "@/components/ui/AuthButton";
import DividerWithText from "@/components/ui/DividerWithText";
import { ONBOARDING } from "@/constants/routes";

WebBrowser.maybeCompleteAuthSession();

function useWarmUpBrowser() {
  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    void WebBrowser.warmUpAsync();

    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

type SocialStrategy = "oauth_google" | "oauth_apple";

function getErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "errors" in error) {
    const clerkError = error as { errors?: { longMessage?: string; message?: string }[] };
    return clerkError.errors?.[0]?.longMessage ?? clerkError.errors?.[0]?.message;
  }

  return undefined;
}

export default function SignUpRoute() {
  useWarmUpBrowser();

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { startSSOFlow } = useSSO();
  const { signUp, fetchStatus } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [socialStrategy, setSocialStrategy] = useState<SocialStrategy | null>(null);

  const isSubmitting = fetchStatus === "fetching";
  const showCode =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

  const navigateAfterAuth = ({
    session,
    decorateUrl,
  }: {
    session?: { currentTask?: unknown };
    decorateUrl: (url: string) => string;
  }) => {
    if (session?.currentTask) {
      console.log(session.currentTask);
      return;
    }

    const url = decorateUrl(ONBOARDING);
    if (url.startsWith("http")) {
      if (typeof window !== "undefined") {
        window.location.href = url;
        return;
      }

      if (globalThis.navigator?.product === "ReactNative") {
        void Linking.openURL(url);
        return;
      }

      return;
    }

    router.replace(url as Href);
  };

  const handleCreateAccount = async () => {
    const { error } = await signUp.password({ emailAddress, password });

    if (error) {
      console.error("Sign up failed", error);
      Alert.alert("Sign up failed", getErrorMessage(error) ?? "Check your Clerk email settings.");
      return;
    }

    await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    try {
      await signUp.verifications.verifyEmailCode({ code });

      if (signUp.status === "complete") {
        await signUp.finalize({ navigate: navigateAfterAuth });
        return;
      }

      Alert.alert("Verification needed", "Clerk needs one more step to finish sign-up.");
    } catch (error) {
      console.error("Verification failed", error);
      Alert.alert("Verification failed", getErrorMessage(error) ?? "Check the code and try again.");
    }
  };

  const canSubmit = showCode
    ? code.trim().length > 0
    : emailAddress.trim().length > 0 && password.length > 0;

  const handleSocialSignUp = async (strategy: SocialStrategy) => {
    setSocialStrategy(strategy);

    try {
      const { createdSessionId, setActive, signIn, signUp: pendingSignUp } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "habitmind",
          path: "oauth-native-callback",
        }),
      });

      if (createdSessionId && setActive) {
        await setActive({
          session: createdSessionId,
          navigate: navigateAfterAuth,
        });
        return;
      }

      if (pendingSignUp?.status === "missing_requirements" || signIn?.status === "needs_identifier") {
        Alert.alert("Continue sign-up", "Complete the remaining Clerk steps to finish sign-up.");
        return;
      }

      Alert.alert("Sign up incomplete", "Clerk needs one more step to finish this sign-up.");
    } catch (error) {
      console.error("Social sign-up failed", error);
      Alert.alert(
        "Social sign-up unavailable",
        "This sign-up method needs to be enabled in Clerk Dashboard.",
      );
    } finally {
      setSocialStrategy(null);
    }
  };

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>

          <View style={styles.copyBlock}>
            <Text style={styles.title}>
              {showCode ? "Verify your email" : "Create your account"}
            </Text>
            <Text style={styles.subtitle}>
              {showCode
                ? "Enter the code Clerk sent to your inbox."
                : "Start building better routines with a HabitMind account."}
            </Text>
          </View>

          <View style={styles.formCard}>
            {showCode ? (
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Verification code</Text>
                <TextInput
                  style={styles.input}
                  value={code}
                  onChangeText={setCode}
                  placeholder="Enter code"
                  placeholderTextColor="#8A8A8A"
                  keyboardType="number-pad"
                />
              </View>
            ) : (
              <>
                <AuthButton
                  label="Continue with Google"
                  iconImage={require("@/assets/icons/google-mark.png")}
                  variant="secondary"
                  onPress={() => void handleSocialSignUp("oauth_google")}
                  disabled={isSubmitting || socialStrategy !== null}
                />

                <AuthButton
                  label="Continue with Apple"
                  iconImage={require("@/assets/icons/apple-mark.png")}
                  variant="secondary"
                  onPress={() => void handleSocialSignUp("oauth_apple")}
                  disabled={isSubmitting || socialStrategy !== null}
                />

                <DividerWithText text="OR" />

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Email address</Text>
                  <TextInput
                    style={styles.input}
                    value={emailAddress}
                    onChangeText={setEmailAddress}
                    placeholder="you@example.com"
                    placeholderTextColor="#8A8A8A"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputRow}>
                    <TextInput
                      style={styles.inputField}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Create password"
                      placeholderTextColor="#8A8A8A"
                      secureTextEntry={!showPassword}
                      textContentType="newPassword"
                    />
                    <Pressable
                      style={styles.passwordToggle}
                      onPress={() => setShowPassword((current) => !current)}
                    >
                      <Text style={styles.passwordToggleText}>{showPassword ? "Hide" : "Show"}</Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}

            <Pressable
              style={[styles.primaryButton, (!canSubmit || isSubmitting) && styles.disabledButton]}
              onPress={() => void (showCode ? handleVerify() : handleCreateAccount())}
              disabled={!canSubmit || isSubmitting || socialStrategy !== null}
            >
              <Text style={styles.primaryButtonText}>{showCode ? "Verify" : "Sign Up"}</Text>
            </Pressable>

            {showCode ? (
              <Pressable
                style={styles.textButton}
                onPress={() => void signUp.verifications.sendEmailCode()}
              >
                <Text style={styles.textButtonText}>Send a new code</Text>
              </Pressable>
            ) : (
              <View style={styles.linkRow}>
                <Text style={styles.linkText}>Already have an account?</Text>
                <Link href={"/(auth)/sign-in" as Href} asChild>
                  <Pressable>
                    <Text style={styles.linkButtonText}> Sign In</Text>
                  </Pressable>
                </Link>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 28,
  },
  backButton: {
    alignSelf: "flex-start",
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E3E3E0",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "700",
  },
  copyBlock: {
    marginTop: 48,
  },
  title: {
    color: "#111111",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    textAlign: "left",
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 28,
    color: "#6B6B6B",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "left",
    maxWidth: "100%",
  },
  formCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E3E3E0",
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 0,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    marginBottom: 10,
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E3E0",
    backgroundColor: "#FAFAF8",
    paddingHorizontal: 18,
    color: "#111111",
    fontSize: 16,
  },
  inputRow: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E3E0",
    backgroundColor: "#FAFAF8",
    paddingLeft: 18,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    height: "100%",
    color: "#111111",
    fontSize: 16,
  },
  passwordToggle: {
    minWidth: 52,
    height: 38,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordToggleText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "700",
  },
  primaryButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#A3A3A3",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  textButton: {
    marginTop: 14,
    alignItems: "center",
    paddingVertical: 8,
  },
  textButtonText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "700",
  },
  linkRow: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    color: "#6B6B6B",
    fontSize: 14,
  },
  linkButtonText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "800",
  },
});
