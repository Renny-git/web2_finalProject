//https://isotope.metafizzy.co/

let type = 'All',
    content = '',
    typeClass = '',
    checkValue = '';

const $grid = $('.grid'),
    checkboxes = $('.checkbox-input');

// (function () {
//     $grid.isotope({
//         itemSelector: '.grid-item'
//     });
// }());

function initIso() {
    $grid.isotope({
        itemSelector: '.grid-item'
    });
}

//Categories dropdown filter
document.querySelector('#categories').addEventListener('change', function(){
    let typeValue = document.querySelector('#categories').value;
    console.log(typeValue);
    $grid.isotope({ filter: `.${typeValue}` });
    if(typeValue == 'All') {
        $grid.isotope({ filter: '*' });
    }
});

//Checkboxes filter
checkboxes.change(function() {
  // map input values to an array
  let inclusives = [];
  // inclusive filters from checkboxes
  checkboxes.each( function( i, elem ) {
    // if checkbox, use value if checked
    console.log(elem.dataset.filter);
    if ( elem.checked ) {
      inclusives.push( elem.dataset.filter );
    }
    console.log(inclusives);
    let filterValue = inclusives.length ? inclusives.join(', ') : '*';

    $grid.isotope({ filter: filterValue });
  });
   
});

//Fetch data
function updateUI(data, type) {
    console.log(data);
    for(let i = 0; i < data.length; i++) {
        typeClass = '';
        for(let j = 0; j < data[i].type.length; j++) {
            typeClass += `${data[i].type[j]} `;
        }
        content += `<div class="poster flip-card grid-item ${typeClass}" data-plot="${data[i].plot}"><div class ="flip-card-inner"><div class ="flip-card-front"><img src="${data[i].img}" /></div><div class="flip-card-back"><h2>${data[i].name}</h2><p>${data[i].plot}</p></div></div></div></div>`;
    }
    document.getElementById('movies').innerHTML = content;
    onPosterClick();
    initIso();
    $grid.imagesLoaded().progress( function() {
         $grid.isotope('layout');
    });
    setTimeout(function() {
        $grid.isotope({filter: '*'});
        $grid.animate({opacity: 1}, 1000);
    }, 100);
}

function onPosterClick() {
    // console.log('test');
    // console.log(poster.length);
    $('.poster').on('click', function(){
        console.log('click');
        let plot = $(this).data('plot');
        console.log(plot);
        $(this).append(`<div class="caption">${plot}</div>`);
    });
    $grid.isotope({
        filter: '.BFF'
    });
}

function updateFail() {
    console.log(error);
}

function createFetch(url) {
    fetch(url)

    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
    
        return updateUI(data, 'all');
    
    })
    
    .catch(function(error) {
    
        // console.log(error);
    
    });
}

window.addEventListener('DOMContentLoaded', () => {
    createFetch('data.json', updateUI, updateFail);
});
