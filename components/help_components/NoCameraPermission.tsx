import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
// vlad 
const NoCameraPermission = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const openAppSettings = () => {
    Linking.openSettings();
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#f2f2f2' }]}>
      <Ionicons
        name="videocam-off-outline"
        size={80}
        color={isDark ? '#bbb' : '#555'}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>
        Oops! 😢
      </Text>
      <Text style={[styles.message, { color: isDark ? '#ccc' : '#333' }]}>
        Camera access is required. Please enable it in your settings.
      </Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected }]} onPress={openAppSettings}>
        <Text style={styles.buttonText}>Open Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoCameraPermission;

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: "25%",
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
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: "30%",
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
