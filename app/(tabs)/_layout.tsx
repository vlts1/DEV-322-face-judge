import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';
// by vlad & zoe
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'History',
          headerTitleStyle: {fontSize: 19},
          tabBarIcon: ({ color }) => 
            Platform.OS === "ios" 
              ? <IconSymbol size={28} name="newspaper.fill" color={color} />
              : <MaterialIcons name="newspaper" size={24} color={color}/>,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          headerTitleStyle: {fontSize: 19},
          tabBarIcon:  ({ color }) =>  
            Platform.OS === "ios" 
              ? <IconSymbol size={28} name="camera.fill" color={color} />
              : <MaterialIcons name="camera" size={24} color={color}/>,
        }}
      />
    </Tabs>
  );
}
