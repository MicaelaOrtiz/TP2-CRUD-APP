import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { verifyCredentials } from '../service/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async () => {
    if (!username || !password) { Alert.alert('Error', 'Completá usuario y contraseña'); return; }
    try {
      const user = await verifyCredentials(username, password);
      if (!user) {
        Alert.alert('Error', 'Credenciales inválidas');
        return;
      }
      await AsyncStorage.setItem('@session_user', JSON.stringify(user));

      if (onLoginSuccess) onLoginSuccess(user);
      if (user.role === 'admin') navigation.replace('AdminUsers');
      else navigation.replace('MoviesHome');
    } catch (err) {
      console.error('login err', err);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput placeholder="Usuario" value={username} onChangeText={setUsername} style={styles.input} placeholderTextColor="#ccc" />
      <TextInput placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} placeholderTextColor="#ccc" />
      <Button title="Ingresar" onPress={doLogin} color="#4A90E2" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex:1, 
    padding:20, 
    justifyContent:'center', 
    backgroundColor:'#000' },

  title: { 
    color:'#fff', 
    fontSize:20, 
    marginBottom:12, 
    textAlign:'center' },

  input: { 
    backgroundColor:'#222', 
    color:'#fff', 
    padding:10, 
    marginBottom:10, 
    borderRadius:6 }
});
