import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { createItem, updateItem } from '../Database'; 
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#b4cae0ff';
const BORDER_COLOR = '#D1D1D6'; 

const FormScreen = ({ navigation, route }) => {
  const itemToEdit = route.params?.itemToEdit; 

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidad, setCantidad] = useState('');
  
  useEffect(() => {
    navigation.setOptions({
        title: itemToEdit ? `Editar: ${itemToEdit.nombre}` : 'Nuevo Registro',
        headerTintColor: '#fff',
        headerStyle: { 
            backgroundColor: PRIMARY_COLOR,
        },
    });

    if (itemToEdit) {
      setNombre(itemToEdit.nombre);
      setDescripcion(itemToEdit.descripcion || '');
      setCantidad(itemToEdit.cantidad.toString());
    }
  }, [itemToEdit, navigation]);


  const handleSave = async () => {
    if (!nombre.trim() || !cantidad.trim()) {
      Alert.alert('Error', 'Los campos Nombre y Cantidad son obligatorios.');
      return;
    }
    const cantidadNum = parseInt(cantidad, 10);
    if (isNaN(cantidadNum) || cantidadNum < 0) {
        Alert.alert('Error', 'Cantidad debe ser un número entero positivo.');
        return;
    }

    try {
      if (itemToEdit) {
        await updateItem(itemToEdit.id, nombre.trim(), descripcion.trim(), cantidadNum);
        Alert.alert('✅ Éxito', 'Registro actualizado satisfactoriamente.', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await createItem(nombre.trim(), descripcion.trim(), cantidadNum);
        Alert.alert(' Éxito', 'Registro creado satisfactoriamente.', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
      
    } catch (error) {
      console.error('Error al guardar/actualizar el registro:', error);
      Alert.alert(' Error de BD', 'Ocurrió un error al guardar los datos.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nombre del Artículo</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ej: Laptop Gaming"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={4}
        placeholder="Detalles y características..."
        textAlignVertical="top"
      />

      <Text style={styles.label}>Cantidad en Stock</Text>
      <TextInput
        style={styles.input}
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
        placeholder="Ej: 5"
      />

      <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSave}
      >
          <Text style={styles.saveButtonText}>
              {itemToEdit ? "GUARDAR CAMBIOS" : "CREAR REGISTRO"}
          </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8F8F8' },
  label: { fontSize: 16, marginBottom: 8, marginTop: 15, fontWeight: '700', color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
      minHeight: 100,
      paddingTop: 12,
  },
  saveButton: {
      backgroundColor: PRIMARY_COLOR,
      padding: 15,
      borderRadius: 10,
      marginTop: 40,
      alignItems: 'center',
      shadowColor: PRIMARY_COLOR,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6,
  },
  saveButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
  }
});

export default FormScreen;