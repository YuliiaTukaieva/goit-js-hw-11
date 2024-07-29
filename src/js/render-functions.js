import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.getElementById('gallery');

const lightbox = new SimpleLightbox('#gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });

export function renderGallery(images) {
    const imageGallery = images.map(image => `
      <a href="${image.largeImageURL}" class="container">
        <img src="${image.webformatURL}" alt="${image.tags}">
        <div class="info">
          <p>Likes: ${image.likes}</p>
          <p>Views: ${image.views}</p>
          <p>Comments: ${image.comments}</p>
          <p>Downloads: ${image.downloads}</p>
        </div>
      </a>
    `).join('');
    gallery.innerHTML = imageGallery;   
    lightbox.refresh();
  }
  