import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

// Import our screen components
import { ivory } from '@/assets/palette';
import { LandingScreen } from '@/components/LandingScreen';
import CaptureScreen from '@/components/CaptureScreen';
import ProcessingScreen from '@/components/ProcessingScreen';
import ResultScreen from '@/components/ResultScreen';

// Define the app's screen states
type AppScreen = 'landing' | 'capture' | 'processing' | 'result';

// 전역 스타일 주석: 모든 컴포넌트의 스타일에 fontFamily: 'Nanum_hana' 적용

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  // State management
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
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
    setCurrentScreen('landing');
  };

  // Handle get started action
  const handleGetStarted = () => {
    setCurrentScreen('capture');
  };

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onGetStarted={handleGetStarted} />;

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
        return <LandingScreen onGetStarted={handleGetStarted} />;
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
    fontFamily: 'Nanum_hana',
  },
});

export default App;
