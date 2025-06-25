import EmptyHistory from '@/components/help_components/EmptyHistory';
import { InListItem } from '@/components/item/InListItem';
import { Colors } from '@/constants/Colors';
import { useDBWrapper } from '@/hooks/useDBWrapper';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
// By vlad and zoe
export default function FaceJudgeMain() {
  const { history, refreshHistory } = useDBWrapper();
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
    
  return (
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

      <View style={{paddingBottom: 60 }}/>
    </ScrollView>
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
