import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// vlad
const ItemNotFound = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f2f2f2' }]}>
      <Ionicons
        name="server-outline"
        size={80}
        color={isDark ? '#bbb' : '#555'}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>
        Item Not Found 🚫
      </Text>
      <Text style={[styles.message, { color: isDark ? '#ccc' : '#333' }]}>
        The item is not in the database.
      </Text>
    </View>
  );
};

export default ItemNotFound;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: "35%",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});
