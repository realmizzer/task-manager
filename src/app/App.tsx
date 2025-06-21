import React from 'react';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { HomeScreen } from '@/screens/home';

export default function App() {
  return (
    <StoreProvider>
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    </StoreProvider>
  );
}
