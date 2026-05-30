import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { type Href, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import AuthButton from "@/components/ui/AuthButton";
import DividerWithText from "@/components/ui/DividerWithText";
import IllustrationCard from "@/components/ui/IllustrationCard";
import { sereneMeditation } from "@/constants/assets";
import { colors } from "@/constants/colors";
import { HOME, SIGN_IN, SIGN_UP } from "@/constants/routes";
import { useAuthFlowStore } from "@/stores/useAuthFlowStore";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

WebBrowser.maybeCompleteAuthSession();

const googleIcon = require("@/assets/icons/google-mark.png");
const appleIcon = require("@/assets/icons/apple-mark.png");

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

export default function WelcomeRoute() {
  useWarmUpBrowser();

  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const { setLastAuthMethod } = useAuthFlowStore();
  const { setHasSeenWelcome } = useOnboardingStore();
  const [activeProvider, setActiveProvider] = useState<"google" | "apple" | null>(null);

  const startOAuth = async (provider: "google" | "apple") => {
    const strategy = provider === "google" ? "oauth_google" : "oauth_apple";
    const providerName = provider === "google" ? "Google" : "Apple";

    setLastAuthMethod(provider);
    setHasSeenWelcome(true);
    setActiveProvider(provider);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri({
          scheme: "habitmind",
          path: "welcome",
        }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace(HOME as Href);
        return;
      }

      Alert.alert(
        "Finish setup",
        `Clerk needs one more step to finish ${providerName} sign-in.`,
      );
    } catch (error) {
      console.log(`${providerName} OAuth error`, error);
      Alert.alert(
        `${providerName} sign-in unavailable`,
        `Please make sure ${providerName} OAuth is enabled in Clerk Dashboard.`,
      );
    } finally {
      setActiveProvider(null);
    }
  };

  const handleEmailPress = () => {
    setLastAuthMethod("email");
    setHasSeenWelcome(true);
    router.push(SIGN_IN as Href);
  };

  const handleSignUpPress = () => {
    setHasSeenWelcome(true);
    router.push(SIGN_UP as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <IllustrationCard source={sereneMeditation} backgroundColor={colors.card} />

        <Text style={styles.title}>Welcome Back!</Text>

        <View style={styles.authSection}>
          <AuthButton
            label="Continue with Google"
            iconImage={googleIcon}
            variant="primary"
            onPress={() => void startOAuth("google")}
            disabled={activeProvider !== null}
          />

          <AuthButton
            label="Continue with Apple"
            iconImage={appleIcon}
            variant="secondary"
            onPress={() => void startOAuth("apple")}
            disabled={activeProvider !== null}
          />

          <DividerWithText text="OR" />

          <AuthButton
            label="Continue with Email"
            iconText="@"
            variant="secondary"
            onPress={handleEmailPress}
            disabled={activeProvider !== null}
          />
        </View>

        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <Pressable onPress={handleSignUpPress}>
              <Text style={styles.footerLink}> Sign Up</Text>
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
    paddingTop: 32,
    paddingBottom: 24,
  },
  title: {
    marginTop: 40,
    marginBottom: 28,
    textAlign: "center",
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "700",
    color: colors.text,
  },
  authSection: {
    width: "100%",
  },
  footer: {
    marginTop: "auto",
    alignItems: "center",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    color: colors.mutedText,
    textAlign: "center",
  },
  footerLink: {
    color: colors.text,
    fontWeight: "800",
  },
});
