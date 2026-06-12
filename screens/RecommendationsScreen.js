import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import { getAIRecommendations } from '../utils/recommendationsAPI';

export default function RecommendationsScreen({ navigation }) {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchRecs();
    }, [])
  );

  const fetchRecs = async () => {
    setLoading(true);
    const data = await getAIRecommendations();
    setRecs(data);
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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>For You</Text>
      {recs.length === 0 ? (
        <Text style={styles.empty}>
          Add items to your queue or history to get recommendations.
        </Text>
      ) : (
        <FlatList
          data={recs}
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
  card: { flex: 1, margin: 5, alignItems: 'center' },
  poster: { width: 100, height: 150, borderRadius: 8, backgroundColor: '#222' },
  title: { color: '#fff', marginTop: 5, fontSize: 12, textAlign: 'center' },
  empty: { color: '#888', fontSize: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
