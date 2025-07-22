import axios from 'axios';
import config from '../config';


export const anchorRequests = axios.create({
  baseURL: config().anchorBaseUrl,
  headers: {
    'x-anchor-key': config().anchorApiKey,
    // 'Authorization': `Bearer ${config().}`
  },
});