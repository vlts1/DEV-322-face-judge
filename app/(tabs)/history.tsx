// history.tsx, Zoé Mukaba 
// list of past mood records using MoodCard

import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import MoodCard from '@/components/ui/MoodCard';

export default function HistoryScreen() {

  // This is just a temporary mock data; will be replaced with real db entries later
  const moodHistory = [
    {
      emoji: '😌',
      suggestion: 'Take a walk and breathe deeply',
      date: 'June 5, 2025',
    },
    {
      emoji: '😔',
      suggestion: 'Play calming music',
      date: 'June 4, 2025',
    },
    {
      emoji: '😃',
      suggestion: 'Celebrate with Ice-cream!',
      date: 'June 3, 2025',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Mood History </Text>
      {moodHistory.map((entry, index) => (
        <MoodCard
          key={index}
          emoji={entry.emoji}
          suggestion={entry.suggestion}
          date={entry.date}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
});
