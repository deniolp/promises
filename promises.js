'use stricts';

let repositoryList = document.querySelector('.repositories');

function addRepositoryToList(repository) {
  let p = document.createElement('p');
  p.innerText = repository.name;
  repositoryList.appendChild(p);
}

function getData(url, success) {
  let xhr = new XMLHttpRequest();
  
  xhr.responseType = 'json';
  
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      let json = xhr.response;
      console.log(json);
      success(json);
    } else {
      console.error(xhr.statusText);
    }
  });
  
  xhr.addEventListener('error', function (error) {
    console.info(error);
  });
  
  xhr.open('GET', url);
  xhr.send();
}

let search = 'deniolp';

getData('https://api.github.com/users/' + search + '/repos', function(repositories) {
  repositories.forEach(function(repository) {
    addRepositoryToList(repository);
  });
});
