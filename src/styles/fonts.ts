import { Platform } from 'react-native';

export const customFonts = {
  // 플랫폼별로 다르게 참조할 수 있도록 설정
  nanumHana: Platform.select({
    ios: 'NanumHaNaSonGeurSsi', // 폰트의 post script name 을 사용해야함
    android: 'Nanum_hana',
  }),
  nanumSquareRound: Platform.select({
    ios: 'NanumSquareRoundOTF',
    android: 'NanumSquareRound',
  }),
};
