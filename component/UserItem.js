import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function UserItem({ user, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.editBtn,
            pressed && styles.btnPressed, 
          ]}
          onPress={onEdit}
        >
          <Text style={styles.btnText}></Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.deleteBtn,
            pressed && styles.btnPressed,
          ]}
          onPress={onDelete}
        >
          <Text style={styles.btnText}>🗑️</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#222",
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  email: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 3,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editBtn: {
    backgroundColor: "#4A90E2",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 5,
  },
  deleteBtn: {
    backgroundColor: "#E74C3C",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
});

