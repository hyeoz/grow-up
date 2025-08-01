import { CameraDevice } from 'react-native-vision-camera';

export type CaptureScreenProps = {
  onCapture: (imageUris: string[]) => void;
};

export type RenderCameraProps = {
  isCameraVisible: boolean;
  device: CameraDevice;
};
