import { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { router } from "expo-router";

export default function TaskListOverview() {
  const { token } = useAuth();
  const [lists, setLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLists = async () => {
    try {
      setLoading(true);
      const res = await api.get("/lists");
      setLists(res.data);
    } catch (err) {
      console.error("Error fetching lists:", err);
    } finally {
      setLoading(false);
    }
  };

  const createList = async () => {
    const title = prompt("Nombre de la nueva lista:");
    if (!title) return;

    try {
      const res = await api.post("/lists", { title });
      setLists((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error creando lista:", err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#1e90ff",
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
            }}
            onPress={() => router.push(`./tasks/${item.id}`)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        onPress={createList}
        style={{
          marginTop: 16,
          backgroundColor: "#32cd32",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Crear nueva lista
        </Text>
      </TouchableOpacity>
    </View>
  );
}
