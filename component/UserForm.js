import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Picker, Text } from 'react-native';
import { createUser, updateUser } from '../service/Database';

export default function UserForm({ route, navigation }) {
  const user = route.params?.user;
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user?.role || 'user');

  const save = async () => {
    if (!nombre || !username) { Alert.alert('Error','Completa nombre y usuario'); return; }
    try {
      if (user) {
        await updateUser({ id: user.id, nombre, username, password: password ? password : null, role });
        Alert.alert('Usuario actualizado');
      } else {
        if (!password) { Alert.alert('Error','Establecé una contraseña para el nuevo usuario'); return; }
        await createUser({ nombre, username, password, role });
        Alert.alert('Usuario creado');
      }
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Error','Ocurrió un problema (¿usuario ya existe?)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user ? 'Editar usuario' : 'Nuevo usuario'}</Text>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder={user ? "Nueva contraseña (opcional)" : "Contraseña"} value={password} secureTextEntry onChangeText={setPassword} style={styles.input} placeholderTextColor="#ccc" />
      <View style={{ marginBottom: 10 }}>
      <Text style={{ color: '#fff', marginBottom: 6 }}>Rol</Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={{ color: '#fff', backgroundColor: '#222' }}
        dropdownIconColor="#fff"
      >
        <Picker.Item label="Estándar" value="standard" />
        <Picker.Item label="Administrador" value="admin" />
      </Picker>
    </View>
      <Button title="Guardar" onPress={save} color="#4A90E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20, 
    backgroundColor:'#000'},

  input:{
    backgroundColor:'#222', 
    color:'#fff', 
    padding:10, 
    borderRadius:6, 
    marginBottom:10},

  title:{
    color:'#fff', 
    fontSize:18, 
    marginBottom:10}
});
