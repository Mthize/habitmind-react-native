import {
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AuthButtonProps = {
  label: string;
  iconText?: string;
  iconImage?: ImageSourcePropType;
  variant?: "primary" | "secondary";
  onPress: () => void;
  disabled?: boolean;
};

export default function AuthButton({
  label,
  iconText,
  iconImage,
  variant = "primary",
  onPress,
  disabled = false,
}: AuthButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.authButton,
        isPrimary ? styles.authButtonPrimary : styles.authButtonSecondary,
        disabled && styles.authButtonDisabled,
      ]}
    >
      <View
        style={[
          styles.authIconCircle,
          isPrimary ? styles.authIconCirclePrimary : styles.authIconCircleSecondary,
        ]}
      >
        {iconImage ? (
          <Image source={iconImage} style={styles.authIconImage} resizeMode="contain" />
        ) : iconText ? (
          <Text
            style={[
              styles.authIconText,
              isPrimary ? styles.authIconTextPrimary : styles.authIconTextSecondary,
            ]}
          >
            {iconText}
          </Text>
        ) : null}
      </View>

      <Text
        style={[
          styles.authButtonLabel,
          isPrimary ? styles.authButtonLabelPrimary : styles.authButtonLabelSecondary,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  authButton: {
    width: "100%",
    minHeight: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    position: "relative",
  },
  authButtonPrimary: {
    backgroundColor: "#111111",
    borderColor: "#111111",
  },
  authButtonSecondary: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E3E3E0",
  },
  authButtonDisabled: {
    opacity: 0.6,
  },
  authIconCircle: {
    position: "absolute",
    left: 16,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  authIconCirclePrimary: {
    backgroundColor: "#FFFFFF",
  },
  authIconCircleSecondary: {
    backgroundColor: "#F7F7F4",
    borderWidth: 1,
    borderColor: "#E3E3E0",
  },
  authIconText: {
    fontSize: 15,
    fontWeight: "800",
  },
  authIconImage: {
    width: 18,
    height: 18,
  },
  authIconTextPrimary: {
    color: "#111111",
  },
  authIconTextSecondary: {
    color: "#111111",
  },
  authButtonLabel: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  authButtonLabelPrimary: {
    color: "#FFFFFF",
  },
  authButtonLabelSecondary: {
    color: "#111111",
  },
});
