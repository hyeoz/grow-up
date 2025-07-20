import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { green, ivory } from '@/styles/palette';
import { globalTextStyle } from '@/styles/fonts';

interface CaptureScreenProps {
  onCapture: (imageUri: string) => void;
}

const CaptureScreen: React.FC<CaptureScreenProps> = ({ onCapture }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // In a real app, this would use the camera API
  const handleCapture = () => {
    // Mock image capture - in a real app, this would capture from camera
    const mockImageUri = 'https://via.placeholder.com/300';
    setImageUri(mockImageUri);
  };

  const handleConfirm = () => {
    if (imageUri) {
      onCapture(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>사진 찍기</Text>

      <View style={styles.previewContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <View style={styles.placeholderPreview}>
            <Text>카메라를 눌러 사진을 촬영하세요</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.buttonText}>사진 촬영</Text>
        </TouchableOpacity>

        {imageUri && (
          <TouchableOpacity
            style={[styles.captureButton, styles.confirmButton]}
            onPress={handleConfirm}
          >
            <Text style={styles.buttonText}>이 사진 사용하기</Text>
          </TouchableOpacity>
        )}
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
    ...globalTextStyle,
  },
  previewContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderPreview: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    ...globalTextStyle,
  },
  buttonContainer: {
    gap: 10,
  },
  captureButton: {
    backgroundColor: green[200],
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: green[400],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    ...globalTextStyle,
  },
});

export default CaptureScreen;
