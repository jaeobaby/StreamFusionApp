import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
  ScrollView, StyleSheet, ActivityIndicator
} from 'react-native';
import { fetchTrending, fetchPopular, fetchTopRated, fetchGenres, fetchByGenre } from '../utils/discoverAPI';

export default function DiscoverScreen({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreResults, setGenreResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [trend, pop, top, gen] = await Promise.all([
      fetchTrending(),
      fetchPopular(),
      fetchTopRated(),
      fetchGenres(),
    ]);

    setTrending(trend);
    setPopular(pop);
    setTopRated(top);
    setGenres(gen);

    const genreFetches = gen.slice(0, 4).map(async (g) => {
      const items = await fetchByGenre(g.id);
      return { name: g.name, items };
    });

    const genreData = await Promise.all(genreFetches);
    const genreObj = {};
    genreData.forEach((g) => {
      genreObj[g.name] = g.items;
    });

    setGenreResults(genreObj);
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
    </TouchableOpacity>
  );

  const renderSection = (title, data) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      {renderSection('Trending Now', trending)}
      {renderSection('Popular', popular)}
      {renderSection('Top Rated', topRated)}
      {Object.keys(genreResults).map((genre) =>
        renderSection(genre, genreResults[genre])
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { color: '#00FFFF', fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  section: { marginBottom: 25 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '600', marginBottom: 8 },
  card: { marginRight: 10 },
  poster: { width: 120, height: 180, borderRadius: 8, backgroundColor: '#222' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
