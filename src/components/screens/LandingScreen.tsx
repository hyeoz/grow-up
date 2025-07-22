import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { gray, green, ivory } from '@/styles/palette';
import { customFonts } from '@/styles/fonts';

import LeafScanning from '@/assets/images/leaf_scanning.gif';

interface LandingScreenProps {
  onGetStarted: () => void;
}

// TODO 랜딩페이지 한 번만 열리도록 상태관리

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onGetStarted,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>자라나요</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={LeafScanning} style={styles.image} />
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>반가워요!</Text>
          <Text style={styles.welcomeText}>
            자라나요는 식물의 성장을 분석하고 관리하는 데 도움을 주는 앱이에요.
            식물의 사진을 찍고 분석하여 최적의 관리 방법을 알려드릴게요!
          </Text>
        </View>

        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>식물 관리 팁</Text>
          <Text style={styles.tipsText}>
            • 정기적으로 사진을 찍어 식물의 변화를 기록하세요.
          </Text>
          <Text style={styles.tipsText}>
            • 같은 각도에서 촬영하면 성장 비교에 도움이 됩니다.
          </Text>
          <Text style={styles.tipsText}>
            • 자연광 아래에서 촬영하면 더 정확한 분석이 가능합니다.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={onGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ivory[100],
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: green[300],
    fontFamily: customFonts.nanumHana,
  },
  subtitle: {
    fontSize: 16,
    color: green[200],
    marginTop: 5,
    fontFamily: customFonts.nanumHana,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: 150,
    height: 150,
  },
  welcomeSection: {
    marginBottom: 30,
    backgroundColor: gray[100],
    padding: 20,
    borderRadius: 10,
    shadowColor: gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: green[300],
    marginBottom: 10,
    fontFamily: customFonts.nanumHana,
  },
  welcomeText: {
    fontSize: 15,
    color: gray[500],
    lineHeight: 22,
    fontFamily: customFonts.nanumSquareRound,
  },
  tipsSection: {
    marginBottom: 30,
    backgroundColor: gray[100],
    padding: 20,
    borderRadius: 10,
    shadowColor: gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: green[300],
    marginBottom: 15,
    fontFamily: customFonts.nanumHana,
  },
  tipsText: {
    fontSize: 14,
    color: gray[500],
    marginBottom: 8,
    fontFamily: customFonts.nanumSquareRound,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: ivory[100],
  },
  startButton: {
    backgroundColor: green[400],
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: gray[100],
    fontSize: 24,
    fontFamily: customFonts.nanumHana,
  },
});
