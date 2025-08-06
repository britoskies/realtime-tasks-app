import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";

interface Task {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
}

export default function TaskListScreen() {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const listId = "20bf4c5b-a19c-43a1-b572-d90d63fe9acb";
        const res = await api.get(`/tasks/list/${listId}`);
        setTasks(res.data);
      } catch (err) {
        setError("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={logout} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={{ color: item.isDone ? "green" : "red" }}>
              {item.isDone ? "Completada" : "Pendiente"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  card: {
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  error: {
    marginTop: 50,
    color: "red",
    textAlign: "center",
  },
});
