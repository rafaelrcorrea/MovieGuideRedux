import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import metrics from '../../utils/metrics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent,
    flexDirection: 'column',
    width: '100%',
  },
  scrollContainer: {
    // marginTop: metrics.baseMargin * 4,
    flex: 1,
    // backgroundColor: colors.green,
  },
  listContainer: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // alignSelf: 'stretch',
  },
  imageBackground: {
    flex: 1,
    // width: null,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#03A9F4',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  bar: {
    marginTop: 28,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: metrics.basePadding,
  },
  headTop: {
    height: 32,
    backgroundColor: colors.primary,
  },
  leftHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  middleHeader: {
    flex: 10,
    alignItems: 'center',
  },
  rightHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,

  },
  headBottom: {
    height: 32,
  },
  title: {
    backgroundColor: colors.transparent,
    color: colors.white,
    fontSize: 18,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: 250,
    resizeMode: 'cover',
  },
  titleText: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 20,
    // alignSelf: 'flex-start',
  },
  headerInformation: {
    marginTop: metrics.baseMargin,
    width: metrics.screenWidth,
    paddingHorizontal: metrics.basePadding,
    flexDirection: 'row',
  },
  descriptionContainer: {
    width: 0,
    flexGrow: 1,
    // marginLeft: metrics.baseMargin,
  },
  detailsContainer: {
    marginLeft: metrics.baseMargin,
  },
  posterImage: {
    height: 150,
    width: 100,  
  },
  descriptionItem: {
    marginBottom: metrics.baseMargin,
  },
  descriptionTitle: {
    fontWeight: 'bold',
  },
  descriptionText: {
    flexWrap: 'wrap',
    color: colors.darkGray,
    fontStyle: 'italic',
    marginTop: metrics.baseMargin / 3,
  },
  starStyle: {
    width: 100,
    height: 20,
    marginBottom: 20,
  },
});

export default styles;