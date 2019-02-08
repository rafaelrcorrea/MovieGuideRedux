import { StyleSheet } from 'react-native';
import metrics from '../../utils/metrics';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: metrics.screenWidth,
    height: 180,
    paddingHorizontal: metrics.basePadding * 2,
  },
  movieImage: {
    height: 150,
    width: 100,
  },
  movieImageNotFound: {
    height: 150,
    width: 100,
  },
  movieInformation: {
    width: 0,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: metrics.title,
    flexWrap: 'wrap',
    paddingRight: metrics.basePadding,
  },
  movieDetails: {
    fontSize: metrics.title2,
    color: colors.darkGray,
    fontWeight: 'bold',
  }
});

export default styles;