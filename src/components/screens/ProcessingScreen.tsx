import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';

import { green, ivory, customFonts } from '@/styles';
import { ProcessingScreenProps, ResultResponseType } from '@/types';
import { GoogleGenAI } from '@google/genai';
import { REACT_APP_GEMINI_API_KEY } from '@env';

import leaf from '@/assets/images/leaf_scanning.gif';
import useGemini from '@/hooks/gemini';

const ai = new GoogleGenAI({
  vertexai: false,
  apiKey: REACT_APP_GEMINI_API_KEY,
  apiVersion: 'v1beta',
});

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  imageUris,
  onProcessingComplete,
  setCurrentScreen,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [result, setResult] = React.useState<ResultResponseType | null>(null);

  // TODO gemini 요청 보내기 (이미지 넣어서 프롬프트 전송)
  const prompts = `
    식물의 사진을 기반으로 식물의 상태와 성장률, 개선 방법을 알려줘. 
    결과는 다음과 같은 정보를 꼭 포함해야 해.
    1. 추정되는 식물의 이름
    2. 식물의 현재 상태 (영양상태, 부족한 부분 등)
    3. 식물의 성장률
    4. 식물이 잘 자라기 위해 하면 좋을 팁

    결과과 정상적으로 처리되면 JSON 형식으로 반환해줘.
    {
      "resStatus": "success",
      "name": "식물 이름",
      "state": "식물 상태",
      "growthRate": "성장률",
      "careTip": "관리 팁"
    }

    만약 사진이 식물로 추정되지 않는다면 응답을 다음과 같이 반환해줘.
    {
      "resStatus": "fail",
      "message": "식물로 추정되지 않는 사진입니다."
    }

    만약 올린 사진이 각각 다른 식물로 보인다면 응답을 다음과 같이 반환해줘.
    {
      "resStatus": "fail",
      "message": "한 종류의 식물만 촬영해주세요."
    }
  `;

  const contents = useMemo(() => {
    const initDatas = imageUris.map(uri => {
      return {
        inlineData: {
          data: uri.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: 'image/jpg',
        },
      };
    });
    return [...initDatas, { text: prompts }];
  }, [imageUris, prompts]);

  /*
    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageFile,
        },
      },
      { text: "Caption this image." },
    ];
  */

  const callGemini = async () => {
    try {
      const response = await useGemini({ reqBody: contents });
      setLoading(false);
      const currentResult = response;
      if (currentResult) {
        setResult(currentResult);
      }
    } catch (error) {
      const alert = Alert.alert('Error!', '분석 중 오류가 발생했습니다.', [
        {
          text: '돌아가기',
          onPress: () => {
            setCurrentScreen('capture');
          },
        },
      ]);
    }
  };

  useEffect(() => {
    callGemini();
  }, []);

  useEffect(() => {
    if (!loading && result) {
      onProcessingComplete(result);
    }
  }, [loading, onProcessingComplete, result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>분석 중 입니다...</Text>
      <Image source={leaf} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  image: {
    width: 200,
    height: 200,
  },
});
