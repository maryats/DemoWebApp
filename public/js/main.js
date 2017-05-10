// makes getWeather function available after document is loaded
$(document).ready(function() {
  getWeather();
  getPhoto("Boston");
});

function getWeather(searchQuery) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?'; // OpenWeatherMap API url
  var params = {
    APPID: apiKey,
    units: 'imperial'
  };
  if (searchQuery) {
    params.q = searchQuery;
  } else {
    params.id = 4930956;
  }
  $.ajax(url + $.param(params), {
    success: function(data) {
      $('.city').text(data.name);
      $('.temp').text(data.main.temp + ' °F');
    }, error: function(error) {
      $('.error-message').text('Error! Please enter a valid city name.');
    }
  });
}

function getPhoto(searchQuery) {
  var url = 'https://api.flickr.com/services/rest/?'; // Flickr API url
  var params = {
    method: 'flickr.photos.search',
    api_key: apiKeyFL,
    tags: searchQuery,
    sort: 'relevance',
    privacy_filter: 1,
    safe_search: 1,
    content_type: 1,
    has_geo: 1,
    per_page: 1,
    format: 'json',
    nojsoncallback: 1
  };
  var arl2 = url + $.param(params);
  $.ajax(arl2, {
    success: function(data) {
      var photo = data.photos.photo[0];
      var imageURL = 'https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'.jpg';
      //var webPage = 'https://www.flickr.com/photos/'+photo.owner'/'+photo.id;
      $('.bg').css('background-image', 'url(' + imageURL + ')');
      //$('.footer').html('<a href="'+webPage+'"> '+photo.title+"</a>");
      $('.photo-credits').html("<a href='"+"https://www.flickr.com/photos/"+photo.owner+"/"+photo.id+"'>\""+photo.title+"\"</a>");
    }, error: function(error) {
      $('.error-message').text('Error! Image failed to load.');
    }
  });
}

// search weather by clicking "Search" button or pressing Enter key
function searchWeather(event) {
  if (event.type == 'click' || (event.type == 'keypress' && event.keyCode == 13)) {
    $('.error-message').text('');
    var searchQuery = $('.search').val(); // grab value from search input
    getWeather(searchQuery);
    getPhoto(searchQuery);
  }
}