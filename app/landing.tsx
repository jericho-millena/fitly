import React, { useEffect } from "react";
import { Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  FadeInUp,
  Easing,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const tickerText = "STYLE SIMPLIFIED. CONFIDENCE AMPLIFIED. FITLY.";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   router.replace("/home"); // Change to your target route
    // }, 3000);
    // return () => clearTimeout(timeout);
  }, []);

  const xLeft = useSharedValue(0);
  const xRight = useSharedValue(-width);

  useEffect(() => {
    const duration = 10000;

    xLeft.value = withRepeat(
      withTiming(-width, { duration, easing: Easing.linear }),
      -1,
      false
    );

    xRight.value = withRepeat(
      withTiming(0, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const tickerStyle = (sv: typeof xLeft) =>
    useAnimatedStyle(() => ({ transform: [{ translateX: sv.value }] }));

  const renderTicker = (pos: "top" | "bottom", offset: number, style: any) => (
    <View
      style={{
        position: "absolute",
        [pos]: offset,
        width,
        overflow: "hidden",
        height: 20,
      }}
    >
      <Animated.View
        style={[{ flexDirection: "row", width: width * 2 }, style]}
      >
        <Text style={tickerTextStyle}>{tickerText.repeat(50)}</Text>
      </Animated.View>
    </View>
  );

  const tickerTextStyle = {
    color: "white",
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "400" as const,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#031449",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View entering={FadeInUp.duration(800)}>
        <Text
          style={{
            fontSize: 90,
            color: "#F6D13A",
            fontFamily: "PTSerif-Bold",
            textAlign: "center",
          }}
        >
          Fitly
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200).duration(1000)}>
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            marginTop: 4,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          STYLE SIMPLIFIED
        </Text>
      </Animated.View>

      {renderTicker("top", 30, tickerStyle(xLeft))}
      {renderTicker("top", 55, tickerStyle(xRight))}
      {renderTicker("bottom", 55, tickerStyle(xLeft))}
      {renderTicker("bottom", 30, tickerStyle(xRight))}
    </SafeAreaView>
  );
}
