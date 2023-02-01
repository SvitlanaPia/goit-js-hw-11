import { PixabayAPI } from './pixabay-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createGalleryCards } from './templates/gallery-cards';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const pixabayApi = new PixabayAPI();
let gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const onSearchFormSubmit = async event => {
  event.preventDefault();

  pixabayApi.query = event.target.elements.searchQuery.value.trim();
  pixabayApi.page = 1;

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  try {
    const response = await pixabayApi.findPhotosByQuery();
    const { data } = response;

    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      event.target.reset();

      galleryListEl.innerHTML = '';

      loadMoreBtnEl.classList.add('is-hidden');

      return;
    }

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    if (data.totalHits > 40) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    galleryListEl.innerHTML = createGalleryCards(data.hits);

    gallery.refresh();
  } catch (err) {
    console.log(err);
  }
};

const onLoadMoreBtnClick = async event => {
  pixabayApi.page += 1;

  try {
    const response = await pixabayApi.findPhotosByQuery();
    const { data } = response;

    galleryListEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );

    gallery.refresh();

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (data.hits.length < 40) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
