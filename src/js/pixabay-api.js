import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '33287661-e60aebe6a2e676af85a18e745';

  constructor() {
    this.page = null;
    this.query = null;
  }
  findPhotosByQuery() {
    const searchParams = {
      params: {
        key: PixabayAPI.API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
      },
    };

    return axios.get(`${PixabayAPI.BASE_URL}`, searchParams);
  }
}
