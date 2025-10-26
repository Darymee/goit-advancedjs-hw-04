import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPixabayImages } from './js/pixabay-api';
import { renderGalleryMarkup } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('.search-input'),
  submitBtn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader-wrapper'),
  loadMoreBtn: document.querySelector('.load-more-button'),
};
let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 200,
});

let query = '';
let page = 1;
let totalHits = 0;
let loaded = 0;

function showLoader() {
  refs.loader.classList.remove('visually-hidden');
}

function hideLoader() {
  refs.loader.classList.add('visually-hidden');
}

function toggleForm(disabled) {
  refs.input.disabled = disabled;
  refs.submitBtn.disabled = disabled;
  refs.loadMoreBtn.disabled = disabled;
}

function showLoadMore() {
  refs.loadMoreBtn.classList.remove('visually-hidden');
}

function hideLoadMore() {
  refs.loadMoreBtn.classList.add('visually-hidden');
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function appendImages(hits) {
  const markup = renderGalleryMarkup(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

function smoothScrollAfterAppend() {
  const firstCard = refs.gallery.querySelector('.gallery-item');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}

async function doSearch(newQuery, isLoadMore = false) {
  if (!isLoadMore) {
    // fresh search
    query = newQuery.trim();
    page = 1;
    totalHits = 0;
    loaded = 0;
    clearGallery();
    hideLoadMore();
  }

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  try {
    toggleForm(true);
    showLoader();

    const data = await fetchPixabayImages(query, page);
    const { hits = [], totalHits: total = 0 } = data;
    if (!isLoadMore) totalHits = total;

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadMore();
      return;
    }

    appendImages(hits);
    loaded += hits.length;

    // Decide on load more visibility
    if (loaded < totalHits) {
      showLoadMore();
    } else {
      hideLoadMore();
      if (isLoadMore) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }

    // Prepare for potential next page
    page += 1;

    if (isLoadMore) {
      smoothScrollAfterAppend();
    }
  } catch (err) {
    console.error(err);
    iziToast.error({
      message: 'Something went wrong. Please try again later',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    toggleForm(false);
  }
}

// Event listeners
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const value = refs.input.value;
  doSearch(value, false);
  refs.input.value = '';
});

refs.loadMoreBtn.addEventListener('click', () => {
  doSearch(query, true);
});
