import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { gray, green, ivory } from '@/styles/palette';
import { customFonts } from '@/styles';
import { ResultScreenProps } from '@/types';

/*
 result 타입
 {
  "resStatus":"success",
  "name":"상추",
  "state":"현재 상태 는 잎이 싱싱해 보이며, 수분은 충분해 보입니다. 하지만 흙의 영양 상태를 확인해야 정확한 영양 상태를 알 수 있습니 다."."growthRate":"상추의 성장률은 환경 조건(햇빛, 물, 온도) 에 따라 다르지만, 잎의 상태로 보아 현재 성장률은 정상으로 보입 니다." 
  "careTip":"•"1. 햇빛이 잘 드는 곳에 두고, 물을 꾸준히 주세 요."In2. 흙이 건조해지지 않도록 주의하고, 통풍이 잘 되도록 관리 해주세요.!n3. 잎이 너무 무성해지면 솎아주어 통풍을 개선하고, 영 양분 분배를 돕는 것이 좋습니다."
}
*/

export const ResultScreen: React.FC<ResultScreenProps> = ({
  analysisResult,
  onRestart,
}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>분석 결과</Text>

      {analysisResult.resStatus === 'success' ? (
        <View style={styles.resultContainer}>
          <View style={styles.resultNameItem}>
            <Text style={styles.resultLabel}>이 식물은 아마</Text>
            <Text style={styles.resultValue}>{analysisResult.name}</Text>
            <Text style={styles.resultLabel}>인 것 같아요!</Text>
          </View>

          <View style={styles.resultStateItem}>
            <Text style={styles.resultLabel}>식물의 상태</Text>
            <Text style={styles.resultValue}>{analysisResult.state}</Text>
          </View>

          <View style={styles.resultCareTipItem}>
            <Text style={styles.resultLabel}>관리 팁</Text>
            <Text style={styles.resultValue}>{analysisResult.careTip}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultValue}>
            {analysisResult.message ||
              '분석 중 문제가 발생했어요. 잠시 후 다시 시도해주세요!'}
          </Text>
        </View>
      )}

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
    gap: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: green[300],
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: customFonts.nanumHana,
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
    shadowColor: gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  resultNameItem: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 8,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: green[300],
    fontFamily: customFonts.nanumHana,
  },
  resultValue: {
    fontSize: 16,
    color: gray[900],
    fontFamily: customFonts.nanumSquareRound,
    lineHeight: 20,
  },
  resultStateItem: {
    flexDirection: 'column',
    marginBottom: 10,
    gap: 8,
  },
  resultCareTipItem: {
    flexDirection: 'column',
    marginBottom: 10,
    gap: 8,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: gray[900],
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
    fontFamily: customFonts.nanumHana,
  },
  infoText: {
    fontSize: 14,
    color: gray[500],
    lineHeight: 20,
    fontFamily: customFonts.nanumSquareRound,
  },
  button: {
    backgroundColor: green[400],
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: customFonts.nanumHana,
  },
});
