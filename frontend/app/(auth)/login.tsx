import { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      console.log(err)
      setError("Credenciales inválidas");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Iniciar sesión
      </Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholderTextColor={isDark ? "#ccc" : "#666"}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholderTextColor={isDark ? "#ccc" : "#666"}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.replace("/register")}>
        <Text style={styles.link}>
          ¿No tienes cuenta? <Text style={styles.linkText}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 4,
  },
  error: { color: "red", marginBottom: 8 },
  link: {
    marginTop: 16,
    textAlign: "center",
  },
  linkText: {
    color: "#1e90ff",
    fontWeight: "600",
  },
});
