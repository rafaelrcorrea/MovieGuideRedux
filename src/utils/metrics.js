import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  basePadding: 20,
  baseMargin: 10,
  baseRadiusLight: 3,
  baseRadiusNormal: 5,
  baseRadiusHeavy: 7,
  baseRadiusSuperHeavy: 10,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  iconHeaderHeight: 48,
  titlePage: 28,
  title: 18,
  title2: 10,
  headerHeight: 48,
};
