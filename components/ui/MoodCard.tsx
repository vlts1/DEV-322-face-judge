// MoodCard.tsx File, Zoé Mukaba 
// Shows a card with emoji, suggestion and date

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Props are values passed into the component when it's used
interface MoodCardProps {
  emoji: string;
  suggestion: string;
  date?: string;
}

//Displays a card with emoji, suggestion and date 
const MoodCard: React.FC<MoodCardProps> = ({ emoji, suggestion, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.suggestion}>{suggestion}</Text>
      {date && <Text style={styles.date}>{date}</Text>}
    </View>
  );
};

export default MoodCard;

// simple Styling for the card layout
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    margin: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  suggestion: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
});
