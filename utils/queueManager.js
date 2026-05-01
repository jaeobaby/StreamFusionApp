import AsyncStorage from '@react-native-async-storage/async-storage';

const QUEUE_KEY = 'QUEUE_DATA';

export const loadQueue = async () => {
  const json = await AsyncStorage.getItem(QUEUE_KEY);
  return json != null ? JSON.parse(json) : [];
};

export const saveQueue = async (queue) => {
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

export const addToQueue = async (item) => {
  const queue = await loadQueue();
  const exists = queue.find((i) => i.id === item.id);
  if (!exists) {
    queue.unshift(item);
    await saveQueue(queue);
  }
};

export const removeFromQueue = async (itemId) => {
  const queue = await loadQueue();
  const newQueue = queue.filter((i) => i.id !== itemId);
  await saveQueue(newQueue);
};

export const clearQueue = async () => {
  await saveQueue([]);
};
