import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';

import { RenderCamera } from '@/components/camera';
import { MAX_IMAGES, IMAGE_SPACING } from '@/utils/constants';
import { gray, green, ivory, customFonts } from '@/styles';
import { CaptureScreenProps } from '@/types';

import CameraIcon from '@/assets/images/disabled_camera.png';
import LeafScanning from '@/assets/images/leaf_scanning.gif';

const WIDTH = Dimensions.get('window').width;

export const CaptureScreen = ({ onCapture }: CaptureScreenProps) => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);
  const cameraRef = useRef<Camera>(null);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back'); // 후방카메라

  // 앱이 시작될 때 카메라 권한 요청
  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    })();
  }, [hasPermission, requestPermission]);

  // 사진 촬영 처리
  const handleCapture = () => {
    if (imageUris.length >= MAX_IMAGES) {
      Alert.alert(
        '최대 사진 수',
        `최대 ${MAX_IMAGES}장까지 촬영할 수 있습니다.`,
      );
      return;
    }

    // 카메라 모달 표시
    setIsCameraVisible(true);
    // NOTE test
    // const photoUri =
    //   'https://i.namu.wiki/i/-20QSrwYh8dN7C18GHjJlf9hem1qOsxA5Ea-4qCPSjTaSnd4Oq0UpuMU7Nk6kg2wVRvQHuROn6-c68EMKuwO2mc8R0_yil2jg5hTi9bPZxQtHM26ofk60t7aIPeCUf0Yhh4VzUM5Yk1EC5kZdEHyXw.webp';
    // setImageUris([...imageUris, photoUri]);
  };

  // 실제 사진 촬영
  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'auto',
        });

        // 파일 경로 생성
        // const photoUri =
        //   Platform.OS === 'ios' ? photo.path : `file://${photo.path}`;

        // 파일을 base64로 변환
        const base64Image = await RNFS.readFile(
          Platform.OS === 'ios' ? photo.path : `file://${photo.path}`,
          'base64',
        );

        // 'data:image/jpeg;base64,' prefix 추가 (웹 표준 형식)
        const base64ImageUri = `data:image/jpeg;base64,${base64Image}`;

        // base64 형식의 이미지 저장 (URI 대신)
        setImageUris([...imageUris, base64ImageUri]);

        setIsCameraVisible(false);
      } catch (error) {
        console.error('카메라 촬영 오류:', error);
        Alert.alert('오류', '사진 촬영 중 오류가 발생했습니다.');
      }
    }
  }, [cameraRef, imageUris]);

  // 분석 확인 처리 (카메라 버튼과 동일한 동작)
  const handleAnalyze = () => {
    if (imageUris.length > 0) {
      onCapture(imageUris);
    } else {
      Alert.alert('사진 필요', '적어도 한 장의 사진이 필요합니다.');
    }
  };

  // 이미지 삭제
  const handleDeleteImage = (index: number) => {
    const newImageUris = [...imageUris];
    newImageUris.splice(index, 1);
    setImageUris(newImageUris);
  };

  // 카메라 모달 닫기
  const closeCamera = () => {
    setIsCameraVisible(false);
  };

  const renderCameraSection = useMemo(() => {
    if (!isCameraVisible) return null;

    return (
      <View style={cameraStyle.modalOverlay}>
        <View style={cameraStyle.modalContainer}>
          <StatusBar barStyle="light-content" backgroundColor={gray[900]} />
          {device && hasPermission ? (
            <RenderCamera
              isCameraVisible={isCameraVisible}
              device={device}
              ref={cameraRef}
            />
          ) : (
            <View style={cameraStyle.noCameraContainer}>
              <View style={cameraStyle.photoContentContainer}>
                {!hasPermission ? (
                  <Text style={cameraStyle.noCameraText}>
                    {
                      '카메라 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.'
                    }
                  </Text>
                ) : (
                  <Image source={LeafScanning} />
                )}
              </View>
            </View>
          )}
          <View style={cameraStyle.takePhotoButtonContainer}>
            <View style={cameraStyle.takePhotoButton}>
              <TouchableOpacity
                style={cameraStyle.takePhotoTouchable}
                onPress={takePicture}
              >
                <View style={cameraStyle.takePhotoButtonInner} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={closeCamera}>
              <Text style={cameraStyle.cameraCloseText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }, [isCameraVisible, device, hasPermission, takePicture, cameraRef]);

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
              const indexedTop =
                index === 1 ? '56%' : index === 2 ? '60%' : '50%';
              const indexedLeft =
                (index === 1 ? 25 : index === 2 ? -25 : 0) +
                (WIDTH / 2 - IMAGE_SPACING); // padding 고려

              return (
                <View
                  key={`${uri}-${index}`}
                  style={[
                    thumbnailStyle.stackedItem,
                    {
                      top: indexedTop,
                      left: indexedLeft,
                      zIndex: imageUris.length + index,
                      transform: [
                        { translateX: '-50%' },
                        { translateY: '-50%' },
                        { rotate: `${rotateDeg}deg` },
                      ],
                    },
                  ]}
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
                </View>
              );
            })
          ) : (
            // 이미지가 없는 경우
            <View style={thumbnailStyle.emptyStackItem}>
              <Image
                source={CameraIcon}
                style={thumbnailStyle.emptyStackImage}
              />
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

      {/* 카메라 모달 */}
      {renderCameraSection}
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
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: gray[900],
  },
  cameraControlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  cameraCaptureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: gray[100],
  },
});

const thumbnailStyle = StyleSheet.create({
  thumbnailContainer: {
    flex: 1,
    width: '100%',

    position: 'relative', // 자식 요소의 absolute 포지셔닝을 위함
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  stackedItem: {
    // 스택 효과를 위해 상단에서 겹치도록 배치
    position: 'absolute',
    borderColor: gray[200],
    borderWidth: 2,
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: gray[100],
  },
  emptyStackItem: {
    width: 200,
    height: 200,
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
    borderRadius: 5,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gray[300],
  },
  deleteButtonText: {
    color: gray[900],
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: customFonts.nanumHana,
  },
  addPhotoButton: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: gray[100],
    borderWidth: 1,
    backgroundColor: gray[100],
    shadowColor: gray[900],
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    transform: [{ translateY: -128 }],
  },
  addPhotoText: {
    fontSize: 20,
    color: gray[500],
    fontFamily: customFonts.nanumHana,
  },
});

const cameraStyle = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 1000,
    elevation: 5,
    width: WIDTH,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  takePhotoButtonContainer: {
    backgroundColor: gray[100],
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  takePhotoButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePhotoTouchable: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: gray[500],
    position: 'relative',
  },
  takePhotoButtonInner: {
    width: 35,
    height: 35,
    borderRadius: 17.5, // 50% 대신 반지름의 절반 값 사용
    backgroundColor: gray[100],
    position: 'absolute',
    top: 7.5,
    right: 7.5,
  },
  photoContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCameraContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCameraText: {
    marginBottom: 20,
    paddingHorizontal: 20,
    color: gray[100],
    fontSize: 22,
    textAlign: 'center',
    fontFamily: customFonts.nanumSquareRound,
  },
  cameraCloseText: {
    color: gray[900],
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: customFonts.nanumSquareRound,
    width: 40,
    position: 'absolute',
    right: 20,
    transform: [{ translateY: '-50%' }],
  },
});
