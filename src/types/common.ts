export type AppScreen = 'landing' | 'capture' | 'processing' | 'result';

export type LandingScreenProps = {
  onGetStarted: () => void;
};

export type ProcessingScreenProps = {
  imageUris: string[];
  onProcessingComplete: (result: ResultResponseType) => void;
  setCurrentScreen: (screen: AppScreen) => void;
};

export type ResultScreenProps = {
  analysisResult: ResultResponseType;
  onRestart: () => void;
};

export type ResultResponseType = {
  resStatus: 'success' | 'fail';
  name: string; // 예상되는 식물 이름
  state: string; // 식물 영양 상태
  growthRate: string; // 성장률
  careTip: string; // 관리 팁
  message?: string; // 메시지
};
