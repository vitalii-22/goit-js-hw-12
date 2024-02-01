import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import axios from 'axios';

const form = document.querySelector('.feedback-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.wrap-loader');
const loadMoreBtn = document.querySelector('.button-load-more');

let searchBar = '';

// axios.defaults.baseURL = 'https://pixabay.com/';

let page = 1;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearch);

async function fetchImages(searchBar, page = 1) {
  //   const searchParams = new URLSearchParams({
  //     key: '42046594-dc9dc59be7e95573d854c379a',
  //     q: `${searchBar}`,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  //     per_page: 9,
  //   });

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

  const form = e.currentTarget;
  searchBar = form.elements.search.value.trim();
  if (searchBar === '') {
    return iziToast.show({
      message: 'Please add value!',
      messageColor: '#FAFAFB',
      messageSize: '16px',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  }

  try {
    const { hits } = await fetchImages(searchBar);
    console.log(hits);
    loader.classList.remove('is-hidden');

    if (hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
    }

    createGallery(hits, gallery);
    // gallery.innerHTML = createGallery(hits);
    lightbox.refresh();

    // if()
    loadMoreBtn.classList.remove('is-hidden');
    loadMoreBtn.addEventListener('click', handleLoadeMore);
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('is-hidden');
    form.reset;
  }
}

async function handleLoadeMore(e, searchBar, page) {
  page += 1;
  try {
    const { hits } = await fetchImages(searchBar, page);

    console.log(searchBar);

    // gallery.insertAdjacentElement(beforeend, createGallery(hits));
  } catch (error) {
    console.log(error);
  }
}

function createGallery(hits, gallery) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
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
      `;
      }
    )
    .join('');

  gallery.insertAdjacentElement('beforeend', markup);
}
