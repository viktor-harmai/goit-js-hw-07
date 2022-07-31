import { galleryItems } from './gallery-items.js';
// Change code below this line
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
      <div class="gallery__item">
      <a class="gallery__link" href="${original}">
          <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"          
          />
      </a>
      </div>
      `;
    })
    .join('');
}
//============================================================

refs.galleryEl.addEventListener('click', onGalleryLinkClick);

let instance;

const modalTemplate = text =>
  `<div class="modal">
       <img
        class="modal__image"
        src="${text}"       
        />
    </div>`;

function onGalleryLinkClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const parentImgLink = e.target.closest('.gallery__link');
  const valueHref = parentImgLink.getAttribute('href');

  e.preventDefault();

  instance = basicLightbox.create(modalTemplate(valueHref), {
    onShow: instance => {
      instance.element().querySelector('.modal').onclick = instance.close;
      //console.log('modal-open');
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: instance => {
      //console.log('modal-close');
      window.removeEventListener('keydown', onEscKeyPress);
    },
  });

  instance.show();
}
//==========================================================

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    //console.log(e);
    instance.close();
  }
}
