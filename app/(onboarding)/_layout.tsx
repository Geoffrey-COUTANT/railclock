import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import TabOneScreen from "@/app/(onboarding)/index";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <TabOneScreen/>
  );
}
