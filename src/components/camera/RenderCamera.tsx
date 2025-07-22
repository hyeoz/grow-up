import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import { CameraOverlay } from '@/components/camera';
import { RenderCameraProps } from '@/types';

export const RenderCamera = forwardRef<Camera, RenderCameraProps>(
  ({ isCameraVisible, device }, ref) => {
    const localRef = useRef<Camera>(null);
    const [isReady, setIsReady] = useState(false);

    // 컴포넌트 마운트 이후에 ref 상태 확인
    useEffect(() => {
      if (localRef.current) {
        console.log('Camera local ref is available:', localRef.current);
        setIsReady(true);
      } else {
        console.log('Camera local ref is null');
      }
    }, [localRef]);

    // 부모 컴포넌트에 ref 노출
    useImperativeHandle(
      ref,
      () => {
        console.log('Exposing camera ref:', localRef.current);
        // Camera 인스턴스의 모든 메서드를 부모에게 노출
        return localRef.current as Camera;
      },
      [localRef], // localRef.current가 변경될 때마다 업데이트
    );

    if (!device || !isReady) return null;

    return (
      <View style={styles.container}>
        <Camera
          ref={localRef}
          device={device}
          isActive={isCameraVisible}
          photo={true}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
