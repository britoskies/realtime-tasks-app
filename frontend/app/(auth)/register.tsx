// src/app/auth/register.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function RegisterScreen() {
  const { register } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(email, password);
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <Text style={[styles.title, isDark && styles.titleDark]}>
        Create Account
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? "#ccc" : "#888"}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={[styles.input, isDark && styles.inputDark]}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={isDark ? "#ccc" : "#888"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, isDark && styles.inputDark]}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={isDark ? "#ccc" : "#888"}
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        style={[styles.input, isDark && styles.inputDark]}
      />

      {error ? (
        <Text style={[styles.error, isDark && styles.errorDark]}>{error}</Text>
      ) : null}

      <Button title="Register" onPress={handleRegister} />

      <TouchableOpacity
        onPress={() => router.replace("/login")}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  containerDark: { backgroundColor: "#121212" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#000",
  },
  titleDark: { color: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputDark: {
    borderColor: "#444",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  error: { color: "red", marginBottom: 8 },
  errorDark: { color: "#ff6b6b" },
  linkContainer: { marginTop: 16, alignItems: "center" },
  linkText: { color: "#1e90ff" },
});
