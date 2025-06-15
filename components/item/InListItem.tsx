import { useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';
// vlad
interface MoodEntryItemProps {
  id: string;
  emoji: string;
  suggestion: string;
  imageUrl: string;
}

export function InListItem({ id, emoji, suggestion, imageUrl }: MoodEntryItemProps) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.layout}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        <View style={styles.textLayout}>
          <ThemedText style={styles.title}>{emoji}</ThemedText>
          <ThemedText style={styles.subtitle}>{suggestion}</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
    marginTop: 6,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  textLayout: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
