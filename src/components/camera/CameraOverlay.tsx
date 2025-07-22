import { StyleSheet, View } from 'react-native';

import { green } from '@/styles/palette';

export const CameraOverlay = () => {
  return (
    <View style={overlayStyle.container}>
      {/* 가이드라인 영역 */}
      <View style={overlayStyle.guidelineContainer}>
        {/* 좌측 상단 코너 */}
        <View style={[overlayStyle.corner, overlayStyle.topLeft]}>
          <View style={[overlayStyle.cornerBorder, overlayStyle.topBorder]} />
          <View style={[overlayStyle.cornerBorder, overlayStyle.leftBorder]} />
        </View>

        {/* 우측 상단 코너 */}
        <View style={[overlayStyle.corner, overlayStyle.topRight]}>
          <View style={[overlayStyle.cornerBorder, overlayStyle.topBorder]} />
          <View style={[overlayStyle.cornerBorder, overlayStyle.rightBorder]} />
        </View>

        {/* 좌측 하단 코너 */}
        <View style={[overlayStyle.corner, overlayStyle.bottomLeft]}>
          <View
            style={[overlayStyle.cornerBorder, overlayStyle.bottomBorder]}
          />
          <View style={[overlayStyle.cornerBorder, overlayStyle.leftBorder]} />
        </View>

        {/* 우측 하단 코너 */}
        <View style={[overlayStyle.corner, overlayStyle.bottomRight]}>
          <View
            style={[overlayStyle.cornerBorder, overlayStyle.bottomBorder]}
          />
          <View style={[overlayStyle.cornerBorder, overlayStyle.rightBorder]} />
        </View>
      </View>
    </View>
  );
};

// 카메라 가이드라인 스타일
const overlayStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: '-50%' }],
    left: 0,
    right: 0,
    bottom: 100, // 하단 버튼 영역 고려
    justifyContent: 'center',
    alignItems: 'center',
  },
  guidelineContainer: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  cornerBorder: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderColor: green[400],
    borderWidth: 3,
  },
  topLeft: {
    left: 0,
    top: 0,
  },
  topRight: {
    right: 0,
    top: 0,
  },
  bottomLeft: {
    left: 0,
    bottom: 0,
  },
  bottomRight: {
    right: 0,
    bottom: 0,
  },
  topBorder: {
    top: 0,
    left: 0,
    width: 40,
    height: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  bottomBorder: {
    bottom: 0,
    left: 0,
    width: 40,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  leftBorder: {
    top: 0,
    left: 0,
    width: 0,
    height: 40,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  rightBorder: {
    top: 0,
    right: 0,
    width: 0,
    height: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
});
