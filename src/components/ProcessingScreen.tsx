import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { green, ivory } from '@/assets/palette';

interface ProcessingScreenProps {
  imageUri: string;
  onProcessingComplete: (result: any) => void;
}

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  imageUri,
  onProcessingComplete,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;

        if (newProgress >= 100) {
          clearInterval(interval);
          // Mock processed result data
          const mockResult = {
            imageUri,
            analysis: {
              growthStage: '성장 단계 2',
              health: '양호',
              recommendation: '물을 더 주세요',
            },
          };

          // Wait a moment before completing to show 100%
          setTimeout(() => {
            onProcessingComplete(mockResult);
          }, 500);

          return 100;
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [imageUri, onProcessingComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이미지 분석 중...</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={green[300]} />
        <Text style={styles.processingText}>
          {progress < 30 && '사진을 업로드하는 중...'}
          {progress >= 30 && progress < 60 && '식물 상태를 분석하는 중...'}
          {progress >= 60 && progress < 90 && '성장 단계를 확인하는 중...'}
          {progress >= 90 && '분석 결과를 생성하는 중...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: ivory[100],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: green[300],
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Nanum_hana',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: green[200],
  },
  progressText: {
    textAlign: 'right',
    color: green[300],
    fontWeight: 'bold',
    fontFamily: 'Nanum_hana',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  processingText: {
    marginTop: 20,
    fontSize: 16,
    color: green[300],
    textAlign: 'center',
    fontFamily: 'Nanum_hana',
  },
});

export default ProcessingScreen;
