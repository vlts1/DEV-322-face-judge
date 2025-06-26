import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemedText } from '../ThemedText';
// vlad
interface MoodEntryItemProps {
  id: string;
  emoji: string;
  suggestion: string;
  imageUrl: string;
}

export function InListItem({
  id,
  emoji,
  suggestion,
  imageUrl,
}: MoodEntryItemProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = new Date(id).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.layout}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={{ uri: imageUrl }} style={styles.image} aria-label='User Picture'/>
      </TouchableOpacity>

      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>

      <View style={styles.textLayout}>
        <ThemedText style={styles.suggestion}>{suggestion}</ThemedText>
        <ThemedText style={styles.date}>{formattedDate}</ThemedText>
      </View>

      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.fullImageContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={{ uri: imageUrl }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 16,
    borderRadius: 12,
    marginVertical: 6,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  emojiContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
    lineHeight: 80,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingTop: 2,
  },
  
  textLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  suggestion: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  fullImageContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});
