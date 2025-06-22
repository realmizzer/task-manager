import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { HomeScreen } from '@/screens/home';

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <HomeScreen />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </StoreProvider>
  );
}
