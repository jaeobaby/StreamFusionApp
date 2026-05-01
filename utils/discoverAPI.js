import axios from 'axios';
import { API_KEY, BASE_URL } from './tmdb';

export const fetchTrending = async (type = 'all') => {
  const url = `${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchPopular = async (type = 'movie') => {
  const url = `${BASE_URL}/${type}/popular?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchTopRated = async (type = 'movie') => {
  const url = `${BASE_URL}/${type}/top_rated?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchByGenre = async (genreId, type = 'movie') => {
  const url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genreId}`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchGenres = async (type = 'movie') => {
  const url = `${BASE_URL}/genre/${type}/list?api_key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data.genres;
};
