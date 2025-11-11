import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './tp2/List';
import Form from './tp2/Form';
import Login from './tp2/Login';
import AdminUsers from './tp2/AdminUsers';
import UserForm from './tp2/UserForm';
import MoviesHome from './tp1/homescreen'; 
import MovieDetail from './tp1/details';
import { initDb } from 'Database';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Login');
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const boot = async () => {
      try {
        await initDb();
        setDbInitialized(true);
        const s = await AsyncStorage.getItem('@session_user');
        if (s) {
          const user = JSON.parse(s);
          if (user.role === 'admin') setInitialRoute('AdminUsers');
          else setInitialRoute('MoviesHome');
        } else {
          setInitialRoute('Login');
        }
      } catch (err) {
        console.error('init err', err);
      } finally {
        setCheckingSession(false);
      }
    };
    boot();
  }, []);

  if (!dbInitialized || checkingSession) {
    return <Text style={{flex:1, textAlign:'center', textAlignVertical:'center', color:'white', backgroundColor:'#000'}}>Cargando...</Text>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerStyle:{backgroundColor:'#101010'}, headerTintColor:'#fff' }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown:false }} />
        <Stack.Screen name="AdminUsers" component={AdminUsers} options={{ title:'Gestión de Usuarios' }} />
        <Stack.Screen name="UserForm" component={UserForm} options={{ title:'Usuario' }} />
        <Stack.Screen name="MoviesHome" component={MoviesHome} options={{ title:'Películas' }} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} options={{ title:'Detalle' }} />
        <Stack.Screen name="List" component={List} options={{ title:'Lista de Items' }} />
        <Stack.Screen name="Form" component={Form} options={{ title:'Agregar/Editar Item' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
