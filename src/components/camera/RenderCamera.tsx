import { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Alert } from 'react-native';
import { Camera, useCameraPermission } from 'react-native-vision-camera';

import { CameraOverlay } from '@/components/camera';
import { RenderCameraProps } from '@/types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const RenderCamera = forwardRef<Camera, RenderCameraProps>(
  ({ isCameraVisible, device }, ref) => {
    const localRef = useRef<Camera>(null);

    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
      // 권한이 없으면 요청
      if (!hasPermission) {
        requestPermission();
      }
    }, [hasPermission, requestPermission]);

    // 부모 컴포넌트에 ref 노출
    useImperativeHandle(
      ref,
      () => {
        // Camera 인스턴스의 모든 메서드를 부모에게 노출
        if (localRef.current) {
          return localRef.current as Camera;
        }
        return null as any;
      },
      [],
    );

    // device가 없을 때만 null 반환
    if (!device) {
      Alert.alert('Error!', '카메라를 찾을 수 없습니다.');
      return null;
    }

    // 권한이 없는 경우 처리
    if (!hasPermission) {
      Alert.alert(
        'Error!',
        '카메라 권한이 필요합니다. 앱을 종료하고 권한을 설정해주세요.',
      );
      return null;
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={localRef}
          device={device}
          isActive={isCameraVisible}
          photo={true}
          video={false}
          audio={false}
          style={styles.camera}
        />
        {/* 카메라 가이드라인 오버레이 */}
        <CameraOverlay />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8, // 화면 높이의 80%
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // 배경색 추가
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
