import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import metrics from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  containerHeader: {
    alignSelf: 'flex-start',
    paddingHorizontal: metrics.basePadding * 2,
    paddingVertical: metrics.basePadding,
  },
  titlePage: {
    color: colors.primary,
    fontSize: metrics.titlePage,
    fontWeight: 'bold',
  },
});

export default styles;