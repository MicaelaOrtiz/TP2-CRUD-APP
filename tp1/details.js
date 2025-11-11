import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import MovieCard from './moviecard';
import { API_KEY } from '@env';
import { LinearGradient } from 'expo-linear-gradient'; 

const MOVIES = [597];

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const results = await Promise.all(
        MOVIES.map(async id => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`
          );
          return await res.json();
        })
      );
      setMovies(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchMovies();
}, []);

  const gradientColors = ['#202020', '#101010', '#000000']; 

  if (loading) {
    return (
      <View style={styles.loadingContainer}> 
        <ActivityIndicator 
          size="large" 
          color="#ffffff"
        />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Detail', { movieId: item.id })}
          />
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center',
    backgroundColor: '#000000'
  }
});