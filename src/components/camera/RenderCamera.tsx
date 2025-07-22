import { StyleSheet } from 'react-native';
import { Camera } from 'react-native-vision-camera';

import { CameraOverlay } from '@/components/camera';
import { RenderCameraProps } from '@/types';

export const RenderCamera = ({
  isCameraVisible,
  device,
  cameraRef,
}: RenderCameraProps) => {
  if (!cameraRef.current) return null;

  return (
    <>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isCameraVisible}
        photo={true}
      />
      {/* 카메라 가이드라인 오버레이 */}
      <CameraOverlay />
    </>
  );
};
