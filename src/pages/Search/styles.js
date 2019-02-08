import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import metrics from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.red,
    flexDirection: 'column',
  },
  containerHeader: {
    // alignSelf: 'flex-start',
    paddingHorizontal: metrics.basePadding * 2,
    paddingVertical: metrics.basePadding,
    width: metrics.screenWidth,
  },
  titlePage: {
    color: colors.primary,
    fontSize: metrics.titlePage,
    fontWeight: 'bold',
  },
  inputSearch: {
    width: '100%',
    paddingVertical: metrics.basePadding / 4,
    paddingLeft: metrics.baseMargin,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: metrics.baseRadiusNormal,
  },
  resultsNumberText: {
    marginTop: metrics.baseMargin,
    fontStyle: 'italic',
    color: colors.darkGray,
  },
});

export default styles;