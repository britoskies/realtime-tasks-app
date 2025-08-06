import { Slot, Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function TabsLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Slot />;
}
