import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { gray, green, ivory } from '@/styles/palette';
import { customFonts } from '@/styles/fonts';
import Camera from '@/assets/images/disabled_camera.png';

interface CaptureScreenProps {
  onCapture: (imageUris: string[]) => void;
}

const WIDTH = Dimensions.get('window').width;
const MAX_IMAGES = 3; // 최대 이미지 수
const IMAGE_SPACING = 20; // 이미지 간격

const CaptureScreen: React.FC<CaptureScreenProps> = ({ onCapture }) => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 사진 촬영 처리
  const handleCapture = () => {
    if (imageUris.length >= MAX_IMAGES) {
      Alert.alert(
        '최대 사진 수',
        `최대 ${MAX_IMAGES}장까지 촬영할 수 있습니다.`,
      );
      return;
    }

    // 실제 앱에서는 카메라 API를 사용
    // 각 사진은 다르게 보이도록 시간값을 추가
    const mockImageUri = `https://picsum.photos/150`;
    setImageUris([...imageUris, mockImageUri]);
  };

  // 분석 확인 처리 (카메라 버튼과 동일한 동작)
  const handleAnalyze = () => {
    if (imageUris.length > 0) {
      onCapture(imageUris);
    } else {
      Alert.alert('사진 필요', '적어도 한 장의 사진이 필요합니다.');
    }
  };

  // 개별 이미지 선택
  const handleSelectImage = (index: number) => {
    setSelectedIndex(index);
    // TODO 모달로 이미지 크게 보여주기
  };

  // 이미지 삭제
  const handleDeleteImage = (index: number) => {
    // TODO 삭제 확인 모달
    const newImageUris = [...imageUris];
    newImageUris.splice(index, 1);
    setImageUris(newImageUris);
    setSelectedIndex(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 찍기</Text>

      <View style={styles.contentWrapper}>
        {/* 이미지 썸네일 목록 */}
        <View style={thumbnailStyle.thumbnailContainer}>
          {/* 스택처럼 쌓인 이미지들 표시 */}
          {imageUris.length > 0 ? (
            imageUris.map((uri, index) => {
              const rotateDeg = index === 1 ? 5 : index === 2 ? -5 : 0;
              const indexedTop = index === 1 ? 5 : index === 2 ? -20 : -45;
              const indexedLeft =
                (index === 1 ? 25 : index === 2 ? -25 : 0) +
                (WIDTH / 2 - IMAGE_SPACING); // padding 고려

              return (
                <TouchableOpacity
                  key={`${uri}-${index}`}
                  style={[
                    selectedIndex === index && thumbnailStyle.selectedThumbnail,
                    thumbnailStyle.stackedItem,
                    {
                      top: indexedTop,
                      left: indexedLeft,
                      zIndex: imageUris.length + index,
                      transform: [
                        { translateX: '-50%' },
                        { rotate: `${rotateDeg}deg` },
                      ],
                    },
                  ]}
                  onPress={() => handleSelectImage(index)}
                >
                  <Image
                    source={{ uri }}
                    style={thumbnailStyle.thumbnail as any}
                  />
                  <TouchableOpacity
                    style={buttonStyle.deleteButton}
                    onPress={() => handleDeleteImage(index)}
                  >
                    <Text style={buttonStyle.deleteButtonText}>✕</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })
          ) : (
            // 이미지가 없는 경우
            <View style={thumbnailStyle.emptyStackItem}>
              <Image source={Camera} style={thumbnailStyle.emptyStackImage} />
            </View>
          )}
        </View>

        {/* 이미지 추가 버튼 */}
        {/* 최대 이미지 수를 초과하지 않으면 추가 버튼 표시 */}
        {imageUris.length < MAX_IMAGES && (
          <TouchableOpacity
            style={buttonStyle.addPhotoButton}
            onPress={handleCapture}
          >
            <Text style={buttonStyle.addPhotoText}>사진 추가하기</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* AI 분석 버튼 */}
      <View style={buttonStyle.buttonContainer}>
        <TouchableOpacity
          style={[
            buttonStyle.captureButton,
            imageUris.length === 0 && buttonStyle.disabledButton,
          ]}
          onPress={handleAnalyze}
          disabled={imageUris.length === 0}
        >
          <Text style={buttonStyle.buttonText}>분석하기</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: customFonts.nanumHana,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});

const thumbnailStyle = StyleSheet.create({
  thumbnailContainer: {
    width: '100%',
    height: 150, // 스택 높이를 명확하게 지정
    position: 'relative', // 자식 요소의 absolute 포지셔닝을 위함
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    // width: '100%',
    // height: '100%',
    // resizeMode: 'cover',
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: green[400],
  },
  stackedItem: {
    // 스택 효과를 위해 상단에서 겹치도록 배치
    position: 'absolute',
    // 기본 z-index 및 위치 값들은 호출 시 동적으로 적용
    borderColor: 'red',
    borderWidth: 2,
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: gray[100],
  },
  emptyStackItem: {
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 10,
    borderColor: gray[200],
    borderWidth: 2,
    backgroundColor: gray[100],
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStackImage: {
    width: 32,
    height: 32,
  },
});

const buttonStyle = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  captureButton: {
    width: '100%',
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
  disabledButton: {
    opacity: 0.5,
  },
  confirmButton: {
    backgroundColor: green[500],
  },
  buttonText: {
    color: gray[100],
    fontSize: 24,
    fontFamily: customFonts.nanumHana,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: gray[900],
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: customFonts.nanumHana,
  },
  addPhotoButton: {
    borderRadius: 20,
    padding: 8,
    borderColor: gray[100],
    borderWidth: 1,
    backgroundColor: gray[100],
    shadowColor: gray[900],
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 50,
  },
  addPhotoText: {
    fontSize: 20,
    color: gray[500],
    fontFamily: customFonts.nanumHana,
  },
});

export default CaptureScreen;
