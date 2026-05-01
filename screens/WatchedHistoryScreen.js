import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { loadHistory, clearHistory } from '../utils/historyManager';

export default function WatchedHistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const data = await loadHistory();
    setHistory(data);
  };

  const handleClear = async () => {
    await clearHistory();
    fetchHistory();
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
      <Text style={styles.header}>Watch History</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>No history yet.</Text>
      ) : (
        <>
          <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
            <Text style={styles.clearText}>Clear History</Text>
          </TouchableOpacity>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={3}
          />
        </>
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
  clearBtn: { marginBottom: 15 },
  clearText: { color: 'red', fontSize: 14 },
});
