import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// vlad & ashmeet

const CloudEmoji = ({ emoji }: { emoji: string }) => {
  const insets = useSafeAreaInsets();

  const cloudOpacity = useRef(new Animated.Value(emoji ? 1 : 0)).current;
  const emojiScale = useRef(new Animated.Value(1)).current;
  const emojiOpacity = useRef(new Animated.Value(emoji ? 1 : 0)).current;

  const [currentEmoji, setCurrentEmoji] = useState(emoji);

  useEffect(() => {
    if (emoji === '') {
      // Fade out cloud and emoji
      Animated.parallel([
        Animated.timing(cloudOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(emojiOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentEmoji('');
      });
    } else {
      // Show cloud and fade in emoji
      Animated.parallel([
        Animated.timing(cloudOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(emojiOpacity, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(emojiScale, {
            toValue: 0.3,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.parallel([
            Animated.timing(emojiScale, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(emojiOpacity, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start();

      setTimeout(() => {
        setCurrentEmoji(emoji);
      }, 100);
    }
  }, [emoji]);

  return (
    <View style={[styles.container, { top: insets.top }]} aria-label='Current mood emoji'>
      <Animated.View style={[styles.cloud, { opacity: cloudOpacity }]}>
        <MaterialIcons name="cloud" size={120} color="white" />
      </Animated.View>
      <Animated.Text
        style={[
          styles.emoji,
          {
            transform: [{ scale: emojiScale }],
            opacity: emojiOpacity,
          },
        ]}
      >
        {currentEmoji}
      </Animated.Text>
    </View>
  );
};

export default CloudEmoji;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 60,
    zIndex: 10,
  },
  cloud: {
    position: 'absolute',
  },
  emoji: {
    fontSize: 45,
    zIndex: 11,
    paddingTop: 5,
  },
});
