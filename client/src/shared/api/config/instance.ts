import axios from 'axios';
import Config from 'react-native-config';

export const api = axios.create({
  baseURL: Config.API_URL ?? 'http://127.0.0.1:3001',
});
