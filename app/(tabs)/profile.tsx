import { useClerk } from "@clerk/clerk-expo";
import { type Href, useRouter } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { WELCOME } from "@/constants/routes";

export default function ProfileTabRoute() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace(WELCOME as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <Pressable style={styles.signOutButton} onPress={() => void handleSignOut()}>
          <Text style={styles.signOutText}>Sign Out</Text>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "800",
  },
  signOutButton: {
    marginTop: 24,
    minWidth: 140,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  signOutText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },
});
