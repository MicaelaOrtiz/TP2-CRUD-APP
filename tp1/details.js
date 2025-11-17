import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { API_KEY } from '@env';
import { LinearGradient } from 'expo-linear-gradient';

export default function MovieDetail({ route, navigation }) {
  const { movieId } = route.params; 
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (!movieId) {
          console.error("No Movie ID provided in route params.");
          return;
        }
        
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`
        );
        const movieData = await res.json();
        
        navigation.setOptions({ title: movieData.title || 'Detalle' });
        
        setMovie(movieData);
        
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId, navigation]);

  const gradientColors = ['#202020', '#101010', '#000000'];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!movie) {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.errorText}>No se encontró la película.</Text>
        </View>
    );
  }
  
  const imageUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : null;

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {imageUrl && (
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
            />
        )}
        
        <Text style={styles.title}>{movie.title}</Text>
        
        <Text style={styles.tagline}>{movie.tagline}</Text>
        
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Puntuación:</Text>
            <Text style={styles.infoValue}>{movie.vote_average.toFixed(1)} / 10</Text>
        </View>
        
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lanzamiento:</Text>
            <Text style={styles.infoValue}>{movie.release_date}</Text>
        </View>
        
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Géneros:</Text>
            <Text style={styles.infoValue}>
                {movie.genres.map(g => g.name).join(', ')}
            </Text>
        </View>
        
        <Text style={styles.overviewHeader}>Sinopsis</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
      padding: 20,
      alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  errorText: {
    color: '#FF4444',
    fontSize: 18,
  },
  image: {
    width: '100%',
    aspectRatio: 2/3,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
    maxWidth: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CCCCCC',
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'right',
    flexShrink: 1,
  },
  overviewHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  overview: {
    fontSize: 16,
    color: '#E0E0E0',
    lineHeight: 24,
    textAlign: 'justify',
  },
});