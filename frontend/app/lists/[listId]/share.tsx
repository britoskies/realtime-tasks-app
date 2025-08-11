import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import api from "@/services/api";
import * as Clipboard from "expo-clipboard";

export default function ShareListScreen() {
  const { listId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any>(null);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await api.get(`/lists`);
        const match = res.data.find((l: any) => l.id === listId);
        if (match) setList(match);
        else Alert.alert("No tienes acceso a esta lista");
      } catch (err) {
        console.error("Error al cargar lista:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(list?.shareToken);
    Alert.alert("Copiado", "El token fue copiado al portapapeles");
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!list) {
    return <Text style={{ padding: 20 }}>No se encontró la lista</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compartir lista</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.content}>{list.title}</Text>

      <Text style={styles.label}>Token de acceso:</Text>
      <Text style={styles.content}>{list.shareToken}</Text>

      <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
        <Text style={styles.buttonText}>Copiar token</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "600", marginTop: 12 },
  content: { fontSize: 16, marginBottom: 8 },
  button: {
    marginTop: 20,
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
});
