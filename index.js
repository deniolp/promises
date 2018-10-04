'use stricts';

let repositoryList = document.querySelector('.repositories');
let button = document.querySelector('#button');
let input = document.querySelector('#input');

function addRepositoryToList(repository) {
  let div = document.createElement('div');
  let header = document.createElement('h2');
  let anchor = document.createElement('a');
  div.appendChild(header);
  div.appendChild(anchor);
  div.className = 'div';
  header.innerText = repository.name;
  
  if (repository.homepage != null && repository.homepage != "") {
    anchor.innerText = 'Ссылка';
    anchor.href = repository.homepage;
  }
  repositoryList.appendChild(div);
}

function getData(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        let json = xhr.response;
        console.log(json);
        resolve(json);
      } else {
        reject(xhr.statusText);
      }
    });
    
    xhr.addEventListener('error', function (error) {
      reject(error);
    });
    
    xhr.open('GET', url);
    xhr.send();
  });
}

button.addEventListener('click', function() {
  let search = input.value;
  
  while (repositoryList.firstChild) {
    repositoryList.removeChild(repositoryList.firstChild);
  }
  
  getData('https://api.github.com/users/' + search + '/repos')
    .then(repositories =>
      repositories.forEach(repository =>
        addRepositoryToList(repository)))
    .catch(error => console.error(error));
});
