import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { green, ivory } from '@/assets/palette';

interface ResultScreenProps {
  result: {
    imageUri: string;
    analysis: {
      growthStage: string;
      health: string;
      recommendation: string;
    };
  };
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>분석 결과</Text>

      <View style={styles.imageContainer}>
        <Image source={{ uri: result.imageUri }} style={styles.image} />
      </View>

      <View style={styles.resultContainer}>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>성장 단계:</Text>
          <Text style={styles.resultValue}>{result.analysis.growthStage}</Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>건강 상태:</Text>
          <Text style={styles.resultValue}>{result.analysis.health}</Text>
        </View>

        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>추천:</Text>
          <Text style={styles.resultValue}>
            {result.analysis.recommendation}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>추가 정보</Text>
        <Text style={styles.infoText}>
          식물의 성장을 관찰하며 정기적으로 사진을 찍어 기록하세요. 이렇게 하면
          시간에 따른 변화를 더 잘 파악할 수 있습니다.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onRestart}>
        <Text style={styles.buttonText}>다시 찍기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: ivory[100],
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: green[300],
    marginBottom: 20,
    fontFamily: 'Nanum_hana',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resultItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  resultLabel: {
    width: 80,
    fontSize: 16,
    fontWeight: 'bold',
    color: green[300],
    fontFamily: 'Nanum_hana',
  },
  resultValue: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Nanum_hana',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: green[300],
    marginBottom: 10,
    fontFamily: 'Nanum_hana',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    fontFamily: 'Nanum_hana',
  },
  button: {
    backgroundColor: green[200],
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Nanum_hana',
  },
});

export default ResultScreen;
