var humanity = [
  {
      "Name": "Northern Virginia Restore-Alexandria, HFH",
      "address": "869 South Pickett St Alexandria, VA 22304",
      "phoneNumbers":"7036706700", 
      "email": "info@habitatnova.org",
      "website": "https://www.habitatnova.org/restore/?utm_campaign=HFHI_ReStoreSearch&utm_medium=referral&utm_source=habitat.org"
  },

  {
      "Name": "Northern Virginia ReStore-Chantilly, HFH",
      "address": "4311 Walney Rd Chantilly, VA 20151",
      "phoneNumbers":"7039533747", 
      "email": "info@habitatnova.org",
      "website": "https://www.habitatnova.org/restore?utm_campaign=HFHI_ReStoreSearch&amp;utm_medium=referral&amp;utm_source=habitat.org"
  },

  {
      "Name": "Northern Virginia Restore-Herndon, HFH",
      "address": "Spring Street Herndon, VA 20170",
      "phoneNumbers":"5713060908", 
      "email": "info@habitatnova.org",
      "website": "https://www.habitatnova.org/restore?utm_campaign=HFHI_ReStoreSearch&amp;utm_medium=referral&amp;utm_source=habitat.org"
  }
];
function initMap() {
  // The location of Uluru 
  x = navigator.geolocation;
  x.getCurrentPosition(success, failure);
  function success(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {
        zoom: 5,
        center: coords,
    }

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // your location
    var marker = new google.maps.Marker({map:map, position:coords}) 

    // community listing locations
    geocoder = new google.maps.Geocoder();
    for(let i = 0; i < humanity.length; i++){
      var address = humanity[i].address;
      const contentString = `
        <div>
          <h1>${humanity[i].Name}</h1>
          <h1>${humanity[i].address}</h1>
          <h1>${humanity[i].phoneNumbers}</h1>
          <h1>${humanity[i].email}</h1>
          <h1>${humanity[i].website}</h1>
        </div>;
      `;
      console.log(contentString);
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      })
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {  
          const marks = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: "Uluru (Ayers Rock)",
          });
          marks.addListener("click", () => {
            console.log("HIT");
            infoWindow.open(map, marks);
          })
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
}

function failure() {
	window.alert("Unable to find your location.");
	var coords = new google.maps.LatLng(0, 0);

    var mapOptions = {
        zoom: 5,
        center: coords,
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({map:map, position:coords})
} 
  
 