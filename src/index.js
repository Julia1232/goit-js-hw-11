import './sass/index.scss';
import Notiflix from 'notiflix';
import imageTemplate from './template/imageCard.hbs'

import { getImage } from './indexAPI';

const refs = {
    formEl: document.querySelector('.search-form'),
    containerEl: document.querySelector('.gallery'),
    loadMoreEl: document.querySelector('.load-more')
}
let searchQuery = '';
let page = 1;
const limit = 40;
let totalPage = 0;

refs.loadMoreEl.classList.add('hidden');

refs.formEl.addEventListener('submit', (e) => {
    refs.containerEl.innerHTML = '';
    refs.loadMoreEl.classList.add('hidden');
    page = 1;

    e.preventDefault();
    searchQuery = e.target.elements.searchQuery.value.trim();
    getImage(searchQuery, page, limit).then(data => {
        totalPage = Math.ceil(data.totalHits / limit);
     
        
        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        
        } else if (searchQuery && totalPage > 1) {
            renderImage(data.hits);
            refs.loadMoreEl.classList.remove('hidden');
        } else { 
        renderImage(data.hits);
        refs.loadMoreEl.classList.add('hidden');
    }
  
    })
})
    

refs.loadMoreEl.addEventListener('click', () => {
    page += 1;
    
    getImage(searchQuery, page, limit).then(data => {
        totalPage = Math.ceil(data.totalHits / limit);

        if (totalPage === page ) {
            refs.loadMoreEl.classList.add('hidden');
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }

        renderImage(data.hits);
        
    })
})

function renderImage(desk) {
    const murkup = imageTemplate(desk);

    refs.containerEl.innerHTML += murkup;
}