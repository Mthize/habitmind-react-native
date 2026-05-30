import { Image, type ImageSourcePropType, StyleSheet, View } from "react-native";

type IllustrationCardProps = {
  source: ImageSourcePropType;
  height?: number;
  backgroundColor?: string;
  variant?: "card" | "circle";
  size?: number;
  imageScale?: number;
};

export default function IllustrationCard({
  source,
  height = 300,
  backgroundColor = "#FFFFFF",
  variant = "card",
  size = 280,
  imageScale = 0.92,
}: IllustrationCardProps) {
  const isCircle = variant === "circle";

  return (
    <View
      style={[
        styles.base,
        isCircle ? styles.illustrationCircle : styles.illustrationCard,
        isCircle
          ? {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor,
            }
          : { height, backgroundColor },
      ]}
    >
      <Image
        source={source}
        style={[
          styles.illustrationImage,
          {
            width: `${imageScale * 100}%`,
            height: `${imageScale * 100}%`,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: "#E3E3E0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    alignSelf: "center",
  },
  illustrationCard: {
    width: "100%",
    borderRadius: 32,
    shadowColor: "#111111",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  illustrationCircle: {},
  illustrationImage: {
    backgroundColor: "transparent",
  },
});
