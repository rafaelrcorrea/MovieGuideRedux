import { all, takeLatest } from 'redux-saga/effects';

import { Types as MovieTypes } from '../ducks/movie';

import {
  getMoviesApiList,
  getMoviesSearchApiList,
  getGenresApiList,
  getMovieApiList,
  getMovieVideosApiList,
} from './movie';

export default function* rootSaga() {
  return yield all([
    takeLatest(MovieTypes.GET_REQUEST_MOVIES_API_LIST, getMoviesApiList),
    takeLatest(MovieTypes.GET_REQUEST_SEARCH_MOVIES_API_LIST, getMoviesSearchApiList),
    takeLatest(MovieTypes.GET_REQUEST_GENRES_API_LIST, getGenresApiList),
    takeLatest(MovieTypes.GET_REQUEST_MOVIE_API_LIST, getMovieApiList),
    takeLatest(MovieTypes.GET_REQUEST_MOVIE_VIDEOS_API_LIST, getMovieVideosApiList),
  ]);
}

