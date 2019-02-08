import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { ConvertToDate } from '../../utils/functions';

const renderImage = (image_path) => {
  if (image_path) {
    return (<FastImage
      style={styles.movieImage}
      source={{ 
        uri: `https://image.tmdb.org/t/p/w500/${image_path}`,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />);
  } else {
    return(<Image
      style={styles.movieImageNotFound}
      source={ require('../../assets/noimage.png') }
      resizeMode="contain"
    />);
  }
}

const MovieItemList = ({ movie, genres, navigation }) => (
  <TouchableWithoutFeedback
    onPress={() => { navigation.navigate({ routeName: 'MovieDetail', params: { data: movie } }) }}
  >
    <View style={styles.container}>
      <View style={styles.movieInformation}>
        <Text
          style={styles.movieTitle}
          adjustsFontSizeToFit={true}
        >
          {movie.title}
        </Text>
        <View>
          <Text style={styles.movieDetails}>{genres}</Text>
        </View>
        <View>
          <Text style={styles.movieDetails}>{ConvertToDate(movie.release_date)}</Text>
        </View>

        
      </View>
      {renderImage(movie.poster_path)}
    </View>
  </TouchableWithoutFeedback>
)

export default MovieItemList;