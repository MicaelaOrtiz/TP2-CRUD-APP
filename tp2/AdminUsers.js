import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { listUsers, deleteUser } from '../service/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import UserItem from "../component/UserItem";

export default function AdminUsers({ navigation }) {
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => { 
    if (isFocused) load(); 
  }, [isFocused]);

  const load = async () => {
    const all = await listUsers();
    setUsers(all);
  };

  const confirmDelete = async (id) => {
    const meStr = await AsyncStorage.getItem('@session_user');
    const me = meStr ? JSON.parse(meStr) : null;
    if (me && me.id === id) {
      Alert.alert('Atención', 'No podés eliminarte a vos mismo');
      return;
    }
    Alert.alert('Confirmar', 'Eliminar usuario?', [
      { text: 'Cancelar' },
      { 
        text: 'Eliminar', 
        style: 'destructive', 
        onPress: async () => {
          await deleteUser(id);
          Alert.alert('Éxito', 'Usuario eliminado correctamente');
          load();
        } 
      }
    ]);
  }
  
  const handleEdit = (user) => {
    navigation.navigate('UserForm', { user });
  };

  const handleDelete = (id) => {
    confirmDelete(id);
  };

  return (
    <View style={styles.container}>
      <Button 
        title="➕ Nuevo usuario" 
        onPress={() => navigation.navigate('UserForm')} 
        color="#4A90E2" 
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <UserItem
            user={{
              id: item.id,
              name: item.nombre,
              email: `${item.username} • ${item.role}`
            }}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />

      <View style={{ height: 20 }} />

      <Button 
        title="Cerrar sesión" 
        color="#777" 
        onPress={async () => {
          await AsyncStorage.removeItem('@session_user');
          navigation.replace('Login');
        }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    backgroundColor: '#000'
  },
});
