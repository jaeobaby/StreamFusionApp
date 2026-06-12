import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { loadQueue, removeFromQueue } from '../utils/queueManager';

export default function QueueScreen({ navigation }) {
  const [queue, setQueue] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchQueue();
    }, [])
  );

  const fetchQueue = async () => {
    const data = await loadQueue();
    setQueue(data);
  };

  const handleRemove = async (id) => {
    await removeFromQueue(id);
    fetchQueue();
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
      <TouchableOpacity onPress={() => handleRemove(item.id)}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Queue</Text>
      {queue.length === 0 ? (
        <Text style={styles.empty}>Your queue is empty.</Text>
      ) : (
        <FlatList
          data={queue}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#00FFFF', fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  card: { marginBottom: 20 },
  poster: { width: 120, height: 180, borderRadius: 8, backgroundColor: '#222' },
  title: { color: '#fff', marginTop: 8, fontSize: 14 },
  remove: { color: 'red', marginTop: 4 },
  empty: { color: '#888', fontSize: 16 },
});
