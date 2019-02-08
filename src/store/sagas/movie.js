import api, { apiRequests, apiConstants } from '../../services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as MovieActions } from '../ducks/movie';
import { Alert } from 'react-native';
import { Buffer } from 'buffer';

export function* getGenresApiList() {
  try {
    const response = yield apiRequests.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiConstants.token}&language=en-US`);
    
    yield put(MovieActions.getSuccessGenresApiList(response.data.genres));
  } catch (err) {
    yield put(MovieActions.getFailureGenresApiList('Error trying to request API', err));
  }
}

export function* getMovieApiList(action) {
  try {
    const { movieId } = action.payload;
    const response = yield apiRequests.get(`/3/movie/${movieId}?api_key=${apiConstants.token}&language=en-US`);
    yield put(MovieActions.getSuccessMovieApiList(response.data));
    yield put(MovieActions.getRequestMovieVideosApiList({ movieId }));
  } catch (err) {
    yield put(MovieActions.getFailureMovieApiList('Error trying to request API', err));
  }
}

export function* getMovieVideosApiList(action) {
  try {
    const { movieId } = action.payload;
    const response = yield apiRequests.get(`/3/movie/${movieId}/videos?api_key=${apiConstants.token}&language=en-US`);
    yield put(MovieActions.getSuccessMovieVideosApiList(response.data));
  } catch (err) {
    yield put(MovieActions.getFailureMovieVideosApiList('Error trying to request API', err));
  }
}

export function* getMoviesApiList(action) {
  try {
    const { page } = action.payload;
    const response = yield apiRequests.get(`/3/discover/movie?api_key=${apiConstants.token}&language=en-US&page=${page}&include_adult=true&with_release_type=1|2|3|4|5|6|7`);

    yield put(MovieActions.getSuccessMoviesApiList(response.data));
  } catch (err) {
    yield put(MovieActions.getFailureMoviesApiList('Error trying to request API', err));
  }
}

export function* getMoviesSearchApiList(action) {
  try {
    const { searchString, page } = action.payload;
    const response = yield apiRequests.get(`/3/search/movie?api_key=${apiConstants.token}&include_adult=false&query=${searchString}&page=${page}`);
    yield put(MovieActions.getSuccessSearchMoviesApiList(response.data));
  } catch (err) {
    yield put(MovieActions.getFailureSearchMoviesApiList('Error trying to request API', err));
  }
}