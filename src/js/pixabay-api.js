import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const container = document.querySelector('container');

const options = { method: 'GET' };
const API_KEY = '45147494-75a7f96365cbfb286af0bc26b';
const API_URL = 'https://pixabay.com/api/?';

export async function getGallery(queryValue) {
    try {
      const searchParams = new URLSearchParams({
        key: API_KEY,
        q: queryValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      });
  
      console.log(":" + API_URL + searchParams);

      const response = await fetch(API_URL + searchParams, options).then();
      if (response === '') {
        iziToast.info('Sorry, there are no images matching your search query. Please try again!');
            return {
                total: 0,
                totalHits: 0,
                hits: []
            };
        }
        return await response.json();
    } catch (err) {
        iziToast.error({ title: 'Error', message: 'Something went wrong. Please try again later.' });
    }

    return null;
  }
