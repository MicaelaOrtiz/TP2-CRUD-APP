import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './Screens/ListScreen';
import FormScreen from './Screens/FormScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lista">
        <Stack.Screen 
          name="Lista" 
          component={ListScreen} 
          options={{ title: 'Inventario CRUD' }} 
        />
        
        <Stack.Screen 
          name="Formulario" 
          component={FormScreen} 
          options={{ title: 'Registro' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;