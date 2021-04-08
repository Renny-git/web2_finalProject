//https://isotope.metafizzy.co/

let type = 'All',
content = '';

$(document).ready(function() {  
    $(".checkbox-input").change(function () {
      selectedinputs();
    });
  
    function selectedinputs(){
      var checkboxes = $('input:checkbox:checked').length;
      $("p>span").text(checkboxes);
    }
    selectedinputs();
});


document.querySelector('#categories').addEventListener('change', function(){
    let cityValue = document.querySelector('#categories').value;
    if(cityValue == 'All') {
        // filter = [];
        updateUI();
    } if(cityValue == 'Random') {
        // filter = [];
        type = 'Random';
        updateUI();
    } 
});

function updateUI(data, type) {
    console.log(data);
    for(let i = 0; i < data.length; i++) {
        // console.log(data.img);
        content += `<div class="poster" data-filter="${data[i].type}" data-plot="${data[i].plot}"><img src="${data[i].img}" /></div>`;
    }
    document.getElementById('movies').innerHTML = content;
    onPosterClick();
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