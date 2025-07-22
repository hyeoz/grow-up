import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { green, ivory, customFonts } from '@/styles';
import { ProcessingScreenProps, ResultResponseType } from '@/types';
import { GeminiAPI } from '@/api';

import leaf from '@/assets/images/leaf_scanning.gif';

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  imageUris,
  onProcessingComplete,
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

    만약 사진이 식물로 추정되지 않는다면 JSON 형식으로 반환해줘.
    {
      "resStatus": "fail",
      "message": "식물로 추정되지 않는 사진입니다."
    }
  `;

  const reqBody = useMemo(() => {
    const initDatas = imageUris.map(uri => {
      return {
        inlineData: {
          data: uri,
          mimeType: 'image/jpeg',
        },
      };
    });
    return [...initDatas, prompts];
  }, [imageUris, prompts]);

  const callGemini = async () => {
    try {
      const response = await GeminiAPI.post('', reqBody);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
