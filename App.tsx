import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

import {
  LandingScreen,
  CaptureScreen,
  ProcessingScreen,
  ResultScreen,
} from '@/components/screens';
import { customFonts, ivory } from '@/styles';
import { ResultResponseType } from '@/types';

// Define the app's screen states
type AppScreen = 'landing' | 'capture' | 'processing' | 'result';

// AsyncStorage key for checking first-time use
const FIRST_TIME_KEY = 'app_first_time_open';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleCapture = (imageUris: string[]) => {
    setCapturedImages(imageUris);
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = (result: ResultResponseType) => {
    setAnalysisResult(result);
    setCurrentScreen('result');
  };

  const handleRestart = () => {
    setCapturedImages([]);
    setAnalysisResult(null);
    setCurrentScreen('landing');
  };

  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem(FIRST_TIME_KEY, 'false');
    } catch (error) {
      console.error('Error saving first time status:', error);
    }
    setCurrentScreen('capture');
  };

  useEffect(() => {
    const checkFirstTimeOpen = async () => {
      try {
        const value = await AsyncStorage.getItem(FIRST_TIME_KEY);
        if (value !== null) {
          setCurrentScreen('capture');
        }
      } catch (error) {
        console.error('Error checking first time status:', error);
      }
    };
    checkFirstTimeOpen();
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onGetStarted={handleGetStarted} />;

      case 'capture':
        return <CaptureScreen onCapture={handleCapture} />;

      case 'processing':
        return (
          <ProcessingScreen
            imageUris={capturedImages}
            onProcessingComplete={handleProcessingComplete}
            setCurrentScreen={setCurrentScreen}
          />
        );

      case 'result':
        return (
          <ResultScreen
            analysisResult={analysisResult}
            onRestart={handleRestart}
          />
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
    fontFamily: customFonts.nanumHana,
  },
});

export default App;
