import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

// Import our screen components
import { ivory } from '@/styles/palette';
import CaptureScreen from '@/components/CaptureScreen';
import ProcessingScreen from '@/components/ProcessingScreen';
import ResultScreen from '@/components/ResultScreen';

// Define the app's screen states
type AppScreen = 'capture' | 'processing' | 'result';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // State management
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('capture');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Handle captured photo
  const handleCapture = (imageUri: string) => {
    setCapturedImage(imageUri);
    setCurrentScreen('processing');
  };

  // Handle processing completion
  const handleProcessingComplete = (result: any) => {
    setAnalysisResult(result);
    setCurrentScreen('result');
  };

  // Handle restart flow
  const handleRestart = () => {
    setCapturedImage('');
    setAnalysisResult(null);
    setCurrentScreen('capture');
  };

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'capture':
        return <CaptureScreen onCapture={handleCapture} />;

      case 'processing':
        return (
          <ProcessingScreen
            imageUri={capturedImage}
            onProcessingComplete={handleProcessingComplete}
          />
        );

      case 'result':
        return (
          <ResultScreen result={analysisResult} onRestart={handleRestart} />
        );

      default:
        return <CaptureScreen onCapture={handleCapture} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ivory[100],
  },
});

export default App;
