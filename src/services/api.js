import { AsyncStorage } from "react-native";
import { Buffer } from 'buffer';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter'

const baseURL = 'https://api.themoviedb.org';
const token = '<<your_api_key>>';

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

const api = axios.create({
  baseURL,
  adapter: cache.adapter
});

const propHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache',
}

const parseJSON = response => response.json()

export const apiRequests = {
  get: (url, header) => {
    let headers = propHeaders;
    return call(api.get, url, headers);
  },
}

export const apiConstants = {
  token,
}

export default api;