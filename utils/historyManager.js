import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'WATCHED_HISTORY';

export const loadHistory = async () => {
  const json = await AsyncStorage.getItem(HISTORY_KEY);
  return json != null ? JSON.parse(json) : [];
};

export const saveHistory = async (history) => {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const addToHistory = async (item) => {
  const history = await loadHistory();
  const exists = history.find((i) => i.id === item.id);
  if (!exists) {
    history.unshift(item);
    await saveHistory(history);
  }
};

export const clearHistory = async () => {
  await saveHistory([]);
};
