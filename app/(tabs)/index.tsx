import EmptyHistory from '@/components/help_components/EmptyHistory';
import { InListItem } from '@/components/item/InListItem';
import { Colors } from '@/constants/Colors';
import { useDBWrapper } from '@/hooks/useDBWrapper';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
// adding imports to clear history button -nick
import * as FileSystem from 'expo-file-system';
import { ScrollView, StyleSheet, View, useColorScheme, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// By vlad & zoe
export default function FaceJudgeMain() {
  const { history, refreshHistory, clearHistory } = useDBWrapper();
  const colorScheme = useColorScheme();

  const dividerColor =
    colorScheme === 'dark' ? Colors.dark.border : Colors.light.border;

    useFocusEffect(
      useCallback(() => {
        const timeout = setTimeout(() => { refreshHistory(); }, 1000);
        return () => clearTimeout(timeout); // cleanup on blur
      }, [])
    );

  if (history.length === 0) return <EmptyHistory />;

 // added clear history feature to remove excess images in local hist.
  return (
    <>
      <Button title="Clear History" onPress={clearHistory} color="#800080" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        {history.map((item, index) => (
          <View key={item.timestamp}>
            <InListItem
              id={item.timestamp}
              emoji={item.emoji}
              suggestion={item.suggestion}
              imageUrl={item.imageUrl}
            />

            {index < history.length - 1 && (
              <View style={[styles.divider, { backgroundColor: dividerColor }]} />
            )}
          </View>
        ))}

        <View style={{paddingBottom: 60 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
    paddingTop: 16,
  },
  divider: {
    height: 1,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
