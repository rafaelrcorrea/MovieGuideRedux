import { StyleSheet } from 'react-native';
import colors from '../../../../utils/colors';
import metrics from '../../../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    // height: 120,
    width: 200,
    // backgroundColor: colors.black,
    borderRadius: 5,
    marginRight: metrics.baseMargin * 2,
    // marginHorizontal: metrics.basePadding / 2,
  },
  firstItemMargin: {
    marginLeft: metrics.baseMargin * 2,
  },
  listTraillers: {
    // height: 170,
    marginTop: metrics.baseMargin * 2,
    // marginLeft: metrics.basePadding,
  },
  traillerView: {
    borderRadius: 10,
    backgroundColor: colors.black,
    minHeight: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    color: colors.white,
  },

  priceText: {
    fontWeight: 'bold',
  },
  priceTextBefore: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  traillerName: {
    // paddingTop: metrics.basePadding / 2,
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
