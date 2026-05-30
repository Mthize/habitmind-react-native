import { Pressable, StyleSheet, Text, View } from "react-native";

type SelectableCardProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function SelectableCard({
  label,
  selected,
  onPress,
}: SelectableCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.cardPressed,
      ]}
    >
      {selected ? (
        <View style={styles.checkmarkCircle}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      ) : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    minHeight: 92,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E3E3E0",
    backgroundColor: "#FFFFFF",
    padding: 18,
    justifyContent: "center",
    position: "relative",
  },
  cardSelected: {
    borderColor: "#111111",
  },
  cardPressed: {
    opacity: 0.9,
  },
  label: {
    color: "#111111",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    paddingRight: 20,
  },
  checkmarkCircle: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#111111",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
