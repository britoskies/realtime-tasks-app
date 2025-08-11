import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import api from "@/services/api";
import { io, Socket } from "socket.io-client";
import { Api } from "@/constants/Api";

const socket: Socket = io(`${Api.baseUrl}:${Api.port}`);

export default function TaskListScreen() {
  const { listId } = useLocalSearchParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/list/${listId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!title || !description) return;

    try {
      await api.post("/tasks/create", {
        title,
        description,
        listId,
      });

      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const toggleTask = async (task: any) => {
    try {
      await api.patch(`/tasks/${task.id}`, {
        isDone: !task.isDone,
      });
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();

    socket.on("taskCreated", (task) => {
      if (task.listId === listId) {
        setTasks((prev) => [...prev, task]);
      }
    });

    socket.on("taskUpdated", (updatedTask) => {
      if (updatedTask.listId === listId) {
        setTasks((prev) =>
          prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      }
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, [listId]);

  if (loading) return <Text>Cargando tareas...</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`../task/${item.id}`)}
            style={{
              padding: 12,
              marginBottom: 10,
              backgroundColor: item.isDone ? "#90ee90" : "#f5f5f5",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                textDecorationLine: item.isDone ? "line-through" : "none",
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ marginTop: 16 }}>
        <TextInput
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          style={{
            backgroundColor: "#eee",
            padding: 10,
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <TextInput
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          style={{
            backgroundColor: "#eee",
            padding: 10,
            borderRadius: 4,
            marginBottom: 8,
          }}
        />
        <Button title="Crear tarea" onPress={createTask} />
      </View>
    </View>
  );
}
