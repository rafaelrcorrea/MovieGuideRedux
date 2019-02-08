import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  WebView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

// style={this.indexOf(l) == this.length-1 ? styles.fistItem}

const styleItems = [
  styles.container,
];

class Traillers extends React.Component {
  constructor(props) {
    super(props);
  }

  clickVideo = (key) => {
    this.setState({
      videoSelected: key
    })
  }

  state = {
    videoSelected: '',
  }

  renderVideo = (key) => {
    if(this.state.videoSelected === key){
      return (<WebView
        style={styles.traillerView}
        source={{ uri: `https://www.youtube.com/embed/${key}?start=0` }}
        startInLoadingState={true}
        useWebKit={true}
        mediaPlaybackRequiresUserAction={false}
        // renderLoading={this.renderLoading}
      />);
    } else {
      return (
        <ImageBackground
          source={{ uri: `https://img.youtube.com/vi/${key}/0.jpg` }}
          style={styles.traillerView}
          imageStyle={styles.productPicStyle}
        >
          <TouchableOpacity
            onPress={() => {this.clickVideo(key)}}
          >
            <Text style={styles.playButton}>
              <Icon name="play" size={36} />
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      );
    }
  }

  render() {
    const { data } = this.props;
    return (
      <ScrollView
        style={styles.listTraillers}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        { data ?
          data.results.map((l) => {
            return (
              <View
                key={l.id}
                style={[...styleItems, data.results.indexOf(l) === 0 ? styles.firstItemMargin : {}]}
              >
                {this.renderVideo(l.key)}
                <View style={styles.traillerName}>
                  <Text numberOfLines={1}>{l.name}</Text>
                </View>
              </View>
            );
          })
        : null }
      </ScrollView>
    );
  }
}

Traillers.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  )
})};

export default Traillers;
