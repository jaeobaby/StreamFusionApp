import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, Image,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/tmdb';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
      const response = await axios.get(url);
      setResults(response.data.results);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', {
        id: item.id,
        type: item.media_type || 'movie',
      })}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : 'https://via.placeholder.com/120x180.png?text=No+Image',
        }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title || item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search movies & shows..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00FFFF" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={3}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#00FFFF', fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
  },
  card: { flex: 1, margin: 5, alignItems: 'center' },
  poster: { width: 100, height: 150, borderRadius: 8, backgroundColor: '#222' },
  title: { color: '#fff', marginTop: 5, fontSize: 12, textAlign: 'center' },
});
