'use stricts';

let movieList = document.querySelector('.movies');

function addMovieToList(movie) {
  let img = document.createElement('img');
  img.src = movie.Poster;
  movieList.appendChild(img);
}

