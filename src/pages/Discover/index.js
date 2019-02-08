import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MovieActions } from '../../store/ducks/movie';
import styles from './styles'
import MovieItemList from '../../components/MovieItemList'

class Discover extends Component {

  state = {
    page: 1,
  }

  componentDidMount() {
    const { movie, getRequestMoviesApiList, getRequestGenresApiList } = this.props;
    if(movie.genres.length === 0) {
      getRequestGenresApiList();
    }
    this.loadMovies();
  }

  getGenresByIds = (ids) => {
    const { movie } = this.props;
    const resultGenres = ids.reduce((finalResult, id) => {
      const value = movie.genres.find(obj => {
        return obj.id === id
      });
      if(finalResult) {
        return finalResult += ', '+ value.name;
      } else {
        return finalResult = value.name;
      }
    }, undefined);
    return resultGenres;
  }

  loadMovies = () => {
    const { page } = this.state;
    const { movie, getRequestMoviesApiList } = this.props;
    if(page > movie.data.total_pages) return;
    getRequestMoviesApiList({
      page,
    });
    this.setState({page: page+1});
  }

  render() {

    const { movie, navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <Text style={styles.titlePage}>Discover</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={movie.data.results}
          renderItem={({item}) => (<MovieItemList 
            movie={item}
            genres={this.getGenresByIds(item.genre_ids)}
            navigation={navigation}
          />)}
          onEndReached={this.loadMovies}
          onEndReachedThreshold={0.1}
          ListFooterComponent={(<View />)}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    movie: state.movie,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MovieActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);