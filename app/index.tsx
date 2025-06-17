import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Use requestAnimationFrame to defer navigation until after layout mount
    const frame = requestAnimationFrame(() => {
      router.replace("/landing");
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
}
