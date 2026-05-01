import axios from 'axios';
import { API_KEY, BASE_URL } from './tmdb';
import { loadHistory } from './historyManager';
import { loadQueue } from './queueManager';

export const fetchRecommendationsForItem = async (id, type = 'movie') => {
  const url = `${BASE_URL}/${type}/${id}/recommendations?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchDiscover = async (genres = [], type = 'movie') => {
  const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres.join(',')}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const getAIRecommendations = async () => {
  const history = await loadHistory();
  const queue = await loadQueue();

  const allItems = [...history, ...queue];
  if (allItems.length === 0) return [];

  const genreCounts = {};
  const typeCounts = { movie: 0, tv: 0 };

  for (const item of allItems) {
    if (item.genre_ids) {
      item.genre_ids.forEach((g) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    }
    const t = item.media_type || item.type || 'movie';
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  }

  const topGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id)
    .slice(0, 3);

  const mostWatchedType = typeCounts.movie >= typeCounts.tv ? 'movie' : 'tv';

  const discover = await fetchDiscover(topGenres, mostWatchedType);

  const recentItems = allItems.slice(0, 3);
  let recs = [];
  for (const item of recentItems) {
    const itemRecs = await fetchRecommendationsForItem(
      item.id,
      item.media_type || 'movie'
    );
    recs = [...recs, ...itemRecs];
  }

  const seen = new Set();
  const unique = recs.concat(discover).filter((i) => {
    if (seen.has(i.id)) return false;
    seen.add(i.id);
    return true;
  });

  return unique;
};
