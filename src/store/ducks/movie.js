import Immutable from 'seamless-immutable';

export const Types = {
  GET_REQUEST_MOVIE_API_LIST: 'movie/GET_REQUEST_API_LIST',
  GET_SUCCESS_MOVIE_API_LIST: 'movie/GET_SUCCESS_API_LIST',  
  GET_FAILURE_MOVIE_API_LIST: 'movie/GET_FAILURE_API_LIST',
  GET_REQUEST_MOVIE_API_LIST: 'movie/CLEAR_REQUEST_API_LIST',
  
  GET_REQUEST_MOVIE_VIDEOS_API_LIST: 'movie/GET_REQUEST_VIDEOS_API_LIST',
  GET_SUCCESS_MOVIE_VIDEOS_API_LIST: 'movie/GET_SUCCESS_VIDEOS_API_LIST',  
  GET_FAILURE_MOVIE_VIDEOS_API_LIST: 'movie/GET_FAILURE_VIDEOS_API_LIST',

  GET_REQUEST_MOVIES_API_LIST: 'movies/GET_REQUEST_API_LIST',
  GET_SUCCESS_MOVIES_API_LIST: 'movies/GET_SUCCESS_API_LIST',  
  GET_FAILURE_MOVIES_API_LIST: 'movies/GET_FAILURE_API_LIST',

  GET_REQUEST_SEARCH_MOVIES_API_LIST: 'movies/GET_REQUEST_SEARCH_API_LIST',
  GET_SUCCESS_SEARCH_MOVIES_API_LIST: 'movies/GET_SUCCESS_SEARCH_API_LIST',  
  GET_FAILURE_SEARCH_MOVIES_API_LIST: 'movies/GET_FAILURE_SEARCH_API_LIST',

  GET_REQUEST_GENRES_API_LIST: 'genres/GET_REQUEST_API_LIST',
  GET_SUCCESS_GENRES_API_LIST: 'genres/GET_SUCCESS_API_LIST',  
  GET_FAILURE_GENRES_API_LIST: 'genres/GET_FAILURE_API_LIST',
}

const initialState = Immutable({
  data: {
    results: [],
    total_pages: 1,
    page: 1,
  },
  search: {
    results: [],
    total_pages: 1,
    total_results: 0,
    page: 1,
  },
  movieDetail: {},
  genres: [],
  loading: false,
  error: null,
});

export default function movie(state = initialState, action) {
  switch (action.type) {
    case Types.GET_REQUEST_MOVIE_API_LIST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS_MOVIE_API_LIST:
      return { ...state, movieDetail: action.payload.data, loading: false, error: null }
    case Types.GET_FAILURE_MOVIE_API_LIST:
      return { ...state, movieDetail: {}, loading: false, error: action.payload.error }
    case Types.CLEAR_REQUEST_MOVIE_API_LIST:
        return { ...state, movieDetail: {} };

    case Types.GET_REQUEST_MOVIE_VIDEOS_API_LIST:
      return { ...state, loading: true };
    case Types.GET_SUCCESS_MOVIE_VIDEOS_API_LIST:
      return { ...state, movieDetail: {...state.movieDetail, videos: action.payload.data}, loading: false, error: null }
    case Types.GET_FAILURE_MOVIE_VIDEOS_API_LIST:
      return { ...state, movieDetail: {}, loading: false, error: action.payload.error }

    case Types.GET_REQUEST_MOVIES_API_LIST:
      if(action.payload.page === 1) {
        return { ...state, data: {...state.data, results: [], page: action.payload.page }, loading: true };
      } else {
        return { ...state, data: {...state.data, page: action.payload.page }, loading: true };
      }
    case Types.GET_SUCCESS_MOVIES_API_LIST:
      const data = {
        ...state.data,
        total_pages: action.payload.data.total_pages,
        total_results: action.payload.data.total_results,
        results: [...state.data.results, ...action.payload.data.results],
      };
      return { ...state, data, loading: false, error: null }
    case Types.GET_FAILURE_MOVIES_API_LIST:
      return { ...state, loading: false, error: action.payload.error }

    case Types.GET_REQUEST_SEARCH_MOVIES_API_LIST:
      if(action.payload.page === 1) {
        return { ...state, search: {...state.search, results: [], page: action.payload.page }, loading: true };
      } else {
        return { ...state, search: {...state.search, page: action.payload.page }, loading: true };
      }
    case Types.GET_SUCCESS_SEARCH_MOVIES_API_LIST:
      const searchData = {
        ...state.search,
        total_pages: action.payload.data.total_pages,
        total_results: action.payload.data.total_results,
        results: [...state.search.results, ...action.payload.data.results],
      };
      return { ...state, search: searchData, loading: false, error: null }
    case Types.GET_FAILURE_SEARCH_MOVIES_API_LIST:
      return { ...state, loading: false, error: action.payload.error }

    case Types.GET_REQUEST_GENRES_API_LIST:
      return { ...state };
    case Types.GET_SUCCESS_GENRES_API_LIST:
      return { ...state, genres: action.payload.data }
    case Types.GET_FAILURE_MOVIES_API_LIST:
      return { ...state, data: action.payload.data, loading: false, error: action.payload.error }

    default:
      return state;
  }
}

