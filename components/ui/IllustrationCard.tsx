import { Image, type ImageSourcePropType, StyleSheet, View } from "react-native";

type IllustrationCardProps = {
  source: ImageSourcePropType;
  height?: number;
  backgroundColor?: string;
};

export default function IllustrationCard({
  source,
  height = 260,
  backgroundColor = "#FFFFFF",
}: IllustrationCardProps) {
  return (
    <View style={[styles.illustrationCard, { height, backgroundColor }]}>
      <Image source={source} style={styles.illustrationImage} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  illustrationCard: {
    width: "100%",
    borderRadius: 32,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E3E0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  illustrationImage: {
    width: "92%",
    height: "92%",
    backgroundColor: "transparent",
  },
});
