import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import axios from 'axios';

const form = document.querySelector('.feedback-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.wrap-loader');
const loadMoreBtn = document.querySelector('.button-load-more');
const loaderMore = document.querySelector('.wrap-loader-more');
const searchBtn = document.querySelector('.form-button');

let searchBar = '';
let maxPage = 0;

// axios.defaults.baseURL = 'https://pixabay.com/';

let page = 1;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearch);

async function fetchImages(searchBar, page = 1) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '42046594-dc9dc59be7e95573d854c379a',
      q: `${searchBar}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page,
      per_page: 15,
    },
  });
  return response.data;
}

async function onSearch(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchBtn.disabled = true;

  const form = e.currentTarget;
  searchBar = form.elements.search.value.trim();
  if (searchBar === '') {
    searchBtn.disabled = false;
    return iziToast.show({
      message: 'Please add value!',
      messageColor: '#FAFAFB',
      messageSize: '16px',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  }

  try {
    const { hits, totalHits } = await fetchImages(searchBar);
    loader.classList.remove('is-hidden');
    maxPage = Math.ceil(totalHits / 15);

    if (hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
    } else {
      createGallery(hits);
      lightbox.refresh();

      loadMoreBtn.classList.remove('is-hidden');
      loadMoreBtn.addEventListener('click', handleLoadeMore);
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('is-hidden');

    form.reset;
    searchBtn.disabled = false;
  }
}

async function handleLoadeMore(e) {
  page += 1;
  loaderMore.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

  try {
    const { hits } = await fetchImages(searchBar, page);

    createGallery(hits);
    lightbox.refresh();

    const { height } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy(0, height * 2);
  } catch (error) {
    console.log(error);
  } finally {
    loaderMore.classList.add('is-hidden');
    loadMoreBtn.classList.remove('is-hidden');
    if (maxPage === page) {
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', handleLoadeMore);
    }
  }
}

function createGallery(hits) {
  const marcup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
           <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />

            <ul class = "description-list">

              <li class = "description-item">
               <h3 class = "description-title">Likes</h3>
               <p class = "description-text">${likes}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Views</h3>
               <p class = "description-text">${views}</p>
              </li>
          
              <li class = "description-item">
               <h3 class = "description-title">Comments</h3>
               <p class = "description-text">${comments}</p>
              </li>

              <li class = "description-item">
               <h3 class = "description-title">Downloads</h3>
               <p class = "description-text">${downloads}</p>
               </li>
          
             </ul>
           </a>

      </li>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', marcup);
}
