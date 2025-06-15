import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

// By vlad
export interface Mood {
  timestamp: string;
  suggestion: string;
  imageUrl: string;
  emoji: string;
}

export const useDBWrapper = () => {
  const [history, setHistory] = useState<Mood[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        const history = await _getMoodHistory();
        setHistory(history);
      };

      fetchHistory();
    }, [])
  );

  const _getMoodHistory = async (): Promise<Mood[]> => {
    try {
      const history = await AsyncStorage.getItem('moods');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error fetching mood history:', error);
      return [];
    }
  };

  const addToHistory = async (item: Mood) => {
    try {
      const history = await AsyncStorage.getItem('moods');
      const parsedHistory = history ? JSON.parse(history) : [];
      
      if (!parsedHistory.some((i: Mood) => i.timestamp === item.timestamp)) { 
        const updatedHistory = [...parsedHistory, item];
        await AsyncStorage.setItem('moods', JSON.stringify(updatedHistory));
        setHistory(updatedHistory);
      }
    } catch (error) {
      console.error('Error saving mood history:', error);
    }
  };

  const refreshHistory = async () => {
    const h = await _getMoodHistory();
    setHistory(h);
  };

  const forgetMood = async (timestamp: string) => {
    try {
      const history = await _getMoodHistory();
      const updated = history.filter((i: Mood) => i.timestamp !== timestamp);
      await AsyncStorage.setItem('moods', JSON.stringify(updated));
      AsyncStorage.removeItem(timestamp);
      setHistory(updated);
    } catch (error) {
      console.error('Error removing item from mood history:', error);
    }
  };

  return { addToHistory, history, forgetMood, refreshHistory };
}