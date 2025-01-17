/// Discription in the documentation
import iziToast from 'izitoast';
/// Idditional import styles
import 'izitoast/dist/css/iziToast.min.css';
/// Discripption in the documentation
import searchImagesByQuery from './js/pixabay-api';
import { createImages, clearImages } from './js/render-function';

const form = document.querySelector('.gallery-form');
const input = document.querySelector('.input-for-gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  clearImages();
  event.preventDefault();
  loader.classList.remove('hidden');
  let wordForSearch = input.value.trim();
  const page = 1;
  if (wordForSearch === '') {
    iziToast.error({
      position: 'topRight',
      message: 'Please fill the input',
    });
    loader.classList.add('hidden');
    return;
  }
  searchImagesByQuery(`${wordForSearch}`, page).then(async data => {
    if (data.total === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });

      loader.classList.add('hidden');
      return;
    } else {
      createImages(data);
    }
  });
}