export const Creators = {
  //API GET SINGLE MOVIE
  getRequestMovieApiList: (data) => ({
    type: Types.GET_REQUEST_MOVIE_API_LIST,
    payload: data,
  }),
  getSuccessMovieApiList: (data) => ({
    type: Types.GET_SUCCESS_MOVIE_API_LIST,
    payload: {
      data,
    }
  }),
  getFailureMovieApiList: (error) => ({
    type: Types.GET_FAILURE_MOVIE_API_LIST,
    payload: {
      error,
    },
  }),
  clearMovieApiList: (data) => ({
    type: Types.GET_REQUEST_MOVIE_API_LIST,
    payload: data,
  }),

  getRequestMovieVideosApiList: (data) => ({
    type: Types.GET_REQUEST_MOVIE_VIDEOS_API_LIST,
    payload: data,
  }),
  getSuccessMovieVideosApiList: (data) => ({
    type: Types.GET_SUCCESS_MOVIE_VIDEOS_API_LIST,
    payload: {
      data,
    }
  }),
  getFailureMovieVideosApiList: (error) => ({
    type: Types.GET_FAILURE_MOVIE_VIDEOS_API_LIST,
    payload: {
      error,
    },
  }),

  // API REQUEST DISCOVER
  getRequestMoviesApiList: (data) => ({
    type: Types.GET_REQUEST_MOVIES_API_LIST,
    payload: data,
  }),
  getSuccessMoviesApiList: (data) => ({
    type: Types.GET_SUCCESS_MOVIES_API_LIST,
    payload: {
      data,
    }
  }),
  getFailureMoviesApiList: (error) => ({
    type: Types.GET_FAILURE_MOVIES_API_LIST,
    payload: {
      error,
    },
  }),

  // API REQUEST SEARCH MOVIES
  getRequestSearchMoviesApiList: (data) => ({
    type: Types.GET_REQUEST_SEARCH_MOVIES_API_LIST,
    payload: data,
  }),
  getSuccessSearchMoviesApiList: (data) => ({
    type: Types.GET_SUCCESS_SEARCH_MOVIES_API_LIST,
    payload: {
      data,
    }
  }),
  getFailureSearchMoviesApiList: (error) => ({
    type: Types.GET_FAILURE_SEARCH_MOVIES_API_LIST,
    payload: {
      error,
    },
  }),

  // API REQUEST GENRES
  getRequestGenresApiList: () => ({
    type: Types.GET_REQUEST_GENRES_API_LIST,
  }),
  getSuccessGenresApiList: (data) => ({
    type: Types.GET_SUCCESS_GENRES_API_LIST,
    payload: {
      data,
    }
  }),
  getFailureGenresApiList: (error) => ({
      type: Types.GET_FAILURE_GENRES_API_LIST,
      payload: {
        error,
      }
  }),
};