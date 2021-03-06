'use strict';

var boton = document.querySelector('.buscador__boton');
var input = document.querySelector('.buscador__input');
var ul = document.querySelector('.secondSection__listado');
var series;

function resetear() {
  ul.innerHTML = '';
}
function buscaSerie() {
  resetear();
  fetch('https://api.tvmaze.com/search/people?q=' + input.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {

      var series = json;

      for (var i = 0; i < series.length; i++) {

        var li = document.createElement('li');
        var h2 = document.createElement('h2');
        var image = document.createElement('img');
        var content = document.createTextNode(series[i].person.name);

        li.classList.add('listado__items');
        h2.classList.add('items__title');
        li.appendChild(image);
        h2.appendChild(content);
        ul.appendChild(li);
        li.appendChild(h2);
        var parrafo = document.createElement('p');
        li.appendChild(parrafo);

        if( series[i].person.country === null){
          parrafo.innerHTML = 'No tengo pais';
        }else{

          var pais = document.createTextNode(series[i].person.country.name);
          parrafo.appendChild(pais);
        }

        li.addEventListener('click', favorito);

        if (series[i].person.image !== null) {
          image.src = series[i].person.image.medium;
        } else {
          image.src = ('https://via.placeholder.com/210x295/cccccc/666666/?text=TV');
        }
      }
    });
}
function favorito(event) { //esta función recibe como parámetro un evento que ha sido disparado e identifica quién lo disparó para añadirle o quitarle una clase.
  // li.classList.toggle('listado__items--favorito'); --> el último es sobre quien actúa la función.
  // event.currentTarget; --> identifica el elemento que ha llamado a la función.
  event.currentTarget.classList.toggle('listado__items--favorito');
}

boton.addEventListener('click', buscaSerie);

