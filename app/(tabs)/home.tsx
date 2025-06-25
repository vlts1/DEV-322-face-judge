import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
//nick adding home/landing page w ui tweaks
export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome to the Face Judge!</ThemedText>
      <ThemedText style={styles.subtitle}>Click below to get scanning 😊</ThemedText>
      <Link href="/(tabs)/scan" asChild>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>Scan</ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    width: 200,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#800080',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
      textAlign: 'center',
      },
});