import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function MovieCard({ movie, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={
          movie.poster_path
            ? { uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }
            : require('../assets/placeholder.png')
        }
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.overview}>{movie.overview.substring(0, 80)}...</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', 
    marginBottom: 15, 
    backgroundColor: '#333333', 
    borderRadius: 10, 
    overflow: 'hidden' },
  image: { width: 100, 
    height: 150 },
  info: { flex: 1, 
    padding: 10 },
  title: { fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5,
    color: 'white' },
  overview: { fontSize: 14, 
    color: '#ccc' },
});