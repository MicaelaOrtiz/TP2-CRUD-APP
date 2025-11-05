import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { initDatabase, getItems, deleteItem } from '../Database'; 
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const PRIMARY_COLOR = '#97abc0ff'; 

const ItemCard = ({ item, onEdit, onDelete }) => (
  <View style={cardStyles.card}>
    <View style={cardStyles.header}>
        <Text style={cardStyles.title}>{item.nombre}</Text>
        <Text style={cardStyles.quantity}>Cant: {item.cantidad}</Text>
    </View>
    <Text style={cardStyles.details}>{item.descripcion || 'Sin descripción'}</Text>
    
    <View style={cardStyles.actions}>
      <TouchableOpacity 
        style={[cardStyles.actionButton, cardStyles.editButton]} 
        onPress={() => onEdit(item)}
      >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={cardStyles.actionText}>Editar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[cardStyles.actionButton, cardStyles.deleteButton]} 
        onPress={() => onDelete(item)}
      >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={cardStyles.actionText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    navigation.setOptions({
        title: 'Inventario (TP2 CRUD)',
        headerTintColor: '#fff', 
        headerStyle: { 
            backgroundColor: PRIMARY_COLOR, 
            shadowOpacity: 0, 
            elevation: 0, 
        },
        headerRight: () => (
            <TouchableOpacity 
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate('Formulario')}>
                <Ionicons name="add-circle" size={32} color="#fff" />
            </TouchableOpacity>
        ),
    });
    initDatabase()
      .then(() => { setDbInitialized(true); })
      .catch((err) => { console.error('Error al inicializar la DB:', err); });
  }, [navigation]);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error('Error al cargar items:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (dbInitialized) {
        loadItems();
      }
    }, [dbInitialized])
  );
  
  const handleEdit = (item) => {
    navigation.navigate('Formulario', { itemToEdit: item });
  };
  
  const handleDelete = (item) => {
    Alert.alert(
      "Confirmar Eliminación",
      `¿Estás seguro de que quieres eliminar "${item.nombre}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sí, Eliminar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteItem(item.id); 
              Alert.alert('Eliminado', 'Registro eliminado correctamente.');
              loadItems(); 
            } catch (error) {
              console.error('Error al eliminar:', error);
              Alert.alert('Error', 'No se pudo eliminar el registro.');
            }
          } 
        } 
      ]
    );
  };


  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
            <Ionicons name="list-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>No hay registros guardados.</Text>
            <Text style={styles.emptyTextSmall}>Pulsa '+' arriba para crear uno.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCard 
              item={item} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  listContent: {
      padding: 10,
  },
  emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 100,
  },
  emptyText: { textAlign: 'center', marginTop: 15, fontSize: 18, color: '#999', fontWeight: 'bold' },
  emptyTextSmall: { textAlign: 'center', marginTop: 5, fontSize: 14, color: '#bbb' },
});

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    borderLeftWidth: 5,
    borderLeftColor: PRIMARY_COLOR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: PRIMARY_COLOR,
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  deleteButton: {
    backgroundColor: '#FF3B30', 
  },
  actionText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 5,
  }
});

export default ListScreen;