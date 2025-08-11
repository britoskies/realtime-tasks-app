import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import api from "@/services/api";
import * as Clipboard from "expo-clipboard";

export default function JoinListScreen() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    setToken(text);
  };

  const handleJoin = async () => {
    if (!token) {
      Alert.alert("Error", "Debes ingresar un token");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/lists/join/${token}`);
      Alert.alert("Unido correctamente", "Redirigiendo a la lista...");

      router.replace(`./tasks/${res.data.id}`);
    } catch (err) {
      console.error("Error al unirse:", err);
      Alert.alert("Error", "No se pudo unir a la lista. Verifica el token.");
    } finally {
      setLoading(false);
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
        Unirse a una lista compartida
      </Text>

      <TextInput
        placeholder="Pega el token aquí"
        value={token}
        onChangeText={setToken}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholderTextColor={isDark ? "#aaa" : "#666"}
      />

      <View style={styles.buttons}>
        <Button title="Pegar desde portapapeles" onPress={handlePaste} />
        <Button
          title="Unirse a la lista"
          onPress={handleJoin}
          disabled={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  buttons: {
    gap: 12,
  },
});
