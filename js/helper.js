/*
This file contains the HTML string templates used by resumeBuilder.js to
generate the appropriate HTML tags for index.html.
The file also contains all the code for generating a google map for
interactivity. The data for the google map is contained in resumeBuilder.js.
 */

/*
HTML string templates
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span class="white-text">%data%</span><hr/>';

var HTMLsiteName = '<a class="sitename" href="#">Home</a>';
var HTMLmenuItems = '<ul class="menu-items"></ul>';
var HTMLmenuItem = '<li><a href="#">%data%</a></li>';

var HTMLmobile =
  '<li class="flex-item">' +
  '<span class="orange-text">mobile</span>' +
  '<span class="white-text">%data%</span>' +
  '</li>';
var HTMLemail =
  '<li class="flex-item">' +
  '<span class="orange-text">email</span>' +
  '<span class="white-text">%data%</span>' +
  '</li>';
var HTMLtwitter =
  '<li class="flex-item">' +
  '<span class="orange-text">twitter</span>' +
  '<span class="white-text">%data%</span>' +
  '</li>';
var HTMLgithub =
  '<li class="flex-item">' +
  '<span class="orange-text">github</span>' +
  '<span class="white-text">%data%</span>' +
  '</li>';

var HTMLlocation =
  '<li class="flex-item">' +
  '<span class="orange-text">location</span>' +
  '<span class="white-text">%data%</span>' +
  '</li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart =
  '<h3 id="skills-h3">Skills at a Glance:</h3>' +
  '<ul id="skills" class="flex-box"></ul>';
var HTMLskills =
  '<li class="flex-item">' +
  '<span class="white-text">%data%</span>' +
  '</li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%" height="150" width="300">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#" target="_blank">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineClassStart = '<div class="education-entry"></div>';
var HTMLonlineTitle = '<a href="#" target="_blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div><br>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';


/*
The International Name challenge in Lesson 2 where you'll create a
function that will need this helper code to run. Don't delete! It
hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
      var iName = inName(bio.name) || function(){};
      $('#name').html(iName);
  });
});

/* Internationalize name */
function inName(name) {
  var names = name.trim().split(' ');
  console.log(names);
  var firstName = names[0].slice(0, 1).toUpperCase() +
    names[0].slice(1).toLowerCase();
  var lastName = names[1].toUpperCase();

  return firstName + ' ' + lastName;
}

/*
The next few lines about clicks are for the Collecting Click
Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    });
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  var x = loc.pageX;
  var y = loc.pageY;

  logClicks(x, y);
});


/*
This is the fun part. Here's where we generate the custom Google Map
for the website. See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable

var globalInfoWindow;   // declares a global info window

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true,
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /*
   locationFinder() returns an array of every location string from the JSONs
   written for bio, education, and work.
   */
  function locationFinder() {
    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array
    education.schools.forEach(function (school) {
      locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array
    work.jobs.forEach(function (job) {
      locations.push(job.location);
    });

    return locations;
  }

  /*
   createMapMarker(placeData) reads Google Places search results to create
   map pins. placeData is the object returned from search results containing
   information about a single location.
   */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object
    // to local variables

    // latitude from the place service
    var lat = placeData.geometry.location.lat();
    // longitude from the place service
    var lon = placeData.geometry.location.lng();
    // name of the place from the place service
    var name = placeData.formatted_address;
    // current boundaries of the map window
    var bounds = window.mapBounds;

    // marker is an object with additional data about the pin for a single
    // location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name,
    });

    // if a map marker is clicked, use the global info window to display some
    // info
    google.maps.event.addListener(marker, 'click', function () {
      // if there is an existing global info window, first close it
      if (globalInfoWindow) {
        globalInfoWindow.close();
      }
      // set global info window to the new info window with updated content
      globalInfoWindow = infoWindow;
      // open the global info window
      globalInfoWindow.open(map, marker);
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
   callback(results, status) makes sure the search returned results for a
   location. If so, it creates a new map marker for that location.
   */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
   pinPoster(locations) takes in the array of locations created by
   locationFinder() and fires off Google place searches for each location
   */
  function pinPoster(locations) {
    // creates a Google place search service object. PlacesService does the
    // work of actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for
    // each location
    locations.forEach(function (place) {
      var request = {
        query: place
      };
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);
}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(window.mapBounds);
});

