import axios from 'axios';

const API_BASE = 'https://pixabay.com/api/';
const API_KEY = '29734791-3fd561d0afce25ff9315d455c';
const PER_PAGE = 15;

const http = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: PER_PAGE,
  },
});

export async function fetchPixabayImages(query, page = 1) {
  const { data } = await http.get('', {
    params: {
      q: query.trim(),
      page,
    },
  });
  return data;
}
