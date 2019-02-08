import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MovieActions } from '../../store/ducks/movie';
import styles from './styles'
import MovieItemList from '../../components/MovieItemList'

class Search extends Component {

  state = {
    searchString: '',
    page: 1,
    showResultsNumber: true,
  }

  componentDidMount() {
    const { movie, getRequestGenresApiList } = this.props;
    getRequestGenresApiList();
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

  submitSearchRequest = () => {
    const { searchString } = this.state;
    if(searchString === '') return;
    this.setState({page: 1, showResultsNumber: true});
    this.loadMovies();
  }

  loadMovies = () => {
    const { searchString, page } = this.state;
    const { movie, getRequestSearchMoviesApiList } = this.props;
    if(searchString === '') return;
    if(page > movie.search.total_pages) return;
    getRequestSearchMoviesApiList({
      searchString,
      page,
    });
    this.setState({page: page+1});
  }

  render() {

    const { movie, navigation } = this.props;
    const { showResultsNumber } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <TextInput
            style={styles.inputSearch}
            placeholder='Type to search'
            onChangeText={key => this.setState({searchString: key})}
            onSubmitEditing={() => { this.submitSearchRequest() }}
          />
          { showResultsNumber ? (<Text style={styles.resultsNumberText}>Results ({movie.search.total_results})</Text>) : null }
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={movie.search.results}
          renderItem={({item}) => (<MovieItemList 
            key={Math.random()}
            movie={item}
            genres={this.getGenresByIds(item.genre_ids)}
            navigation={navigation}
          />)}
          onEndReached={this.loadMovies}
          onEndReachedThreshold={0.1}
          // ListFooterComponent={(<View />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);