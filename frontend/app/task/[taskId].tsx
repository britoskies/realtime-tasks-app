import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "@/services/api";

export default function TaskDetailScreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();
  const [task, setTask] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      console.log(taskId);
      const res = await api.get(`/tasks/${Number(taskId)}`);
      setTask(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    } catch (err) {
      console.error("Error al obtener la tarea:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    try {
      const res = await api.patch(`/tasks/${taskId}`, {
        title,
        description,
      });
      setTask(res.data);
      router.push(`../tasks/${task.listId}`);
      Alert.alert("Tarea actualizada");
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  const toggleDone = async () => {
    try {
      const res = await api.patch(`/tasks/${taskId}`, {
        isDone: !task.isDone,
      });
      setTask(res.data);
    } catch (err) {
      console.error("Error al cambiar estado:", err);
    }
  };

  const deleteTask = async () => {
    Alert.alert("¿Eliminar tarea?", "Esta acción no se puede deshacer", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar", 
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/tasks/${taskId}`);
            Alert.alert("Tarea eliminada");
            router.replace(`../tasks/${task.listId}`);
          } catch (err) {
            console.error("Error al eliminar:", err);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  if (!task) return <Text style={styles.center}>No se encontró la tarea</Text>;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
        Detalles de la tarea
      </Text>

      <Text style={[styles.label, { color: isDark ? "#ccc" : "#333" }]}>
        Lista:
      </Text>
      <Text style={[styles.value, { marginBottom: 8 }]}>
        {task.list?.title ?? "Sin nombre"}
      </Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
            color: isDark ? "#fff" : "#000",
          },
        ]}
        placeholderTextColor={isDark ? "#aaa" : "#666"}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
            color: isDark ? "#fff" : "#000",
            height: 80,
          },
        ]}
        placeholderTextColor={isDark ? "#aaa" : "#666"}
      />

      <Button title="Guardar cambios" onPress={updateTask} />
      <View style={{ height: 10 }} />
      <Button
        title={task.isDone ? "Marcar como pendiente" : "Marcar como completada"}
        onPress={toggleDone}
      />
      <View style={{ height: 10 }} />
      <Button title="Eliminar tarea" color="red" onPress={deleteTask} />

      <View style={{ height: 20 }} />
      <Button
        title="⬅️ Volver a la lista"
        onPress={() => router.push(`../tasks/${task.listId}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  label: { fontWeight: "600", marginTop: 12 },
  value: { fontSize: 16 },
  input: {
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
