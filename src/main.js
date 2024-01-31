import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import axios from 'axios';

const form = document.querySelector('.feedback-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.wrap-loader');

// let searchBar = '';

axios.defaults.baseURL = 'https://pixabay.com/';
const endpoint = 'api/';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onSearch);

async function fetchImages(searchBar) {
  //   const searchParams = new URLSearchParams({
  //     key: '42046594-dc9dc59be7e95573d854c379a',
  //     q: `${searchBar}`,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: 'true',
  //     per_page: 9,
  //   });

  const response = await axios.get(`${endpoint}`, {
    params: {
      key: '42046594-dc9dc59be7e95573d854c379a',
      q: `${searchBar}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 9,
    },
  });

  return response.data;
}

async function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  let searchBar = form.elements.search.value.trim();
  loader.classList.remove('hiden');

  try {
    const { hits } = await fetchImages(searchBar);

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

    createGallery(hits);

    gallery.innerHTML = createGallery(hits);

    lightbox.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    loader.classList.add('hiden');
    form.reset;
  }
  // finally() => {
  //     loader.classList.add('hiden');
  //   };
}

// fetchImages();
//     .then(response => {
//       console.log(response.data);
//       if (response.data.hits.length === 0) {
//         iziToast.show({
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//           messageColor: '#FAFAFB',
//           messageSize: '16px',
//           backgroundColor: '#EF4040',
//           position: 'topRight',
//         });
//       }

//       gallery.innerHTML = createGallery(response.data.hits);

//       lightbox.refresh();
//     })
//     .catch(error => {
//       console.log(error);
//     })
//     .finally(() => {
//       loader.classList.add('hiden');
//     });

function createGallery(arr) {
  return arr
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
}
