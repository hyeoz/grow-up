import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { green, ivory } from '@/styles/palette';
import { customFonts } from '@/styles/fonts';

interface ProcessingScreenProps {
  imageUris: string[];
  onProcessingComplete: (result: any) => void;
}

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  imageUris,
  onProcessingComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [processedImages, setProcessedImages] = useState<any[]>([]);

  useEffect(() => {
    // 이미지가 없거나 이미 모든 이미지가 처리되었는지 확인
    if (imageUris.length === 0 || currentImageIndex >= imageUris.length) {
      return;
    }

    // 현재 이미지 처리 시작
    setProgress(0);
    
    // 이미지 처리 시뮬레이션
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;

        if (newProgress >= 100) {
          clearInterval(interval);
          
          // 현재 이미지에 대한 분석 결과 생성
          const currentImageUri = imageUris[currentImageIndex];
          const mockResult = {
            imageUri: currentImageUri,
            analysis: {
              growthStage: `성장 단계 ${currentImageIndex + 1}`,
              health: ['양호', '좋음', '주의 필요'][currentImageIndex % 3],
              recommendation: ['물을 더 주세요', '햇빛이 더 필요해요', '영양분을 추가하세요'][currentImageIndex % 3],
            },
          };
          
          // 처리된 이미지 결과를 배열에 추가
          const newProcessedImages = [...processedImages, mockResult];
          setProcessedImages(newProcessedImages);
          
          // 모든 이미지가 처리되었는지 확인
          if (currentImageIndex + 1 >= imageUris.length) {
            // 모든 이미지 처리 완료 - 결과 반환
            setTimeout(() => {
              // 모든 처리된 이미지의 결과를 포함한 최종 결과 생성
              const finalResult = {
                images: newProcessedImages,
                summary: '모든 이미지 처리 완료',
              };
              onProcessingComplete(finalResult);
            }, 500);
          } else {
            // 다음 이미지로 이동
            setTimeout(() => {
              setCurrentImageIndex(currentImageIndex + 1);
            }, 300);
          }
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [imageUris, currentImageIndex, processedImages, onProcessingComplete]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>이미지 분석 중...</Text>
      
      <Text style={styles.subtitle}>
        이미지 {currentImageIndex + 1} / {imageUris.length} 처리 중
      </Text>

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
      
      <View style={styles.statusContainer}>
        {processedImages.map((img, idx) => (
          <View key={idx} style={styles.statusItem}>
            <Text style={styles.statusText}>이미지 {idx + 1}: 분석 완료</Text>
          </View>
        ))}
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
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: customFonts.nanumHana,
  },
  subtitle: {
    fontSize: 16,
    color: green[400],
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: customFonts.nanumHana,
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
    fontFamily: customFonts.nanumHana,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  processingText: {
    marginTop: 20,
    fontSize: 16,
    color: green[300],
    textAlign: 'center',
    fontFamily: customFonts.nanumHana,
  },
  statusContainer: {
    marginTop: 30,
  },
  statusItem: {
    paddingVertical: 5,
  },
  statusText: {
    fontSize: 14,
    color: green[500],
    fontFamily: customFonts.nanumSquareRound,
  },
});

export default ProcessingScreen;
