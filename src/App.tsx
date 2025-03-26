import React from 'react';
import Layout from './components/Layout/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { ConversationProvider } from './context/ConversationContext';
import { BackgroundProvider } from './context/BackgroundContext';

function App() {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <ConversationProvider>
          <Layout />
        </ConversationProvider>
      </BackgroundProvider>
    </ThemeProvider>
  );
}

export default App;
