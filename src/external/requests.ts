import axios from 'axios';
import config from '../config';


export const anchorRequests = axios.create({
  baseURL: 'https://api.sandbox.getanchor.co/api/v1',
  headers: {
    // 'Authorization': `Bearer ${config().}`
  }
});