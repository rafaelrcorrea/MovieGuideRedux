import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, Text, Platform, View, Animated, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MovieActions } from '../../store/ducks/movie';
import styles from './styles'
import Traillers from './components/Traillers'
import FastImage from 'react-native-fast-image';
import Star from 'react-native-star-view';
import { ConvertToDate } from '../../utils/functions';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 103;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class MovieDetail extends Component {

  state = {
    scrollY: new Animated.Value(
      Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
    ),
  }

  componentDidMount() {
    const { getRequestMovieApiList } = this.props;
    const { params } = this.props.navigation.state;
    getRequestMovieApiList({ movieId: params.data.id });
  }

  componentWillUnmount() {
    const { clearMovieApiList } = this.props;
    clearMovieApiList();
  }

  getGenresToString = (genres) => {
    if(!genres) { return ''; }
    const resultGenres = genres.reduce((finalResult, item) => {
      if(finalResult) {
        return finalResult += ', '+ item.name;
      } else {
        return finalResult = item.name;
      }
    }, undefined);
    return resultGenres;
  }

  renderImage = (image_path, customStyle) => {
    if (image_path) {
      return (<FastImage
        style={customStyle}
        source={{ 
          uri: `https://image.tmdb.org/t/p/w500/${image_path}`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />);
    } else {
      return(<Image
        style={customStyle}
        source={ require('../../assets/noimage.png') }
        resizeMode="contain"
      />);
    }
  }

  renderBackButton() {
    const { navigation } = this.props;
    return (
      <View style={styles.backButtonView}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <Text style={styles.backText}>
            <Icon name="chevron-left" size={24} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    const imageBlur = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 5],
      extrapolate: 'clamp',
    });

    const textTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const textSize = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [28, 20],
      extrapolate: 'clamp',
    });

    const { navigation } = this.props;
    const { movie, params } = navigation.state;
    const { movieDetail } = this.props.movie;
    const { data } = params;
    
    return (
      <View style={styles.container}> 
        <ScrollView
          style={styles.scrollContainer}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
          )}
        >
          <View style={{marginTop: HEADER_MAX_HEIGHT}}>
            <View style={styles.headerInformation}>
              {this.renderImage(movieDetail.poster_path, styles.posterImage)}
              <View style={[styles.descriptionContainer, styles.detailsContainer]}>
                <View style={styles.descriptionItem}>
                  <Text style={styles.descriptionTitle}>
                    Year
                  </Text>
                  <Text 
                    style={styles.descriptionText}
                    adjustsFontSizeToFit={true}
                  >
                    {ConvertToDate(movieDetail.release_date)}
                  </Text>
                </View>
                <View style={styles.descriptionItem}>
                  <Text style={styles.descriptionTitle}>
                    Genres
                  </Text>
                  <Text 
                    style={styles.descriptionText}
                    adjustsFontSizeToFit={true}
                  >
                    {this.getGenresToString(movieDetail.genres)}
                  </Text>
                </View>
                <View style={styles.descriptionItem}>
                  <Text style={styles.descriptionTitle}>
                    Rating
                  </Text>
                  {movieDetail.vote_average ? <Star score={movieDetail.vote_average} totalScore={10} style={styles.starStyle}/> : null }
                </View>
              </View>
            </View>

            <View style={styles.headerInformation}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>
                  Synopsis
                </Text>
                <Text 
                  style={styles.descriptionText}
                  adjustsFontSizeToFit={true}
                >
                  {movieDetail.overview}
                </Text>
              </View>
            </View>
            <Traillers data={movieDetail.videos} />
          </View>
        </ScrollView>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image
            blurRadius={imageBlur}
            style={[
              styles.backgroundImage,
              { 
                transform: [{ translateY: imageTranslate }] },
            ]}
            source={{ 
              uri: `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`,
            }}
          />
          <View
            style={styles.container}
          >
          <Animated.View style={[styles.headTop, { opacity: textTranslate, transform: [{ translateX: textTranslate }] }]}>
          </Animated.View>
            <View style={styles.bar}>
              
              <Animated.View style={[styles.leftHeader]}>
                <View style={styles.backButtonView}>
                  <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                    <Animated.Text
                      adjustsFontSizeToFit
                      minimumFontScale={.5}
                      allowFontScaling
                      style={[styles.titleText, {fontSize: textSize}]}
                    >
                      <Icon name="chevron-left" size={24} />
                    </Animated.Text >
                  </TouchableOpacity>
                </View>
              </Animated.View>
              <Animated.View style={[styles.middleHeader]}>
                <Animated.Text 
                  style={[styles.titleText, {fontSize: textSize}]}
                >
                  {data.title}
                </Animated.Text>
              </Animated.View>
              <Animated.View style={[styles.rightHeader, { opacity: textTranslate, transform: [{ translateX: textTranslate }] }]}>
              </Animated.View>
              
            </View>
            <Animated.View style={[styles.headBottom, { opacity: textTranslate, transform: [{ translateX: textTranslate }] }]}>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

MovieDetail.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
  })};

function mapStateToProps(state) {
  return {
    movie: state.movie,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MovieActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);