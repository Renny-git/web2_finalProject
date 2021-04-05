
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
    if(cityValue == 'NYC') {
        lat = '40.714272';
        long = '-74.005966';
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=${api}&units=${unit}`;
        createFetch(url)
    } if(cityValue == 'Beijing') {
        lat = '39.907501';
        long = '116.397232';
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=${api}&units=${unit}`;
        createFetch(url)
    } if(cityValue == 'Taipei') {
        lat = '24.94702';
        long = '121.581749';
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=${api}&units=${unit}`;
        createFetch(url)
    }  else {
        lat = '-22.9028';
        long = '-43.2075';
        url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely,alerts&appid=${api}&units=${unit}`;
        createFetch(url)
    }
});

function createFetch(url) {
    fetch(url)

    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
    
        return updateUI(data);
    
    })
    
    .catch(function(error) {
    
        // console.log(error);
    
    });
}

window.addEventListener('DOMContentLoaded', () => {
    createRequest(url, updateUI, updateFail);
});