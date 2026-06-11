import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text } from 'react-native';
import InfoScreen from './src/screens/InfoScreen';
import ScanScreen from './src/screens/ScanScreen';
import SearchScreen from './src/screens/SearchScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

function tabIcon(emoji: string) {
  return ({ focused }: { focused: boolean }) => (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerShadowVisible: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.muted,
        }}
      >
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{ title: 'Scan stregkode', tabBarLabel: 'Scan', tabBarIcon: tabIcon('📷') }}
        />
        <Tab.Screen
          name="Søg"
          component={SearchScreen}
          options={{ title: 'Søg efter mærke', tabBarLabel: 'Søg', tabBarIcon: tabIcon('🔍') }}
        />
        <Tab.Screen
          name="Info"
          component={InfoScreen}
          options={{ title: 'Om dyreforsøg', tabBarLabel: 'Info', tabBarIcon: tabIcon('🐰') }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
