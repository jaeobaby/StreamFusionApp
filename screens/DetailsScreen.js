import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/tmdb';
import { addToQueue } from '../utils/queueManager';
import { addToHistory } from '../utils/historyManager';

export default function DetailsScreen({ route }) {
  const { id, type } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`;
      const response = await axios.get(url);
      setDetails(response.data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.loader}>
        <Text style={styles.error}>Failed to load details.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: details.backdrop_path
            ? `https://image.tmdb.org/t/p/w780${details.backdrop_path}`
            : 'https://via.placeholder.com/400x200.png?text=No+Image',
        }}
        style={styles.backdrop}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{details.title || details.name}</Text>
        <Text style={styles.meta}>
          {details.release_date || details.first_air_date} •{' '}
          ⭐ {details.vote_average?.toFixed(1)}
        </Text>
        <Text style={styles.overview}>{details.overview}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => addToQueue({ ...details, media_type: type })}
          >
            <Text style={styles.btnText}>+ Add to Queue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => addToHistory({ ...details, media_type: type })}
          >
            <Text style={styles.btnText}>✓ Mark as Watched</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  backdrop: { width: '100%', height: 220, backgroundColor: '#222' },
  content: { padding: 20 },
  title: { color: '#00FFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  meta: { color: '#888', fontSize: 14, marginBottom: 12 },
  overview: { color: '#fff', fontSize: 15, lineHeight: 22, marginBottom: 20 },
  buttons: { flexDirection: 'row', gap: 10 },
  btn: {
    flex: 1, backgroundColor: '#00FFFF',
    padding: 12, borderRadius: 8, alignItems: 'center',
  },
  btnSecondary: { backgroundColor: '#333' },
  btnText: { color: '#000', fontWeight: 'bold' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red' },
});
