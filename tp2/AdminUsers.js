import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, Alert, StyleSheet } from 'react-native';
import { listUsers, deleteUser } from '../db';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function AdminUsers({ navigation }) {
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => { if (isFocused) load(); }, [isFocused]);

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
      { text: 'Eliminar', style:'destructive', onPress: async () => {
        await deleteUser(id);
        Alert.alert('Éxito', 'Usuario eliminado correctamente');
        load();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="➕ Nuevo usuario" onPress={() => navigation.navigate('UserForm')} color="#4A90E2" />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.small}>{item.username} • {item.role}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="✏️" onPress={() => navigation.navigate('UserForm', { user: item })} />
              <Button title="🗑️" color="#E74C3C" onPress={() => confirmDelete(item.id)} />
            </View>
          </View>
        )}
      />
      <View style={{height:20}}/>
      <Button title="Cerrar sesión" color="#777" onPress={async () => { await AsyncStorage.removeItem('@session_user'); navigation.replace('Login'); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,padding:20, 
    backgroundColor:'#000'},

  row:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    padding:12, 
    backgroundColor:'#222', 
    marginTop:10, 
    borderRadius:8},

  name:{
    color:'#fff', 
    fontWeight:'600'},

  small:{
    color:'#ccc', 
    fontSize:12},

  actions:{
    flexDirection:'row', 
    gap:8}
});
