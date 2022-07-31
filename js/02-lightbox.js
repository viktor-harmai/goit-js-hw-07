import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const refs = {
  galleryEl: document.querySelector('.gallery'),
};

//================================================================

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      
        <a class="gallery__item" href="${original}">
            <img 
              class="gallery__image"
              src="${preview}"
              alt="${description}"
              width="800"
              height="600"
            />
        </a>
        `;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery .gallery__item', {
  overlayOpacity: 1,
  captionsData: 'alt',
  captionDelay: 250,
});
