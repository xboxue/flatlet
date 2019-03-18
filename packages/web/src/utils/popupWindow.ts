import { Dimensions } from 'react-native';

export const popupWindow = (url: string, w: number = 500, h: number = 600) => {
  const { height, width } = Dimensions.get('screen');
  const top = (height - h) / 2;
  const left = (width - w) / 2;

  window.open(
    url,
    '_blank',
    `height=${h}, width=${w}, top=${top}, left=${left}`
  );
};
