import { StyleSheet, Text, View } from "react-native";

export default function DividerWithText({ text = "OR" }: { text?: string }) {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E3E3E0",
  },
  dividerText: {
    marginHorizontal: 18,
    color: "#6B6B6B",
    fontWeight: "700",
  },
});
