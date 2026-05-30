import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BarChart3, Home, Sparkles, User } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabVisual = {
  label: string;
  icon: typeof Home;
};

const TAB_VISUALS: Record<string, TabVisual> = {
  home: {
    label: "Home",
    icon: Home,
  },
  dashboard: {
    label: "Dashboard",
    icon: BarChart3,
  },
  insights: {
    label: "Insights",
    icon: Sparkles,
  },
  profile: {
    label: "Profile",
    icon: User,
  },
};

export default function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { bottom: Math.max(28, insets.bottom + 12) }]}>
      <View style={styles.glassTabBar}>
        <View pointerEvents="none" style={styles.glassInner} />
        <View pointerEvents="none" style={styles.glassHighlight} />

        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const visual = TAB_VISUALS[route.name] ?? TAB_VISUALS.home;
          const Icon = visual.icon;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.tabPillBase,
                  isFocused ? styles.activeTabPill : styles.inactiveTabPill,
                ]}
              >
                {isFocused ? <View pointerEvents="none" style={styles.activeTabInner} /> : null}
                <Icon
                  size={22}
                  strokeWidth={2.2}
                  color={isFocused ? "#111111" : "#777777"}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isFocused ? styles.activeTabLabel : styles.inactiveTabLabel,
                  ]}
                >
                  {visual.label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 36,
    right: 36,
  },
  glassTabBar: {
    position: "relative",
    height: 76,
    borderRadius: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.68)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.95)",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
    overflow: "hidden",
  },
  glassInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: "rgba(227,227,224,0.75)",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  glassHighlight: {
    position: "absolute",
    top: 6,
    left: 14,
    right: 14,
    height: 28,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.20)",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  tabPillBase: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  activeTabPill: {
    minWidth: 84,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderWidth: 1,
    borderColor: "rgba(17,17,17,0.10)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
  activeTabInner: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.72)",
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  inactiveTabPill: {
    minWidth: 70,
    height: 58,
    borderRadius: 29,
    backgroundColor: "transparent",
  },
  tabLabel: {
    fontSize: 12,
  },
  activeTabLabel: {
    color: "#111111",
    fontWeight: "700",
  },
  inactiveTabLabel: {
    color: "#777777",
    fontWeight: "600",
  },
});
