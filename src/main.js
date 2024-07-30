import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getGallery } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const container = document.querySelector('container');

form.addEventListener("submit", handleSearch);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const queryValue = form.elements['search-input'].value.trim().toLowerCase();

  if (queryValue === '') {
    iziToast.error({ position: 'topRight', messageColor:  'white', backgroundColor: 'red', title: 'Error', message: 'Search field cannot be empty!' });
    return;
  }

  gallery.innerHTML = '';
  iziToast.info({ position: 'topRight', messageColor:  'white', backgroundColor: 'SpringGreen', title: 'Loading', message: 'Searching for images...' });

  try {
    const resJson = await getGallery(queryValue);
    // if (resJson !== null && resJson !== undefined && resJson.hits !== null && 
    //     resJson.hits !== undefined && resJson.hits.length > 0)
    if (resJson?.hits?.length > 0) {
        renderGallery(resJson.hits);
        // const lightbox = new SimpleLightbox('.gallery-item a', {});
        // lightbox.refresh();
    } else {
      
        iziToast.warning({ position: 'topRight', messageColor:  'white', backgroundColor: 'coral', title: 'No results', message: 'Sorry, there are no images matching your search query. Please try again!' });
    }
  } catch (error) {
     iziToast.error({ position: 'topRight', messageColor:  'white', backgroundColor: 'Salmon', title: 'Error', message: 'Something went wrong. Please try again later.' });
  }
}

//   getGallery(queryValue) 
//     .then(renderGallery) 
//     .catch(onFetchError) 
//     .finally(() => form.reset());

//     function onFetchError() {
        
//       }

      

// async function run(){
//     const regFromApi = await getGallery('yellow+flowers').then();
// }

// run();