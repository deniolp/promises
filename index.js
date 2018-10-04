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

button.addEventListener('click', function() {
  let search = input.value;
  
  while (repositoryList.firstChild) {
    repositoryList.removeChild(repositoryList.firstChild);
  }
  
  getData('https://api.github.com/users/' + search + '/repos', function(repositories) {
    repositories.forEach(function(repository) {
      addRepositoryToList(repository);
    });
  });
});
