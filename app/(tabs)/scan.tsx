import NoCameraPermission from '@/components/help_components/NoCameraPermission';
import CloudEmoji from '@/components/scanner/CloudEmoji';
import { useDBWrapper } from '@/hooks/useDBWrapper';
import useMoodEngineInterface from '@/hooks/useMoodEngineInterface';
import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import { useEffect, useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// by Vlad

const generateId = async () => {
  const uuid = await Crypto.randomUUID();
  return uuid;
};

export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();
  const hasScanned = useRef(false);
  const cameraRef = useRef<CameraView>(null);
  const moodEngine = useMoodEngineInterface();
  const moodHistory = useDBWrapper();

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (isFocused) {
      hasScanned.current = false;
    }
  }, [isFocused]);

  const takeAndSavePhoto = async () => {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync();
      const id = await generateId();
      const newPath = `${FileSystem.documentDirectory}${id}.jpg`;

      await FileSystem.moveAsync({
        from: photo.uri,
        to: newPath,
      });

      moodHistory.addToHistory({
        emoji: moodEngine.emoji,
        timestamp: new Date().toISOString(),
        suggestion: moodEngine.suggestion,
        imageUrl: newPath,
      });

      Alert.alert('Saved!', 'Your mood and selfie have been saved.');
    } catch (err) {
      console.error('Photo saving failed', err);
      Alert.alert('Error', 'Could not save the photo.');
    }
  };

  if (permission?.granted === false) {
    return <NoCameraPermission />;
  }

  if (permission?.granted && isFocused) {
    return (
      <View style={styles.container}>
        <CameraView
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="front"
          aria-label='Camera View'
        />
        <CloudEmoji emoji={moodEngine.emoji} />
        <View style={[styles.captureButtonContainer, { bottom: insets.bottom + 70 }]}>
          <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            onPress={takeAndSavePhoto}
          />
        </View>
        </View>
      </View>
    );
  }

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    right: 20,
  },
  captureButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  
});
